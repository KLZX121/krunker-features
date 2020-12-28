//DEFAULT SETTINGS REFERENCES
//background.js
//reset buttons for each feature
//reset all settings

//combine all into one save button
//export/import settings
//reference input events in html

//======================Settings=======================================
const importSettings = document.getElementById('importSettings'),
    exportSettings = document.getElementById('exportSettings'),
    settingsText = document.getElementById('settingsText'),
    resetAllSettingsBtn = document.getElementById('resetAllSettingsBtn');

importSettings.onclick = () => {
    try {
        let settings = JSON.parse(settingsText.value);
        chrome.storage.sync.set(settings);
        setAllValues();
        settingsText.value = null;
    } catch (error) {
        settingsText.value = null;
        settingsText.setAttribute('placeholder', error);
        setTimeout(() => {
            settingsText.setAttribute('placeholder', 'Paste settings to import or press export and copy settings')
        }, 5000);
    };
}
exportSettings.onclick = () => {
    chrome.storage.sync.get(null, results => {
        settingsText.value = JSON.stringify(results);
    })
}
resetAllSettingsBtn.onclick = () => {
    if (window.confirm('Reset ALL SETTINGS to default?')) {
        chrome.storage.sync.clear();
        chrome.storage.sync.set({
        
            menuTimerColours: ["#00FFFF","#FFA500"],
            newGameHotkey:'F4',
            winningDisplay: {
                colours: ['#5699eb','#eb5656', '#909497'], //winning, losing, draw
                position: ['40%','80%'] //left, top
            },
            kdrDisplay: {
                colours: ['#8BC34A', '#E74C3C'], //over min, under min
                position: ['55%', '80%'], //left, top
                target: 0
            },
            toggles: [true, true, true] //menuTimer, winningDisplay, kdrDisplay
        }, setAllValues)
    }
}

//======================Tabs===========================================

const settingsContainer = document.getElementById('settingsContainer'),
    infoContainer = document.getElementById('infoContainer'),
    settingsBtn = document.getElementById('settingsBtn'),
    infoBtn = document.getElementById('infoBtn');
    
settingsBtn.onclick = switchToSettings;
infoBtn.onclick = switchToInfo;
function switchToSettings(){
    infoContainer.style.display = 'none';
    settingsContainer.style.display = 'block';
    infoBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    settingsBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
};
function switchToInfo(){
    settingsContainer.style.display = 'none';
    infoContainer.style.display = 'block';
    settingsBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    infoBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
};

//======================Menu Timer=====================================

//initialise
const normalTimeColour = document.getElementById('normalTimeColour'),
    lowTimeColour = document.getElementById('lowTimeColour');

//apply
const applyMenuTimerColourBtn = document.getElementById('applyMenuTimerColourBtn');
applyMenuTimerColourBtn.onclick = function applyMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: [normalTimeColour.value, lowTimeColour.value]});
};

