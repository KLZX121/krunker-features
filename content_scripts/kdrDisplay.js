'use strict';
const killsVal = document.getElementById('killsVal'),
    deathsVal = document.getElementById('deathsVal');

const kdrDisplay = document.createElement('span');
document.getElementById('gameUI').prepend(kdrDisplay);
kdrDisplay.setAttribute('id', 'kdrDisplay');
kdrDisplay.setAttribute('style', 'position: fixed; background: rgba(0, 0, 0, 0.5); box-sizing: border-box; padding: 0.5em; border-radius: 0.5em');
kdrDisplay.innerHTML = 'KDR';
updateKdrDisplay();

const observeTimer = new MutationObserver(()=>{
    chrome.storage.sync.get('toggles', result => {
        kdrDisplay.style.display = result.toggles[2] ? 'inline' : 'none';
    });
    if (menuTimer.innerHTML.startsWith('N')) {
        kdrDisplay.innerHTML = 'KDR';
    }
    updateKdrDisplay();
})
observeTimer.observe(menuTimer, { childList: true });

const observeKdr = new MutationObserver(()=>{
    if (killsVal.innerHTML === '0' && deathsVal.innerHTML === '0'){
        kdrDisplay.innerHTML = 'KDR';
        updateKdrDisplay();
        return;
    }
    if (deathsVal.innerHTML === '0'){
        kdrDisplay.innerHTML = `+${killsVal.innerHTML}`;
        updateKdrDisplay();
        return;
    }
    kdrDisplay.innerHTML = parseInt(killsVal.innerHTML) / parseInt(deathsVal.innerHTML);
    kdrDisplay.innerHTML = +parseFloat(kdrDisplay.innerHTML).toFixed(1);
    updateKdrDisplay();

})

observeKdr.observe(killsVal, { childList: true });
observeKdr.observe(deathsVal, { childList: true });

function updateKdrDisplay(){
    
    chrome.storage.sync.get(['kdrDisplay', 'toggles'], result => {
        kdrDisplay.style.display = result.toggles[2] ? 'inline' : 'none';
        if (kdrDisplay.innerHTML === 'KDR' || kdrDisplay.innerHTML.startsWith('+')) {
            kdrDisplay.style.color = result.kdrDisplay.colours[0]
        } else {
            kdrDisplay.style.color = `${parseInt(kdrDisplay.innerHTML) >= result.kdrDisplay.target ? result.kdrDisplay.colours[0] : result.kdrDisplay.colours[1]}`
        }
        kdrDisplay.style.left = result.kdrDisplay.position[0];
        kdrDisplay.style.top = result.kdrDisplay.position[1];
        kdrDisplay.style.fontSize = result.kdrDisplay.size;
    });
}