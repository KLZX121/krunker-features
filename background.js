chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({
        //menuTimer
        normalTimeColour: "#00FFFF", 
        lowTimeColour: "#FFA500",

        //findNewGame
        newGameHotkey:'F4'
    }, () => {
        console.log('Settings set to default values');
    });
});

//chrome.storage.sync.clear()