//reset
const resetMenuTimerColourBtn = document.getElementById('resetMenuTimerColourBtn');
resetMenuTimerColourBtn.onclick = function resetMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: ["#00FFFF", "#FFA500"]});
    chrome.storage.sync.get('menuTimerColours', results => {
        normalTimeColour.value = results.menuTimerColours[0];
        lowTimeColour.value = results.menuTimerColours[1];
    })
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
        hotkeyDisplay.removeAttribute('style');
        chrome.storage.sync.get('newGameHotkey', results => {
            hotkeyDisplay.innerHTML = results.newGameHotkey;
        })
        return;
    }
    recordHotkeyBtn.innerHTML = 'Cancel';
    hotkeyDisplay.innerHTML = 'Press Key';
    hotkeyDisplay.style.left = '70%';

    document.addEventListener("keydown", event =>{
        hotkey = event.key;
        hotkeyDisplay.innerHTML = hotkey;
        recordHotkeyBtn.innerHTML = 'Change';
        hotkeyDisplay.removeAttribute('style');
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
    chrome.storage.sync.get('winningDisplay', results => {
        const winningDisplay = results.winningDisplay;
        winDispHorPosSlider.value = parseInt(winningDisplay.position[0]);
        winDispHorPosNumber.value = parseInt(winningDisplay.position[0]);
        winDispVerPosSlider.value = parseInt(winningDisplay.position[1]);
        winDispVerPosNumber.value = parseInt(winningDisplay.position[1]);
        winningColour.value = winningDisplay.colours[0];
        losingColour.value = winningDisplay.colours[1];
        drawColour.value =  winningDisplay.colours[2];
    })
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
        position: ['55%', '80%'],
        target: 0
    }});
    chrome.storage.sync.get('kdrDisplay', results => {
        const kdrDisplay = results.kdrDisplay;
        kdrDispHorPosSlider.value = parseInt(kdrDisplay.position[0]);
        kdrDispHorPosNumber.value = parseInt(kdrDisplay.position[0]);
        kdrDispVerPosSlider.value = parseInt(kdrDisplay.position[1]);
        kdrDispVerPosNumber.value = parseInt(kdrDisplay.position[1]);
        aboveTargetColour.value =  kdrDisplay.colours[0];
        belowTargetColour.value = kdrDisplay.colours[1];
        targetKdr.value = kdrDisplay.target;
    })
};
//======================Toggles========================================

const toggleMenuTimer = document.getElementById('toggleMenuTimer'),
    toggleWinningDisplay = document.getElementById('toggleWinningDisplay'),
    toggleKdrDisplay = document.getElementById('toggleKdrDisplay');

toggleMenuTimer.onchange = toggle;
toggleWinningDisplay.onchange = toggle;
toggleKdrDisplay.onchange = toggle;

function toggle(event){
    chrome.storage.sync.get('toggles', results => {
        let toggles = results.toggles;
        toggles[event.target.id === 'toggleMenuTimer' ? 0 : event.target.id === 'toggleWinningDisplay' ? 1 : 2] = event.target.checked ? true : false;
        chrome.storage.sync.set({toggles: toggles});
    });
}

//======================SET ALL VALUES=================================
function setAllValues(){
    chrome.storage.sync.get(null, results=>{
        //toggles
        const toggles = results.toggles;
        toggleMenuTimer.checked = toggles[0];
        toggleWinningDisplay.checked = toggles[1];
        toggleKdrDisplay.checked = toggles[2];
        //winningDisplay
        const winningDisplay = results.winningDisplay;
        winDispHorPosSlider.value = parseInt(winningDisplay.position[0]);
        winDispHorPosNumber.value = parseInt(winningDisplay.position[0]);
        winDispVerPosSlider.value = parseInt(winningDisplay.position[1]);
        winDispVerPosNumber.value = parseInt(winningDisplay.position[1]);
        winningColour.value = winningDisplay.colours[0];
        losingColour.value = winningDisplay.colours[1];
        drawColour.value =  winningDisplay.colours[2];
        //newGame hotkey
        hotkeyDisplay.innerHTML = results.newGameHotkey;
        //menuTimer
        normalTimeColour.value = results.menuTimerColours[0];
        lowTimeColour.value = results.menuTimerColours[1];
        //kdrDisplay
        const kdrDisplay = results.kdrDisplay;
        kdrDispHorPosSlider.value = parseInt(kdrDisplay.position[0]);
        kdrDispHorPosNumber.value = parseInt(kdrDisplay.position[0]);
        kdrDispVerPosSlider.value = parseInt(kdrDisplay.position[1]);
        kdrDispVerPosNumber.value = parseInt(kdrDisplay.position[1]);
        aboveTargetColour.value =  kdrDisplay.colours[0];
        belowTargetColour.value = kdrDisplay.colours[1];
        targetKdr.value = kdrDisplay.target;
    })
}
setAllValues();