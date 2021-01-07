'use strict';
const chatList = document.getElementById('chatList'),
    chatInput = document.getElementById('chatInput');

//create display
const connectedDisplay = document.createElement('span');
connectedDisplay.setAttribute('id', 'connectedDisplay');
connectedDisplay.setAttribute('style', 'position: fixed; font-size: xx-large; background: rgba(0, 0, 0, 0.5); padding: 0.5em; border-radius: 0.5em');
document.getElementById('gameUI').prepend(connectedDisplay);

let i;
setInterval(updateConnectedDisplay, 500);

const observeChatList = new MutationObserver(mutations=>{
    const chatMsg = mutations[0].addedNodes[0] || mutations[1].addedNodes[0];
    const chatText = chatMsg.innerText;

    if (!chatText.includes('Must be lvl 5 to use chat') && !chatText.includes('connected,') ) return;
    chatMsg.style.display = 'none';
    if (chatText !== connectedDisplay.innerHTML) {
        connectedDisplay.innerHTML = chatText;
    };
    observeChatList.disconnect();
});

function sendChatMsg(){
    if (document.activeElement === chatInput) return;
    chatInput.value = '/c';
    chatInput.focus();
    const ke = new KeyboardEvent('keydown', {
        bubbles: true, cancelable: true, keyCode: 13
    });
    document.body.dispatchEvent(ke);
    observeChatList.observe(chatList, { childList: true });
}

function updateConnectedDisplay(){
    chrome.storage.sync.get(['connectedDisplay', 'toggles'], results => {
        connectedDisplay.style.display = results.toggles[3] ? 'inline' : 'none';
        connectedDisplay.style.color = results.connectedDisplay.colour;
        connectedDisplay.style.left = results.connectedDisplay.position[0];
        connectedDisplay.style.top = results.connectedDisplay.position[1];
        let updateInt = results.connectedDisplay.updateInt;
        if (!i) {
            i = setInterval(sendChatMsg, updateInt);
        };
    });
};