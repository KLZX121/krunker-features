'use strict';
document.onkeydown = findNewGame;
function findNewGame(a){
    chrome.storage.sync.get(['newGameHotkey'], result =>{
        let hotkey = result.newGameHotkey;
        if (a.key !== hotkey) return;
        window.location.href = 'https://krunker.io';
    });
}; 