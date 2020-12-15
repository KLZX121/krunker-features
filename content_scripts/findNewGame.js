'use strict';
document.onkeydown = findNewGame;

function findNewGame(a){
    if (a.code !== 'F4') return;
    window.location.href = 'https://krunker.io';
}; 