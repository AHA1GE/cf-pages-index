// Use a Set for fast membership checking.
const langs = new Set([
    // List of supported languages, more to add
    'cn',
    'default' // default is English
]);

export function onRequest(context) {
    const request = context.request;
    // Extract the pathname from the URL.
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Use a regex to check for root "/" or "/index" with optional extension.
    // This regex matches:
    // - "/" (root)
    // - "/index" (no extension)
    // - "/index.<ext>" (any extension, e.g., .html, .htm)
    if (!/^\/(index(\.[a-z0-9]+)?)?$/i.test(pathname)) {
        return context.next();
    }

    // Default response language is English.
    const defaultLang = 'default';
    let responseLang = defaultLang;

    // Get the accept-language header (if available).
    const acceptLanguage = request.headers['accept-language'] || '';

    // Split the header by commas and remove any quality factors (e.g., ";q=0.8")
    const userLangs = acceptLanguage.split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase());

    // Find the first language that is supported (excluding 'default').
    const foundLang = userLangs.find(lang => langs.has(lang) && lang !== defaultLang);
    if (foundLang) {
        responseLang = foundLang;
    }

    // Serve the appropriate file.
    const fileName = responseLang === defaultLang ? 'index.html' : `index-${responseLang}.html`;
    url.pathname = `/${fileName}`;
    return fetch(url.toString(), request);
}
