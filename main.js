'use strict';

//move spectate button
document.getElementById('spectButton').setAttribute('style', 'top: 20px;left: 550px');

const menuTimer = document.createElement("div");
menuTimer.setAttribute('id', 'menuTimer');
menuTimer.setAttribute('style', "margin-bottom: 50px;color: cyan");

setInterval(()=>{

    //create element menuTimer
    if (!document.getElementById('menuTimer')) document.getElementById('instructions').appendChild(menuTimer);
    
    //update menuTimer
    let time = document.getElementById('timerVal').innerHTML;
    if (!time || time == "00:00") time = document.getElementById('endTimer').innerHTML;
    document.getElementById('menuTimer').innerHTML = time;
    
}, 500);

//Find New Game on F4
document.onkeydown = findNewGame;

function findNewGame(a){
    if (a.code !== 'F4') return;
    window.location.href = 'https://krunker.io';
};
