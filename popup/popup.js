//DEFAULT SETTINGS REFERENCES
//background.js
//reset buttons for each feature
//reset all settings

//combine all into one save button
//reference input events in html

const g = document.getElementById.bind(document);

//======================Info Container=================================

const readMe = g('readMe');

chrome.runtime.getPackageDirectoryEntry(root => { 
    const rootReader = root.createReader();
    rootReader.readEntries(result => {
        const readMeFile = result.filter(file => file.name === 'README.md')[0];
        readMeFile.file(file => {
            const fileReader = new FileReader();
            fileReader.onload = e => {
                readMe.innerHTML = e.target.result;
            };
            fileReader.readAsText(file);
        });
        
    });
});

//======================Save Settings==================================

const importSettings = g('importSettings'),
    exportSettings = g('exportSettings'),
    settingsText = g('settingsText'),
    resetAllSettingsBtn = g('resetAllSettingsBtn');

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
    chrome.storage.sync.get(null, result => {
        settingsText.value = JSON.stringify(result);
    })
}

function resetSettings(section, setFunction){
    chrome.runtime.getPackageDirectoryEntry(root => { 

        const rootReader = root.createReader();
        rootReader.readEntries(result => {

            const targetFile = result.filter(file => file.name === 'defaultSettings.json')[0];
            targetFile.file(file => {

                const fileReader = new FileReader();
                fileReader.onload = e => {
                    const data = JSON.parse(e.target.result);
                    if (section){
                        const sectionSettings = new Object();
                        sectionSettings[section] = data[section];
                        chrome.storage.sync.set(sectionSettings);
                        setFunction();
                    } else {
                        chrome.storage.sync.clear();
                        chrome.storage.sync.set(data, setAllValues);
                        setAllValues();
                    }
                    
                };
                fileReader.readAsText(file);
            });
        });
    });
};
resetAllSettingsBtn.onclick = () => {
    if (window.confirm('Reset ALL SETTINGS to default?')) {
        resetSettings();
    }
};

//======================Tabs===========================================

const settingsContainer = g('settingsContainer'),
    infoContainer = g('infoContainer'),
    settingsBtn = g('settingsBtn'),
    infoBtn = g('infoBtn');
    
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

//======================CSS Swapper====================================

const selectCss = g('selectCss'),
    cssFileInput = g('cssFileInput'),
    cssFileBtn = g('cssFileBtn');

//set select options
//code based on https://github.com/Tehchy/Krunker-Resource-Swapper/blob/master/init.js
chrome.runtime.getPackageDirectoryEntry(root => { //gets the root directory
    root.getDirectory('css', { create: false }, dir => { //gets css folder
        
        const reader = dir.createReader();
        reader.readEntries(result => { //gets css files

            for (const file of result) {
                const fileName = file.name.slice(0, file.name.indexOf('.css'))
                const option = document.createElement('option');
                option.setAttribute('value', fileName);
                option.innerHTML = fileName;
                selectCss.appendChild(option);

                chrome.storage.sync.get('css', result => {
                    selectCss.value = result.css;
                })
            }
        })
    })
})

//apply
selectCss.oninput = () => {
    chrome.storage.sync.set({css: selectCss.value});
};

//======================Menu Timer=====================================

//initialise
const normalTimeColour = g('normalTimeColour'),
    lowTimeColour = g('lowTimeColour');

//apply
const applyMenuTimerColourBtn = g('applyMenuTimerColourBtn');
applyMenuTimerColourBtn.onclick = function applyMenuTimerColour(){
    chrome.storage.sync.set({menuTimerColours: [normalTimeColour.value, lowTimeColour.value]});
};

//reset
const resetMenuTimerColourBtn = g('resetMenuTimerColourBtn');
resetMenuTimerColourBtn.onclick = function resetMenuTimerColour(){
    resetSettings('menuTimerColours', setMenuTimer);
};

//======================Find New Game==================================

//initialise
const recordHotkeyBtn = g('recordHotkeyBtn'),
    hotkeyDisplay = g('hotkeyDisplay');
let hotkey;

