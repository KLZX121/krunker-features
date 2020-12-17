'use strict';
document.onkeydown = findNewGame;
let hotkey;
function findNewGame(a){
    chrome.storage.sync.get(['newGameHotkey'], result =>{
        hotkey = result.newGameHotkey;
    });
    if (a.key !== hotkey) return;
    window.location.href = 'https://krunker.io';
}; 