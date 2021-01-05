'use strict';
const spectBtn = document.getElementById('spectButton');
spectBtn.style.top = 'calc(50% - 85px)';

const menuTimer = document.createElement("div");
menuTimer.setAttribute('id', 'menuTimer');

const timerVal = document.getElementById('timerVal');
setInterval(()=>{
    chrome.storage.sync.get('toggles', result => {
        menuTimer.setAttribute('style', `display: ${result.toggles[0] ? 'block' : 'none'};`);
    });
    let time = timerVal.innerHTML;
    if (!document.getElementById('menuTimer')) {
        document.getElementById('instructions').appendChild(menuTimer);
    }
    if (!time || time == "00:00") {
        time = document.getElementById('endTimer').innerHTML;
    }
    chrome.storage.sync.get('menuTimerColours', result => {
        menuTimer.style.color = parseInt(time) < 1 ? result.menuTimerColours[1] : result.menuTimerColours[0];
    });
    document.getElementById('menuTimer').innerHTML = time;

}, 500);