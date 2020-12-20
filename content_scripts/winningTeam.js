'use strict';
const mutationOptions = { childList: true};
//ffa
function ffaWinningDisplay(){

    const newScoreboard = document.getElementById('leaderContainerD'),
        oldScoreboard = document.getElementById('leaderContainer');
    const observeLeaderboard = new MutationObserver(mutations => {

        for(const mutation of mutations) {

            console.log(mutation.addedNodes[0].childNodes[1].className) //newLeaderNameM or leaderNameM
        };
    });

    observeLeaderboard.observe(newScoreboard, mutationOptions);
    observeLeaderboard.observe(oldScoreboard, mutationOptions);
}

//team
function teamWinningDisplay(){

    const teamScores = document.getElementById('teamScores')
    const observeTeamScores = new MutationObserver(mutations => {

        for (const mutation of mutations) {
            let allyScore = parseInt(document.getElementsByClassName('tScoreC you')[0].nextElementSibling.innerHTML);
            let enemyScore = parseInt(document.querySelector('.tScoreC:not(.you)').nextElementSibling.innerHTML);
            console.log(allyScore);
            console.log(enemyScore);
            if (allyScore > enemyScore){
                //winning
            } else if (allyScore === enemyScore){
                //drawing
            } else {
                //losing
            }
        }
    })
    observeTeamScores.observe(teamScores, {subtree: true, attributeFilter: ['class'], childList: true});

}

//ctf
function ctfWinningDisplay(){

}

//mode
const mapInfo = document.getElementById('mapInfo');
const observeMapInfo = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        if (mutation.addedNodes[0].data.includes('ffa')){
            ffaWinningDisplay();
        } else if (mutation.addedNodes[0].data.includes('ctf')){

        } else {
            teamWinningDisplay();
        }
    }
})
observeMapInfo.observe(mapInfo, mutationOptions);

/*if (observeLeaderboard) {
    observeLeaderboard.disconnect()
}*/