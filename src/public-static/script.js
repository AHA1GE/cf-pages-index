// Add a theme-aware background to favicons whose content would blend into the page background
// (dark icons in dark mode, light icons in light mode). Backgrounds only fill transparent pixels,
// and icons served without CORS simply stay unclassified and unchanged.
(function () {
    var DARK_LIMIT = 100;
    var LIGHT_LIMIT = 200;

    function averageLuminance(img) {
        var size = Math.min(32, img.naturalWidth || 32, img.naturalHeight || 32) || 32;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        var data = ctx.getImageData(0, 0, size, size).data;
        var r = 0, g = 0, b = 0, weight = 0;
        for (var i = 0; i < data.length; i += 4) {
            var alpha = data[i + 3] / 255;
            if (alpha < 0.1) continue; // only visible pixels decide
            r += data[i] * alpha;
            g += data[i + 1] * alpha;
            b += data[i + 2] * alpha;
            weight += alpha;
        }
        if (weight === 0) return null; // fully transparent
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / weight;
    }

    function classify(img) {
        var luminance;
        try {
            luminance = averageLuminance(img);
        } catch (e) {
            return; // tainted canvas (no CORS) - leave as-is
        }
        if (luminance === null) return;
        if (luminance < DARK_LIMIT) {
            img.classList.add('icon-dark');
        } else if (luminance > LIGHT_LIMIT) {
            img.classList.add('icon-light');
        }
    }

    function watch(img) {
        if (img.complete && img.naturalWidth) {
            classify(img);
        } else {
            img.addEventListener('load', function () { classify(img); }, { once: true });
        }
    }

    document.querySelectorAll('img.card-favicon-top-left-float').forEach(watch);
})();

// User preferences + daily wallpaper layer.
//
// Two slide switches live in the pref pill next to the hitokoto:
//   - theme: light/dark manual override (default = follow the system). The
//     override is kept in sessionStorage, so closing the browser clears it
//     and the page follows the system preference again on the next visit.
//   - background: Bing wallpaper (default) / animated gradient. Kept in
//     localStorage - this choice is meant to stick.
// Every failure path in the wallpaper loader is silent - the animated
// gradient is already the visible design.
(function () {
    var root = document.documentElement;
    var wall = document.getElementById('bg-wallpaper');
    var themeSwitch = document.getElementById('theme-switch');
    var bgSwitch = document.getElementById('bg-switch');

    var themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    var THEME_KEY = 'cfpi-theme-override'; // 'light' | 'dark' | absent (session-scoped)
    var BG_KEY = 'cfpi-bg-mode';           // 'gradient' | absent (wallpaper, persistent)
    var MEMO_PREFIX = 'cfpi-bg:';

    function store(key, value, session) {
        var api = session ? sessionStorage : localStorage;
        try {
            if (value === null) api.removeItem(key);
            else api.setItem(key, value);
        } catch (e) { /* storage unavailable - non-fatal */ }
    }

    function read(key, session) {
        var api = session ? sessionStorage : localStorage;
        try { return api.getItem(key); } catch (e) { return null; }
    }

    function themeOverride() {
        var v = read(THEME_KEY, true);
        return v === 'light' || v === 'dark' ? v : null;
    }

    // the override used to live in localStorage; drop stale copies so old
    // visitors fall back to system theme as intended
    try { localStorage.removeItem(THEME_KEY); } catch (e) { /* non-fatal */ }

    function effectiveTheme() {
        return themeOverride() || (themeMedia.matches ? 'dark' : 'light');
    }

    function gradientMode() {
        return read(BG_KEY) === 'gradient';
    }

    // keep browser chrome color in step with the effective theme
    function syncThemeColor(theme) {
        var color = theme === 'dark' ? '#1b2237' : '#93a6c6';
        var metas = document.querySelectorAll('meta[name="theme-color"]');
        for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', color);
    }

    // ------------------------------------------------------------------
    // wallpaper
    // ------------------------------------------------------------------

    function localDate() {
        function pad(n) { return n < 10 ? '0' + n : '' + n; }
        var d = new Date();
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    // keep only today's entries
    function prune(today) {
        try {
            var doomed = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                if (k && k.indexOf(MEMO_PREFIX) === 0 && k.indexOf(':' + today) === -1) doomed.push(k);
            }
            doomed.forEach(function (k) { localStorage.removeItem(k); });
        } catch (e) { /* non-fatal */ }
    }

    function show(url, animate) {
        if (!wall) return;
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () {
            wall.style.backgroundImage = 'url("' + url.replace(/"/g, '%22') + '")';
            if (!animate || reducedMotion.matches) wall.style.transition = 'none';
            requestAnimationFrame(function () {
                wall.classList.add('loaded');
                requestAnimationFrame(function () { wall.style.transition = ''; });
            });
        };
        img.src = url; // onerror: leave the gradient in place
    }

    function loadWallpaper(animate) {
        if (!wall) return;
        if (gradientMode()) {
            root.setAttribute('data-bg', 'gradient');
            return; // CSS hides the layer; the gradient is the background
        }
        root.removeAttribute('data-bg');
        var theme = effectiveTheme();
        var today = localDate();
        var key = MEMO_PREFIX + theme + ':' + today;
        prune(today);
        var memo = read(key);
        if (memo) { show(memo, false); return; }
        fetch('/bg/today-' + theme + '.jpg', { credentials: 'omit' })
            .then(function (res) {
                if (!res.ok) throw new Error('bg ' + res.status);
                return res.url; // fetch followed the 302: the dated canonical URL
            })
            .then(function (url) {
                store(key, url);
                show(url, animate);
            })
            .catch(function () { /* gradient stays; retried next visit */ });
    }

    // ------------------------------------------------------------------
    // apply + wire the switches
    // ------------------------------------------------------------------

    function apply() {
        var override = themeOverride();
        if (override === 'dark') root.setAttribute('data-theme', 'dark');
        else if (override === 'light') root.setAttribute('data-theme', 'light');
        else root.removeAttribute('data-theme');
        syncThemeColor(effectiveTheme());
        if (themeSwitch) {
            themeSwitch.setAttribute('aria-checked', effectiveTheme() === 'dark' ? 'true' : 'false');
        }
        if (bgSwitch) {
            bgSwitch.setAttribute('aria-checked', gradientMode() ? 'true' : 'false');
        }
        loadWallpaper(true);
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('click', function () {
            store(THEME_KEY, effectiveTheme() === 'dark' ? 'light' : 'dark', true);
            apply();
        });
    }

    if (bgSwitch) {
        bgSwitch.addEventListener('click', function () {
            store(BG_KEY, gradientMode() ? null : 'gradient');
            apply();
        });
    }

    function onSystemThemeChange() {
        // with no manual override the switches simply follow the system
        if (!themeOverride()) apply();
    }

    if (themeMedia.addEventListener) {
        themeMedia.addEventListener('change', onSystemThemeChange);
    } else if (themeMedia.addListener) {
        themeMedia.addListener(onSystemThemeChange); // older Safari
    }

    apply();
})();
