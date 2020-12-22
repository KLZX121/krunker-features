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

//apply colours
const applyWinningDisplayColourBtn = document.getElementById('applyWinningDisplayColourBtn');
applyWinningDisplayColourBtn.onclick = function applyWinningDisplayColour(){
    chrome.storage.sync.set({winningDisplay: {colours: [winningColour.value, losingColour.value, drawColour.value]} });
};

//Reset colours
const resetWinningDisplayColourBtn = document.getElementById('resetWinningDisplayColourBtn');
resetWinningDisplayColourBtn.onclick = function resetWinningDisplayColour(){
    chrome.storage.sync.set({winningDisplay: {colours: ['#5699eb','#eb5656', '#909497']}});
};