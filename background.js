chrome.runtime.onInstalled.addListener(()=>{
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
    });
});

//chrome.storage.sync.clear()