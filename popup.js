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

//Colour form handling===========================

let normalTimeColour = document.getElementById('normalTimeColour');
let lowTimeColour = document.getElementById('lowTimeColour');

//Set colour pickers to display appropriate colour

chrome.storage.sync.get(['normalTimeColour', 'lowTimeColour'], result => {
    normalTimeColour.setAttribute('value', result.normalTimeColour);
    lowTimeColour.setAttribute('value', result.lowTimeColour);
})

//Apply colour changes
let applyColourBtn = document.getElementById('applyColourBtn');
applyColourBtn.onclick = function applyColour(){
    chrome.storage.sync.set({'normalTimeColour':normalTimeColour.value, "lowTimeColour": lowTimeColour.value});
};

//Reset colour to default
let resetColourBtn = document.getElementById('resetColourBtn');
resetColourBtn.onclick = function resetColour(){
    chrome.storage.sync.set({'normalTimeColour':"#00FFFF", "lowTimeColour": "#FFA500"});
};

