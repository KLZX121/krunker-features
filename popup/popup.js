//combine setting of colours
//combine all into one save button
//export/import settings

//======================Tabs===========================================

const settings = document.getElementById('settings');
const info = document.getElementById('info');
document.getElementById('settingsBtn').onclick = switchToSettings;
document.getElementById('infoBtn').onclick = switchToInfo;
function switchToSettings(){
    info.style.display = 'none';
    settings.style.display = 'block';
};
function switchToInfo(){
    settings.style.display = 'none';
    info.style.display = 'block';
};

//======================Menu Timer=====================================

//initialise
const normalTimeColour = document.getElementById('normalTimeColour');
const lowTimeColour = document.getElementById('lowTimeColour');

//apply
const applyMenuTimerColourBtn = document.getElementById('applyMenuTimerColourBtn');
applyMenuTimerColourBtn.onclick = function applyMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: [normalTimeColour.value, lowTimeColour.value]});
};

//reset
const resetMenuTimerColourBtn = document.getElementById('resetMenuTimerColourBtn');
resetMenuTimerColourBtn.onclick = function resetMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: ["#00FFFF", "#FFA500"]});
};

//======================Find New Game==================================

//initialise
const recordHotkeyBtn = document.getElementById('recordHotkeyBtn'),
    hotkeyDisplay = document.getElementById('hotkeyDisplay');
let hotkey;

//apply / reset
recordHotkeyBtn.onclick = function recordHotkey(){
    if (recordHotkeyBtn.innerHTML === 'Cancel'){
        recordHotkeyBtn.innerHTML = 'Change';
        return;
    }
    recordHotkeyBtn.innerHTML = 'Cancel';
    document.addEventListener("keydown", event =>{
        hotkey = event.key;
        hotkeyDisplay.innerHTML = hotkey;
        recordHotkeyBtn.innerHTML = 'Change';
        chrome.storage.sync.set({'newGameHotkey': hotkey});
    }, {once: true});
};

//======================Winning Display================================

//initialise
const winningColour = document.getElementById('winningColour'),
    losingColour = document.getElementById('losingColour'),
    drawColour = document.getElementById('drawColour'),
    winDispHorPosSlider = document.getElementById('winDispHorPosSlider'),
    winDispHorPosNumber = document.getElementById('winDispHorPosNumber'),
    winDispVerPosSlider = document.getElementById('winDispVerPosSlider'),
    winDispVerPosNumber = document.getElementById('winDispVerPosNumber');

winDispHorPosSlider.addEventListener('input', event => {
    winDispHorPosNumber.value = event.target.value;
});
winDispHorPosNumber.addEventListener('input', event => {
    winDispHorPosSlider.value = event.target.value;
});
winDispVerPosSlider.addEventListener('input', event => {
    winDispVerPosNumber.value = event.target.value;
});
winDispVerPosNumber.addEventListener('input', event => {
    winDispVerPosSlider.value = event.target.value;
});

//apply
const applyWinningDisplayBtn = document.getElementById('applyWinningDisplayBtn');
applyWinningDisplayBtn.onclick = function applyWinningDisplay(){
    chrome.storage.sync.set({winningDisplay: {
        colours: [winningColour.value, losingColour.value, drawColour.value],
        position: [`${winDispHorPosNumber.value}%`, `${winDispVerPosSlider.value}%`]
    }});
};

//reset
const resetWinningDisplayBtn = document.getElementById('resetWinningDisplayBtn');
resetWinningDisplayBtn.onclick = function resetWinningDisplay(){
    chrome.storage.sync.set({winningDisplay: {
        colours: ['#5699eb','#eb5656', '#909497'],
        position: ['40%','80%']
    }});
};

//======================KDR Display====================================

//initialise
const aboveTargetColour = document.getElementById('aboveTargetColour'),
    belowTargetColour = document.getElementById('belowTargetColour'),
    kdrDispHorPosSlider = document.getElementById('kdrDispHorPosSlider'),
    kdrDispHorPosNumber = document.getElementById('kdrDispHorPosNumber'),
    kdrDispVerPosSlider = document.getElementById('kdrDispVerPosSlider'),
    kdrDispVerPosNumber = document.getElementById('kdrDispVerPosNumber'),
    targetKdr = document.getElementById('targetKdr');

//sync sliders and numbers
kdrDispHorPosSlider.addEventListener('input', event => {
    kdrDispHorPosNumber.value = event.target.value;
});
kdrDispHorPosNumber.addEventListener('input', event => {
    kdrDispHorPosSlider.value = event.target.value;
});
kdrDispVerPosSlider.addEventListener('input', event => {
    kdrDispVerPosNumber.value = event.target.value;
});
kdrDispVerPosNumber.addEventListener('input', event => {
    kdrDispVerPosSlider.value = event.target.value;
});

//apply
const applyKdrDisplayBtn = document.getElementById('applyKdrDisplayBtn');
applyKdrDisplayBtn.onclick = function applyKdrDisplay(){
    chrome.storage.sync.set({kdrDisplay: {
        colours: [aboveTargetColour.value, belowTargetColour.value],
        position: [`${kdrDispHorPosNumber.value}%`, `${kdrDispVerPosSlider.value}%`],
        target: targetKdr.value
    }});
};

//reset
const resetKdrDisplayBtn = document.getElementById('resetKdrDisplayBtn');
resetKdrDisplayBtn.onclick = function resetKdrDisplay(){
    chrome.storage.sync.set({kdrDisplay: {
        colours: ['#8BC34A', '#E74C3C'],
        position: ['60%', '80%'],
        target: 0
    }});
};

//======================SET ALL VALUES=================================
chrome.storage.sync.get(null, results=>{
    //winningDisplay
    winDispHorPosSlider.value = parseInt(results.winningDisplay.position[0]);
    winDispHorPosNumber.value = parseInt(results.winningDisplay.position[0]);
    winDispVerPosSlider.value = parseInt(results.winningDisplay.position[1]);
    winDispVerPosNumber.value = parseInt(results.winningDisplay.position[1]);
    winningColour.value = results.winningDisplay.colours[0];
    losingColour.value = results.winningDisplay.colours[1];
    drawColour.value =  results.winningDisplay.colours[2];
    //newGame hotkey
    hotkeyDisplay.innerHTML = results.newGameHotkey;
    //menuTimer
    normalTimeColour.value = results.menuTimerColours[0];
    lowTimeColour.value = results.menuTimerColours[1];
    //kdrDisplay
    kdrDispHorPosSlider.value = parseInt(results.kdrDisplay.position[0]);
    kdrDispHorPosNumber.value = parseInt(results.kdrDisplay.position[0]);
    kdrDispVerPosSlider.value = parseInt(results.kdrDisplay.position[1]);
    kdrDispVerPosNumber.value = parseInt(results.kdrDisplay.position[1]);
    aboveTargetColour.value =  results.kdrDisplay.colours[0];
    belowTargetColour.value = results.kdrDisplay.colours[1];
    targetKdr.value = results.kdrDisplay.target;
})