'use strict';
//variable declarations
const childListMutation = { childList: true },
    teamModeMutation = { subtree: true, attributeFilter: ['class'], childList: true };
let observeLeaderboard, observeTeamScores;

const mapInfo = document.getElementById('mapInfo');

const observeMapInfo = new MutationObserver(() => {
    winningDisplay();
});

observeMapInfo.observe(mapInfo, childListMutation);

function winningDisplay(){

    if (observeLeaderboard){
        observeLeaderboard.disconnect();
    }
    if (observeTeamScores){
        observeTeamScores.disconnect();
    }

    if (mapInfo.innerHTML.includes('ffa')){        

        const newScoreboard = document.getElementById('leaderContainerD'),
            oldScoreboard = document.getElementById('leaderContainer');
        observeLeaderboard = new MutationObserver(mutations => {
            console.log('ffa');
            console.log(mutations[0].addedNodes[0].childNodes[1].className); //newLeaderNameM or leaderNameM and dont use mutations
        });

        observeLeaderboard.observe(newScoreboard, childListMutation);
        observeLeaderboard.observe(oldScoreboard, childListMutation);

    } else {

        const teamScores = document.getElementById('teamScores');
        observeTeamScores = new MutationObserver(mutations => {
            console.log(mutations[0]);
            if (mutations[0].target.id === 'teamScores' || mutations[0].target.className === 'tScoreM') return;

            let allyScore, enemyScore;

            if (mapInfo.innerHTML.includes('ctf')){
                //optimise ctf if performance issues
                allyScore = parseInt(document.getElementsByClassName('tScoreF you')[0].previousElementSibling.innerHTML);
                enemyScore = parseInt(document.querySelector('.tScoreF:not(.you)').previousElementSibling.innerHTML);
                console.log('ctf');
                console.log(allyScore);
                console.log(enemyScore);

            } else {

                allyScore = parseInt(document.getElementsByClassName('tScoreC you')[0].nextElementSibling.innerHTML);
                enemyScore = parseInt(document.querySelector('.tScoreC:not(.you)').nextElementSibling.innerHTML);
                console.log('team')
                console.log(allyScore);
                console.log(enemyScore);

            }

            if (allyScore > enemyScore){
                //winning
            } else if (allyScore === enemyScore){
                //drawing
            } else {
                //losing
            }

        })
        observeTeamScores.observe(teamScores, teamModeMutation);

    }
}