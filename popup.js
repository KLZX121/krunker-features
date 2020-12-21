//Tabs===========================================

let settings = document.getElementById('settings');
let info = document.getElementById('info');
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

let normalTimeColour = document.getElementById('normalTimeColour');
let lowTimeColour = document.getElementById('lowTimeColour');

//Set colour pickers to display appropriate colour

chrome.storage.sync.get('menuTimerColours', result => {
    normalTimeColour.setAttribute('value', result.menuTimerColours[0]);
    lowTimeColour.setAttribute('value', result.menuTimerColours[1]);
})

//Apply colour changes
let applyColourBtn = document.getElementById('applyColourBtn');
applyColourBtn.onclick = function applyColour(){
    chrome.storage.sync.set({menuTimerColours: [normalTimeColour.value, lowTimeColour.value]});
};

//Reset colour to default
let resetColourBtn = document.getElementById('resetColourBtn');
resetColourBtn.onclick = function resetColour(){
    chrome.storage.sync.set({menuTimerColours: ["#00FFFF", "#FFA500"]});
};

//Find New Game==================================

const recordHotkeyBtn = document.getElementById('recordHotkeyBtn');
let hotkeyDisplay = document.getElementById('hotkeyDisplay');
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