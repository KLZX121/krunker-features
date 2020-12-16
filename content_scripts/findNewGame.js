'use strict';
document.onkeydown = findNewGame;
let hotkey;
chrome.storage.sync.get(['newGameHotkey'], result =>{
    hotkey = result.newGameHotkey;
})
function findNewGame(a){
    if (a.key !== hotkey) return;
    window.location.href = 'https://krunker.io';
}; 