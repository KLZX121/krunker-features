'use strict';
const cssLink = document.getElementsByTagName('link')[3];
setInterval(() => {
    chrome.storage.sync.get('css', results => {
        const cssUrl = chrome.extension.getURL(`css/${results.css}.css`);
        if (cssLink.href === cssUrl) return;
        cssLink.setAttribute('href', cssUrl);
    });
}, 1000);