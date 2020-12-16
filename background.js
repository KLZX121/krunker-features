chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({'normalTimeColour': "#00FFFF", 'lowTimeColour': "#FFA500"}, function() {
        console.log('Settings reset to default');
    });
})

//chrome.storage.sync.clear()