chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({
        menuTimerColours: ["#00FFFF","#FFA500"],
        newGameHotkey:'F4'
    }, () => {
        console.log('Settings set to default values');
    });
});

//chrome.storage.sync.clear()