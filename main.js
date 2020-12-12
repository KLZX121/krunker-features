'use strict';

//Menu Timer
setInterval(()=>{

    //move spectateButton
    document.getElementById('spectButton').setAttribute('style', 'top: 20px;left: 550px');

    //create element menuTimer
    let menuTimer = document.createElement("div");
    menuTimer.setAttribute('id', 'menuTimer');
    menuTimer.setAttribute('style', "margin-bottom: 50px;color: cyan");

    //append to instructions element
    document.getElementById('instructions').appendChild(menuTimer);

    //update menuTimer
    let time = document.getElementById('timerVal').innerHTML;
    if (!time) time = 'Game Ended';
    document.getElementById('menuTimer').innerHTML = time;
    
}, 1000);

//Find New Game on F4
document.onkeydown = findNewGame;

function findNewGame(a){
    if (a.code !== 'F4') return;
    window.location.href = 'https://krunker.io';
};
