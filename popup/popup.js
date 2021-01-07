//DEFAULT SETTINGS REFERENCES
//background.js
//reset buttons for each feature
//reset all settings

//combine all into one save button
//reference input events in html

//======================Info Container=================================

const readMe = document.getElementById('readMe');

chrome.runtime.getPackageDirectoryEntry(root => { 
    const rootReader = root.createReader();
    rootReader.readEntries(results => { //gets css files
        const readMeFile = results.filter(file => file.name === 'README.md')[0];
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
                position: ['40%','80%'], //left, top
                size: '2em'
            },
            kdrDisplay: {
                colours: ['#8BC34A', '#E74C3C'], //over min, under min
                position: ['55%', '80%'], //left, top
                target: 0,
                size: '2em'
            },
            connectedDisplay: {
                colour: '#FFFFFF',
                position: ['15%', '94%'],
                updateInt: 5000,
                size: '2em'
            },
            toggles: [true, true, true, true], //menuTimer, winningDisplay, kdrDisplay, connectedDisplay
            css: 'default' 
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

//======================CSS Swapper====================================

const selectCss = document.getElementById('selectCss'),
    cssFileInput = document.getElementById('cssFileInput'),
    cssFileBtn = document.getElementById('cssFileBtn');

//set select options
//code based on https://github.com/Tehchy/Krunker-Resource-Swapper/blob/master/init.js
chrome.runtime.getPackageDirectoryEntry(root => { //gets the root directory
    root.getDirectory('css', { create: false }, dir => { //gets css folder
        
        const reader = dir.createReader();
        reader.readEntries(results => { //gets css files

            for (const file of results) {
                const fileName = file.name.slice(0, file.name.indexOf('.css'))
                const option = document.createElement('option');
                option.setAttribute('value', fileName);
                option.innerHTML = fileName;
                selectCss.appendChild(option);

                chrome.storage.sync.get('css', results => {
                    selectCss.value = results.css;
                })
            }
        })
    })
})

//apply
selectCss.oninput = () => {
    chrome.storage.sync.set({css: selectCss.value});
};

/* reads a file
cssFileBtn.onclick = () => document.getElementById('cssFileInput').click();
cssFileInput.oninput = () => {
    const file = cssFileInput.files[0];
    let reader = new FileReader();
    reader.onload = e => {
        const data = e.target.result;
    };
    reader.readAsText(file); 
}*/
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
    winDispVerPosNumber = document.getElementById('winDispVerPosNumber'),
    winningDisplaySize = document.getElementById('winningDisplaySize');

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
        position: [`${winDispHorPosNumber.value}%`, `${winDispVerPosSlider.value}%`],
        size: `${winningDisplaySize.value}em`
    }});
};

//reset
const resetWinningDisplayBtn = document.getElementById('resetWinningDisplayBtn');
resetWinningDisplayBtn.onclick = function resetWinningDisplay(){
    chrome.storage.sync.set({winningDisplay: {
        colours: ['#5699eb','#eb5656', '#909497'],
        position: ['40%','80%'],
        size: '2em'
    }});
    setWinningDisplay();
};

//======================KDR Display====================================

//initialise
const aboveTargetColour = document.getElementById('aboveTargetColour'),
    belowTargetColour = document.getElementById('belowTargetColour'),
    kdrDispHorPosSlider = document.getElementById('kdrDispHorPosSlider'),
    kdrDispHorPosNumber = document.getElementById('kdrDispHorPosNumber'),
    kdrDispVerPosSlider = document.getElementById('kdrDispVerPosSlider'),
    kdrDispVerPosNumber = document.getElementById('kdrDispVerPosNumber'),
    targetKdr = document.getElementById('targetKdr'),
    kdrDisplaySize = document.getElementById('kdrDisplaySize');

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
        target: targetKdr.value,
        size: `${kdrDisplaySize.value}em`
    }});
};

//reset
const resetKdrDisplayBtn = document.getElementById('resetKdrDisplayBtn');
resetKdrDisplayBtn.onclick = function resetKdrDisplay(){
    chrome.storage.sync.set({kdrDisplay: {
        colours: ['#8BC34A', '#E74C3C'],
        position: ['55%', '80%'],
        target: 0,
        size: '2em'
    }});
    setKdrDisplay();
};

//======================Connected Display==============================

