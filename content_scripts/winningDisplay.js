'use strict';
//variable declarations
const childListMutation = { childList: true },
    teamModeMutation = { subtree: true, attributeFilter: ['class'], childList: true };
let observeLeaderboard, observeTeamScores;
const mapInfo = document.getElementById('mapInfo');

//create display
const winningDisplay = document.createElement('span');
winningDisplay.setAttribute('id', 'winningDisplay');
winningDisplay.setAttribute('style', 'position: fixed; padding: 0.5em; border-radius: 0.5em');
document.getElementById('gameUI').prepend(winningDisplay);
setDisplay('TEAM');

//refresh display every game
const observeMapInfo = new MutationObserver(() => {
    winningDisplayUpdate();
});
observeMapInfo.observe(mapInfo, childListMutation);

const observeEnd = new MutationObserver(()=>{
    if (menuTimer.innerHTML.startsWith('N')) {
        setDisplay('TEAM');
    } else {
        setDisplay('update');
    }
})
observeEnd.observe(menuTimer, { childList: true });

//set display
function setDisplay(status) {
        
    chrome.storage.sync.get(['winningDisplay', 'toggles'], result => {
        if (status !== 'update'){
            winningDisplay.innerHTML = status;
            const colours = result.winningDisplay.colours
            winningDisplay.style.color = `${status === 'Winning' ? colours[0] : status === 'Losing' ? colours[1] : colours[2]}`
        };
        winningDisplay.style.display = result.toggles[1] ? 'inline' : 'none';
        winningDisplay.style.left = result.winningDisplay.position[0];
        winningDisplay.style.top = result.winningDisplay.position[1];
        winningDisplay.style.fontSize = result.winningDisplay.size;
        winningDisplay.style.background = `rgba(0, 0, 0, ${result.winningDisplay.opacity})`;
    });
};

//determine winning/losing
function winningDisplayUpdate(){
    if (observeLeaderboard){
        observeLeaderboard.disconnect();
    };
    if (observeTeamScores){
        observeTeamScores.disconnect();
    };
    if (mapInfo.innerHTML.includes('ffa')){        

        const newScoreboard = document.getElementById('leaderContainerD'),
            oldScoreboard = document.getElementById('leaderContainer');
            
        observeLeaderboard = new MutationObserver(mutations => {

            if(['newLeaderNameM', 'leaderNameM'].includes(mutations[0].addedNodes[0].childNodes[1].className)){
                setDisplay('Winning');
            } else {
                setDisplay('Losing');
            };
        });

        observeLeaderboard.observe(newScoreboard, childListMutation);
        observeLeaderboard.observe(oldScoreboard, childListMutation);

    } else {

        const teamScores = document.getElementById('teamScores');

        observeTeamScores = new MutationObserver(mutations => {

            if (mutations[0].target.id === 'teamScores' || mutations[0].target.className === 'tScoreM' || !document.getElementsByClassName('you').length) return;

            let allyScore, enemyScore;

            if (mapInfo.innerHTML.includes('ctf')){
                //optimise ctf if performance issues
                allyScore = parseInt(document.getElementsByClassName('tScoreF you')[0].previousElementSibling.innerHTML);
                enemyScore = parseInt(document.querySelector('.tScoreF:not(.you)').previousElementSibling.innerHTML);
            } else {
                allyScore = parseInt(document.getElementsByClassName('tScoreC you')[0].nextElementSibling.innerHTML);
                enemyScore = parseInt(document.querySelector('.tScoreC:not(.you)').nextElementSibling.innerHTML);
            };

            if (allyScore > enemyScore){
                setDisplay('Winning');
            } else if (allyScore === enemyScore){
                setDisplay('Draw');
            } else {
                setDisplay('Losing');
            };

        });
        observeTeamScores.observe(teamScores, teamModeMutation);
    };
};