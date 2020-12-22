chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({
        
        menuTimerColours: ["#00FFFF","#FFA500"],
        newGameHotkey:'F4',
        winningDisplay: {
            colours: ['#5699eb','#eb5656', '#909497'],
            position: ['0%','85%']
        }
    });
});

//chrome.storage.sync.clear()