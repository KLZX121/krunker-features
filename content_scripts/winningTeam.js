'use strict';

const newScoreboard = document.getElementById('leaderContainerD'),
    oldScoreboard = document.getElementById('leaderContainer');
const observeLeaderboard = new MutationObserver(mutations => {
    for(const mutation of mutations) {
        console.log(mutation.addedNodes[0].childNodes[1].className) //newLeaderNameM or leaderNameM
    };
});
observeLeaderboard.observe(newScoreboard, { childList: true });
observeLeaderboard.observe(oldScoreboard, { childList: true });