//initailise
const conDispHorPosSlider = document.getElementById('conDispHorPosSlider'),
    conDispHorPosNumber = document.getElementById('conDispHorPosNumber'),
    conDispVerPosSlider = document.getElementById('conDispVerPosSlider'),
    conDispVerPosNumber = document.getElementById('conDispVerPosNumber'),
    connectedColour =  document.getElementById('connectedColour'),
    updateInt = document.getElementById('updateInt'),
    connectedDisplaySize = document.getElementById('connectedDisplaySize');

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
const applyConnectedDisplayBtn = document.getElementById('applyConnectedDisplayBtn');
applyConnectedDisplayBtn.onclick = function applyConnectedDisplay(){
    chrome.storage.sync.set({connectedDisplay: {
        colour: connectedColour.value,
        position: [`${conDispHorPosNumber.value}%`, `${conDispVerPosNumber.value}%`],
        updateInt: updateInt.value,
        size: `${connectedDisplaySize.value}em`
    }});
};

const resetConnectedDisplayBtn = document.getElementById('resetConnectedDisplayBtn');
resetConnectedDisplayBtn.onclick = function resetConnectedDisplay(){
    chrome.storage.sync.set({
        connectedDisplay: {
            colour: '#FFFFFF',
            position: ['15%', '94%'],
            updateInt: 5000,
            size: '2em'
        }
    });
    console.log(setConnectedDisplay);
    setConnectedDisplay();
};

//======================Toggles========================================

const toggleMenuTimer = document.getElementById('toggleMenuTimer'),
    toggleWinningDisplay = document.getElementById('toggleWinningDisplay'),
    toggleKdrDisplay = document.getElementById('toggleKdrDisplay'),
    toggleConnectedDisplay = document.getElementById('toggleConnectedDisplay');

toggleMenuTimer.onchange = toggle;
toggleWinningDisplay.onchange = toggle;
toggleKdrDisplay.onchange = toggle;
toggleConnectedDisplay.onchange = toggle;

function toggle(event){
    chrome.storage.sync.get('toggles', results => {
        const toggles = results.toggles;
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
            };
        };
        const id = getId(event.target.id);
        toggles[id] = event.target.checked;
        chrome.storage.sync.set({toggles: toggles});
    });
}

//======================SET ALL VALUES=================================
let setWinningDisplay, setKdrDisplay, setConnectedDisplay;

function setAllValues(){
    chrome.storage.sync.get(null, results=>{
        //newGame hotkey
        hotkeyDisplay.innerHTML = results.newGameHotkey;
        //menuTimer
        normalTimeColour.value = results.menuTimerColours[0];
        lowTimeColour.value = results.menuTimerColours[1];
        //set toggles
        const toggles = results.toggles;
        toggleMenuTimer.checked = toggles[0];
        toggleWinningDisplay.checked = toggles[1];
        toggleKdrDisplay.checked = toggles[2];
        toggleConnectedDisplay.checked = toggles[3];
        setWinningDisplay = () => {
            const winningDisplay = results.winningDisplay;
            winDispHorPosSlider.value = parseInt(winningDisplay.position[0]);
            winDispHorPosNumber.value = parseInt(winningDisplay.position[0]);
            winDispVerPosSlider.value = parseInt(winningDisplay.position[1]);
            winDispVerPosNumber.value = parseInt(winningDisplay.position[1]);
            winningColour.value = winningDisplay.colours[0];
            losingColour.value = winningDisplay.colours[1];
            drawColour.value =  winningDisplay.colours[2];
            winningDisplaySize.value = parseFloat(winningDisplay.size);
        };
        setKdrDisplay = () => {
            const kdrDisplay = results.kdrDisplay;
            kdrDispHorPosSlider.value = parseInt(kdrDisplay.position[0]);
            kdrDispHorPosNumber.value = parseInt(kdrDisplay.position[0]);
            kdrDispVerPosSlider.value = parseInt(kdrDisplay.position[1]);
            kdrDispVerPosNumber.value = parseInt(kdrDisplay.position[1]);
            aboveTargetColour.value =  kdrDisplay.colours[0];
            belowTargetColour.value = kdrDisplay.colours[1];
            targetKdr.value = kdrDisplay.target;
            kdrDisplaySize.value = parseFloat(kdrDisplay.size);
        };
        setConnectedDisplay = () => {
            const connectedDisplay = results.connectedDisplay;
            conDispHorPosSlider.value = parseInt(connectedDisplay.position[0]);
            conDispHorPosNumber.value = parseInt(connectedDisplay.position[0]);
            conDispVerPosSlider.value = parseInt(connectedDisplay.position[1]);
            conDispVerPosNumber.value = parseInt(connectedDisplay.position[1]);
            connectedColour.value =  connectedDisplay.colour;
            updateInt.value = connectedDisplay.updateInt;
            connectedDisplaySize.value = parseFloat(connectedDisplay.size);
        }
        setWinningDisplay();
        setKdrDisplay();
        setConnectedDisplay();
    })
}
setAllValues();