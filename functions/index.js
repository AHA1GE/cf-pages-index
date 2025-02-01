// Use a Set for fast membership checking.
const langs = new Set([
    'zh-cn', 'en-us'
]);

export function onRequest(context) {
    const request = context.request;
    // Extract the pathname from the URL and normalize it to lowercase.
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();

    // Use a stricter regex to check for root "/" or "/index" with optional extension.
    if (!/^\/(index(?:\.[a-z0-9]+)?)?$/i.test(pathname)) {
        return context.next();
    }

    // Get the accept-language header (if available).
    const acceptLanguage = request.headers.get('accept-language') || '';

    // Split the header by commas and remove any quality factors (e.g., ";q=0.8")
    const userLangs = acceptLanguage
        ? acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase())
        : [];

    // Find the first supported language (including partial matches).
    const foundLang = userLangs.find(lang => langs.has(lang)) ||
        userLangs.find(lang => [...langs].some(l => l.startsWith(lang)));

    if (foundLang) {
        // Parse URL as proto://host/${foundLang}/file.ext
        url.pathname = `/${foundLang}${pathname}`;
        // Redirect to the new URL.
        return Response.redirect(url.toString(), 302);
    } else {
        // No supported language found, redirect to the default index.html.
        return Response.redirect(url.origin + '/index.html', 302);
    }
}
