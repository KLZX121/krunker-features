chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({
        
        menuTimerColours: ["#00FFFF","#FFA500"],
        newGameHotkey:'F4',
        winningDisplay: {
            colours: ['#5699eb','#eb5656', '#909497'], //winning, losing, draw
            position: ['40%','80%'], //left, top
            size: '2em',
            opacity: 0.5
        },
        kdrDisplay: {
            colours: ['#8BC34A', '#E74C3C'], //over min, under min
            position: ['55%', '80%'], //left, top
            target: 0,
            size: '2em',
            opacity: 0.5
        },
        connectedDisplay: {
            colour: '#FFFFFF',
            position: ['15%', '94%'],
            updateInt: 5000,
            size: '2em',
            opacity: 0.5
        },
        toggles: [true, true, true, true], //menuTimer, winningDisplay, kdrDisplay, connectedDisplay
        css: 'default'
    });
});

//chrome.storage.sync.clear()