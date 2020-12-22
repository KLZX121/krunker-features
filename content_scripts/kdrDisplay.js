const killsVal = document.getElementById('killsVal'),
    deathsVal = document.getElementById('deathsVal');

const kdrDisplay = document.createElement('span');
document.getElementById('gameUI').prepend(kdrDisplay);
kdrDisplay.setAttribute('id', 'kdrDisplay');
kdrDisplay.setAttribute('style', 'position: fixed; font-size: xx-large; background: rgba(0, 0, 0, 0.5); box-sizing: border-box; padding: 0.5em; border-radius: 0.5em');
kdrDisplay.innerHTML = '0';
updateKdrDisplay();

const observeKdr = new MutationObserver(()=>{
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
    chrome.storage.sync.get('kdrDisplay', result => {
        kdrDisplay.style.color = `${parseInt(kdrDisplay.innerHTML) >= result.kdrDisplay.target ? result.kdrDisplay.colours[0] : result.kdrDisplay.colours[1]}`
        kdrDisplay.style.left = `${result.kdrDisplay.position[0]}`;
        kdrDisplay.style.top = `${result.kdrDisplay.position[1]}`;
    });
}