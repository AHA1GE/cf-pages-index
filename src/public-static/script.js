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

// Daily wallpaper layer: asks the same-origin /bg/ alias for the current theme,
// then cross-fades the dated immutable image in over the animated gradient.
// Every failure path is silent - the gradient is already the visible design.
(function () {
    var wall = document.getElementById('bg-wallpaper');
    if (!wall) return;

    var themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var PREFIX = 'cfpi-bg:';

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
                if (k && k.indexOf(PREFIX) === 0 && k.indexOf(':' + today) === -1) doomed.push(k);
            }
            doomed.forEach(function (k) { localStorage.removeItem(k); });
        } catch (e) { /* storage unavailable - non-fatal */ }
    }

    function show(url, animate) {
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

    function load(theme) {
        var today = localDate();
        var key = PREFIX + theme + ':' + today;
        prune(today);
        var memo = null;
        try { memo = localStorage.getItem(key); } catch (e) { /* private mode */ }
        if (memo) { show(memo, false); return; }
        fetch('/bg/today-' + theme + '.jpg', { credentials: 'omit' })
            .then(function (res) {
                if (!res.ok) throw new Error('bg ' + res.status);
                return res.url; // fetch followed the 302: the dated canonical URL
            })
            .then(function (url) {
                try { localStorage.setItem(key, url); } catch (e) { /* non-fatal */ }
                show(url, true);
            })
            .catch(function () { /* gradient stays; retried next visit */ });
    }

    load(themeMedia.matches ? 'dark' : 'light');
    function onChange(e) { load(e.matches ? 'dark' : 'light'); }
    if (themeMedia.addEventListener) {
        themeMedia.addEventListener('change', onChange);
    } else if (themeMedia.addListener) {
        themeMedia.addListener(onChange); // older Safari
    }
})();
