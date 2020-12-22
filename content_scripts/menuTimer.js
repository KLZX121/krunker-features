'use strict';
document.getElementById('spectButton').setAttribute('style', 'top: 40%;');

const menuTimer = document.createElement("div");
menuTimer.setAttribute('id', 'menuTimer');

const timerVal = document.getElementById('timerVal');
const observeTime = new MutationObserver(()=>{

    let time = timerVal.innerHTML;
    if (!document.getElementById('menuTimer')) document.getElementById('instructions').appendChild(menuTimer);

    if (!time || time == "00:00") time = document.getElementById('endTimer').innerHTML;
    chrome.storage.sync.get('menuTimerColours', result => {
        menuTimer.style.color = parseInt(time) < 1 ? result.menuTimerColours[1] : result.menuTimerColours[0];
    });
    document.getElementById('menuTimer').innerHTML = time;

})
observeTime.observe(timerVal, {childList: true});