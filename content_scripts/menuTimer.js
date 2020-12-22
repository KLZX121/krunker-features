'use strict';
const spectBtn = document.getElementById('spectButton');
spectBtn.setAttribute('style', 'top: 35%; ');
spectBtn.firstElementChild.setAttribute('style', 'font-size: 30px; color: rgba(255,255,255,0.6);');

document.getElementsByClassName('switchsml')[1].setAttribute('style', 'bottom: 0.25em;')
document.getElementsByClassName('sliderSml')[0].setAttribute('style', 'width: 43px; height: 30px; border-radius: 15px;');
document.styleSheets[0].cssRules[466].style.cssText = "position: absolute; content: ''; height: 24px; width: 24px; left: 2px; bottom: 2px; background-color: rgb(255, 255, 255); transition: all 0.4s ease 0s; border-radius: 50%;";

const menuTimer = document.createElement("div");
menuTimer.setAttribute('id', 'menuTimer');

const timerVal = document.getElementById('timerVal');
setInterval(()=>{

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