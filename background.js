chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({'normalTimeColour': null, 'lowTimeColour': null}, function() {
        console.log('menuTimer colours set to null');
    });
})

//chrome.storage.sync.clear()