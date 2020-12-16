'use strict';
document.getElementById('spectButton').setAttribute('style', 'top: 20px;left: 550px');

const menuTimer = document.createElement("div");
menuTimer.setAttribute('id', 'menuTimer');
menuTimer.setAttribute('style', "margin-bottom: 50px");

setInterval(()=>{

    //create element menuTimer
    if (!document.getElementById('menuTimer')) document.getElementById('instructions').appendChild(menuTimer);
    
    //update menuTimer
    let time = document.getElementById('timerVal').innerHTML;
    if (!time || time == "00:00") time = document.getElementById('endTimer').innerHTML;
    chrome.storage.sync.get(['normalTimeColour', 'lowTimeColour'], result=>{
        menuTimer.setAttribute('style', `color: ${parseInt(time) < 1 ? result.lowTimeColour : result.normalTimeColour}`);
    });
    document.getElementById('menuTimer').innerHTML = time;
    
}, 500);