const inGameUI = document.getElementById('inGameUI');

const observeGameUI = new MutationObserver((mutations, observer) => {
    console.log(observer);
    for (const mutation of mutations){

        if (mutation.target.style.display === 'block'){
            ffa()
            observeGameUI.disconnect();
        }
    }
});

observeGameUI.observe(inGameUI, {attributes: true});

function ffa(){
    //ffa
    //const leaderboard = document.getElementById(`leaderContainer${ document.getElementById('leaderContainerD').innerHTML ? 'D' : ''}`)
    /**/const newScoreboard = document.getElementById('leaderContainerD');
    /**/const oldScoreboard = document.getElementById('leaderContainer');
    const observeLeaderboard = new MutationObserver(mutations => {
        for(const mutation of mutations) {
            console.log(mutation.addedNodes[0].childNodes[1].className) //newLeaderNameM or leaderNameM
        };
    });
    observeLeaderboard.observe(newScoreboard, { childList: true });
    /**/observeLeaderboard.observe(oldScoreboard, { childList: true });
}

