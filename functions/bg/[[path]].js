// Daily background image service.
//
//   /bg/<YYYY-MM-DD>-<light|dark>.jpg   canonical, immutable, edge-cached
//   /bg/today-<light|dark>.jpg          302 -> canonical (date from the Bing feed)
//
// Wallpaper comes from the Bing feed (market fixed to en-US), theme correction
// is baked in via Cloudflare Image Transformations, and every failure path
// serves a pre-baked fallback JPEG bundled with the static assets - so the
// broken-pipeline path is the most reliable one.

const MARKET = 'en-US';
const FEED_URL =
    'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=' + MARKET;
const FEED_CACHE_TTL = 1800; // seconds a fetched feed stays fresh per colo

// Tuned so glass surfaces keep contrast on any wallpaper:
// light theme wants a mid-tone backdrop, dark theme a deep one.
const FILTERS = {
    light: { brightness: 0.72, contrast: 1.08 },
    dark: { brightness: 0.5, saturation: 0.85, contrast: 1.05 },
};

function feedDate(startdate) {
    // "20261003" -> "2026-10-03"
    return (
        startdate.slice(0, 4) +
        '-' +
        startdate.slice(4, 6) +
        '-' +
        startdate.slice(6, 8)
    );
}

function imageResponse(body, date, theme) {
    return new Response(body, {
        headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
            ETag: '"bg-' + date + '-' + theme + '"',
        },
    });
}

// Serve the bundled fallback asset. Dated URLs are immutable forever; the
// today-alias must stay re-checkable, so it gets a short cache lifetime.
async function fallback(request, env, date, theme, cacheControl) {
    const assetUrl = new URL('/bg-fallback-' + theme + '.jpg', request.url);
    const res = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (!res.ok) {
        return new Response('background unavailable', { status: 502 });
    }
    const out = new Response(res.body, {
        headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': cacheControl,
            ETag: '"bg-fallback-' + theme + '"',
        },
    });
    return out;
}

// The parsed feed, cached per colo under a synthetic key with a short TTL.
async function getFeed(cache, waitUntil) {
    const key = new Request('https://feed.local/bing-wallpapers-' + MARKET);
    const hit = await cache.match(key);
    if (hit) return hit.json();

    const res = await fetch(FEED_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; cf-pages-index/1.0)' },
    });
    if (!res.ok) throw new Error('feed ' + res.status);
    const data = await res.json();
    if (!data || !Array.isArray(data.images) || data.images.length === 0) {
        throw new Error('feed shape');
    }
    const storable = new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=' + FEED_CACHE_TTL,
        },
    });
    waitUntil(cache.put(key, storable));
    return data;
}

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const match = url.pathname
        .toLowerCase()
        .match(/^\/bg\/(\d{4}-\d{2}-\d{2}|today)-(light|dark)\.jpg$/);
    if (!match) {
        return new Response('not found', { status: 404 });
    }

    const theme = match[2];
    const cache = caches.default;
    const waitUntil = context.waitUntil
        ? context.waitUntil.bind(context)
        : function (p) { return p; };

    // today alias: resolve the date from the feed, then redirect
    if (match[1] === 'today') {
        try {
            const feed = await getFeed(cache, waitUntil);
            const current = feed.images[0];
            if (!current || !current.startdate || !current.urlbase) {
                throw new Error('feed shape');
            }
            const target =
                url.origin + '/bg/' + feedDate(current.startdate) + '-' + theme + '.jpg';
            return new Response(null, {
                status: 302,
                headers: {
                    Location: target,
                    'Cache-Control': 'public, max-age=300',
                },
            });
        } catch (e) {
            return fallback(request, env, 'today', theme, 'public, max-age=300');
        }
    }

    // dated URL: the common case is an edge-cache hit
    const date = match[1];
    const hit = await cache.match(request);
    if (hit) return hit;

    try {
        const feed = await getFeed(cache, waitUntil);
        const entry = feed.images.find(function (im) {
            return im && im.urlbase && im.startdate && feedDate(im.startdate) === date;
        });
        if (!entry) throw new Error('no wallpaper for ' + date);

        const source = 'https://www.bing.com' + entry.urlbase + '_1920x1080.jpg';
        const transformed = await fetch(new Request(source), {
            cf: {
                image: Object.assign(
                    {
                        width: 1920,
                        height: 1080,
                        fit: 'cover',
                        format: 'jpeg',
                        quality: 78,
                    },
                    FILTERS[theme]
                ),
            },
        });
        if (!transformed.ok) throw new Error('transform ' + transformed.status);

        const out = imageResponse(transformed.body, date, theme);
        waitUntil(cache.put(request, out.clone()));
        return out;
    } catch (e) {
        return fallback(request, env, date, theme, 'public, max-age=31536000, immutable');
    }
}
