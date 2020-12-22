//combine setting of colours
//combine all into one save button
//export/import settings

//Tabs===========================================

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

//Menu Timer=====================================

const normalTimeColour = document.getElementById('normalTimeColour');
const lowTimeColour = document.getElementById('lowTimeColour');

//Set colour pickers to display appropriate colour
chrome.storage.sync.get('menuTimerColours', result => {
    normalTimeColour.setAttribute('value', result.menuTimerColours[0]);
    lowTimeColour.setAttribute('value', result.menuTimerColours[1]);
})

//Apply colour changes
const applyMenuTimerColourBtn = document.getElementById('applyMenuTimerColourBtn');
applyMenuTimerColourBtn.onclick = function applyMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: [normalTimeColour.value, lowTimeColour.value]});
};

//Reset colour to default
const resetMenuTimerColourBtn = document.getElementById('resetMenuTimerColourBtn');
resetMenuTimerColourBtn.onclick = function resetMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: ["#00FFFF", "#FFA500"]});
};

//Find New Game==================================

const recordHotkeyBtn = document.getElementById('recordHotkeyBtn'),
    hotkeyDisplay = document.getElementById('hotkeyDisplay');
let hotkey;

//Display hotkey
chrome.storage.sync.get('newGameHotkey', result => {
    hotkey = result.newGameHotkey;
    hotkeyDisplay.innerHTML = hotkey;
});

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

//Winning Display================================

//Colours

const winningColour = document.getElementById('winningColour'),
    losingColour = document.getElementById('losingColour'),
    drawColour = document.getElementById('drawColour');

//set colours to display
chrome.storage.sync.get('winningDisplay', result => {
    const colours = result.winningDisplay.colours;
    winningColour.setAttribute('value', colours[0]);
    losingColour.setAttribute('value', colours[1]);
    drawColour.setAttribute('value', colours[2]);
})

//Positions

const winDispHorPosSlider = document.getElementById('winDispHorPosSlider'),
    winDispHorPosNumber = document.getElementById('winDispHorPosNumber'),
    winDispVerPosSlider = document.getElementById('winDispVerPosSlider'),
    winDispVerPosNumber = document.getElementById('winDispVerPosNumber');

chrome.storage.sync.get('winningDisplay', results => {
    const position = results.winningDisplay.position;
    winDispHorPosSlider.value = parseInt(position[0]);
    winDispHorPosNumber.value = parseInt(position[0]);
    winDispVerPosSlider.value = parseInt(position[1]);
    winDispVerPosNumber.value = parseInt(position[1]);
});

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

//apply winning display changes
const applyWinningDisplayBtn = document.getElementById('applyWinningDisplayBtn');
applyWinningDisplayBtn.onclick = function applyWinningDisplay(){
    chrome.storage.sync.set({winningDisplay: {
        colours: [winningColour.value, losingColour.value, drawColour.value],
        position: [`${winDispHorPosNumber.value}%`, `${winDispVerPosSlider.value}%`]
    }});
};

//reset winning display
const resetWinningDisplayBtn = document.getElementById('resetWinningDisplayBtn');
resetWinningDisplayBtn.onclick = function resetWinningDisplay(){
    chrome.storage.sync.set({winningDisplay: {
        colours: ['#5699eb','#eb5656', '#909497'],
        position: ['0%','85%']
    }});
};