//apply / reset
recordHotkeyBtn.onclick = function recordHotkey(){
    if (recordHotkeyBtn.innerHTML === 'Cancel'){
        recordHotkeyBtn.innerHTML = 'Change';
        hotkeyDisplay.removeAttribute('style');
        chrome.storage.sync.get('newGameHotkey', result => {
            hotkeyDisplay.innerHTML = result.newGameHotkey;
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
const winningColour = g('winningColour'),
    losingColour = g('losingColour'),
    drawColour = g('drawColour'),
    winDispHorPosSlider = g('winDispHorPosSlider'),
    winDispHorPosNumber = g('winDispHorPosNumber'),
    winDispVerPosSlider = g('winDispVerPosSlider'),
    winDispVerPosNumber = g('winDispVerPosNumber'),
    winningDisplaySize = g('winningDisplaySize'),
    winningDisplayOpacity = g('winningDisplayOpacity');

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
const applyWinningDisplayBtn = g('applyWinningDisplayBtn');
applyWinningDisplayBtn.onclick = function applyWinningDisplay(){
    chrome.storage.sync.set({winningDisplay: {
        colours: [winningColour.value, losingColour.value, drawColour.value],
        position: [`${winDispHorPosNumber.value}%`, `${winDispVerPosSlider.value}%`],
        size: `${winningDisplaySize.value}em`,
        opacity: winningDisplayOpacity.value
    }});
};

//reset
const resetWinningDisplayBtn = g('resetWinningDisplayBtn');
resetWinningDisplayBtn.onclick = function resetWinningDisplay(){
    resetSettings('winningDisplay', setWinningDisplay);
};

//======================KDR Display====================================

//initialise
const aboveTargetColour = g('aboveTargetColour'),
    belowTargetColour = g('belowTargetColour'),
    kdrDispHorPosSlider = g('kdrDispHorPosSlider'),
    kdrDispHorPosNumber = g('kdrDispHorPosNumber'),
    kdrDispVerPosSlider = g('kdrDispVerPosSlider'),
    kdrDispVerPosNumber = g('kdrDispVerPosNumber'),
    targetKdr = g('targetKdr'),
    kdrDisplaySize = g('kdrDisplaySize'),
    kdrDisplayOpacity = g('kdrDisplayOpacity');

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
const applyKdrDisplayBtn = g('applyKdrDisplayBtn');
applyKdrDisplayBtn.onclick = function applyKdrDisplay(){
    chrome.storage.sync.set({kdrDisplay: {
        colours: [aboveTargetColour.value, belowTargetColour.value],
        position: [`${kdrDispHorPosNumber.value}%`, `${kdrDispVerPosSlider.value}%`],
        target: targetKdr.value,
        size: `${kdrDisplaySize.value}em`,
        opacity: kdrDisplayOpacity.value
    }});
};

//reset
const resetKdrDisplayBtn = g('resetKdrDisplayBtn');
resetKdrDisplayBtn.onclick = function resetKdrDisplay(){
    resetSettings('kdrDisplay', setKdrDisplay);
};

//======================Connected Display==============================

//initailise
const conDispHorPosSlider = g('conDispHorPosSlider'),
    conDispHorPosNumber = g('conDispHorPosNumber'),
    conDispVerPosSlider = g('conDispVerPosSlider'),
    conDispVerPosNumber = g('conDispVerPosNumber'),
    connectedColour =  g('connectedColour'),
    updateInt = g('updateInt'),
    connectedDisplaySize = g('connectedDisplaySize'),
    connectedDisplayOpacity = g('connectedDisplayOpacity');

//sync sliders and numbers
conDispHorPosSlider.addEventListener('input', event => {
    conDispHorPosNumber.value = event.target.value;
});
conDispHorPosNumber.addEventListener('input', event => {
    conDispHorPosSlider.value = event.target.value;
});
conDispVerPosSlider.addEventListener('input', event => {
    conDispVerPosNumber.value = event.target.value;
});
conDispVerPosNumber.addEventListener('input', event => {
    conDispVerPosSlider.value = event.target.value;
});

//apply
const applyConnectedDisplayBtn = g('applyConnectedDisplayBtn');
applyConnectedDisplayBtn.onclick = function applyConnectedDisplay(){
    chrome.storage.sync.set({connectedDisplay: {
        colour: connectedColour.value,
        position: [`${conDispHorPosNumber.value}%`, `${conDispVerPosNumber.value}%`],
        updateInt: updateInt.value,
        size: `${connectedDisplaySize.value}em`,
        opacity: connectedDisplayOpacity.value
    }});
};

const resetConnectedDisplayBtn = g('resetConnectedDisplayBtn');
resetConnectedDisplayBtn.onclick = function resetConnectedDisplay(){
    resetSettings('connectedDisplay', setConnectedDisplay);
};

//======================Toggles========================================

const toggleMenuTimer = g('toggleMenuTimer'),
    toggleWinningDisplay = g('toggleWinningDisplay'),
    toggleKdrDisplay = g('toggleKdrDisplay'),
    toggleConnectedDisplay = g('toggleConnectedDisplay'),
    toggleReload = g('toggleReload');

toggleMenuTimer.onchange = toggle;
toggleWinningDisplay.onchange = toggle;
toggleKdrDisplay.onchange = toggle;
toggleConnectedDisplay.onchange = toggle;
toggleReload.onchange = toggle;

function toggle(event){
    chrome.storage.sync.get('toggles', result => {
        const toggles = result.toggles;
        function getId(toggle){
            switch (toggle){
                case 'toggleMenuTimer': 
                    return 0;
                case 'toggleWinningDisplay': 
                    return 1;
                case 'toggleKdrDisplay': 
                    return 2;
                case 'toggleConnectedDisplay': 
                    return 3;
                case 'toggleReload': 
                    return 4;
            };
        };
        const id = getId(event.target.id);
        toggles[id] = event.target.checked;
        chrome.storage.sync.set({toggles: toggles});
    });
}

//======================SET ALL VALUES=================================

setAllValues();
function setMenuTimer(){
    chrome.storage.sync.get('menuTimerColours', result => {
        normalTimeColour.value = result.menuTimerColours[0];
        lowTimeColour.value = result.menuTimerColours[1];
    });
};
function setWinningDisplay(){
    chrome.storage.sync.get('winningDisplay', result => {
        const winningDisplay = result.winningDisplay;
        winDispHorPosSlider.value = parseInt(winningDisplay.position[0]);
        winDispHorPosNumber.value = parseInt(winningDisplay.position[0]);
        winDispVerPosSlider.value = parseInt(winningDisplay.position[1]);
        winDispVerPosNumber.value = parseInt(winningDisplay.position[1]);
        winningColour.value = winningDisplay.colours[0];
        losingColour.value = winningDisplay.colours[1];
        drawColour.value =  winningDisplay.colours[2];
        winningDisplaySize.value = parseFloat(winningDisplay.size);
        winningDisplayOpacity.value = winningDisplay.opacity;
    });
};
function setKdrDisplay(){
    chrome.storage.sync.get('kdrDisplay', result => {
        const kdrDisplay = result.kdrDisplay;
        kdrDispHorPosSlider.value = parseInt(kdrDisplay.position[0]);
        kdrDispHorPosNumber.value = parseInt(kdrDisplay.position[0]);
        kdrDispVerPosSlider.value = parseInt(kdrDisplay.position[1]);
        kdrDispVerPosNumber.value = parseInt(kdrDisplay.position[1]);
        aboveTargetColour.value =  kdrDisplay.colours[0];
        belowTargetColour.value = kdrDisplay.colours[1];
        targetKdr.value = kdrDisplay.target;
        kdrDisplaySize.value = parseFloat(kdrDisplay.size);
        kdrDisplayOpacity.value = kdrDisplay.opacity;
    });
};
function setConnectedDisplay(){
    chrome.storage.sync.get('connectedDisplay', result => {
        const connectedDisplay = result.connectedDisplay;
        conDispHorPosSlider.value = parseInt(connectedDisplay.position[0]);
        conDispHorPosNumber.value = parseInt(connectedDisplay.position[0]);
        conDispVerPosSlider.value = parseInt(connectedDisplay.position[1]);
        conDispVerPosNumber.value = parseInt(connectedDisplay.position[1]);
        connectedColour.value =  connectedDisplay.colour;
        updateInt.value = connectedDisplay.updateInt;
        connectedDisplaySize.value = parseFloat(connectedDisplay.size);
        connectedDisplayOpacity.value = connectedDisplay.opacity;
    });
};
function setAllValues(){
    chrome.storage.sync.get(null, result=>{
        //newGame hotkey
        hotkeyDisplay.innerHTML = result.newGameHotkey;
        //set toggles
        const toggles = result.toggles;
        toggleMenuTimer.checked = toggles[0];
        toggleWinningDisplay.checked = toggles[1];
        toggleKdrDisplay.checked = toggles[2];
        toggleConnectedDisplay.checked = toggles[3];
        toggleReload.checked = toggles[4];
    });
    setMenuTimer();
    setWinningDisplay();
    setKdrDisplay();
    setConnectedDisplay();
};