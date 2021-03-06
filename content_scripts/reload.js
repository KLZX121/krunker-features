'use strict';
chrome.storage.sync.get('toggles', result => {
    if (result.toggles[4]){
        const g = document.getElementById.bind(document);

        //replace ammoDisplay
        const  ammoBacking = document.createElement('div');
        ammoBacking.style = 'font-size: 35px; background-color: rgba(0, 0, 0, 0.3); padding: 7px; padding-top: 8px; padding-left: 20px; border-radius: 6px';
        g('bottomRight').appendChild(ammoBacking);
        ammoBacking.append(g('ammoVal'), ' ', g('ammoMax'),' ', g('ammoIcon'));

        //setup ammoDisplay
        const ammoDisplay = document.getElementById('ammoDisplay');
        document.getElementById('inGameUI').prepend(ammoDisplay);

        ammoDisplay.innerHTML = null;

        chrome.storage.sync.get('reload', result => {
            const rgba = `rgba(${hexToRgb(result.reload.colour)},${result.reload.opacity})`;
            
            const left = result.reload.position[0].replace('-', '- ').replace('+', '+ ');
            const top = result.reload.position[1].replace('-', '- ').replace('+', '+ ');
            ammoDisplay.style = `position: absolute; background-color: transparent; 
                width: ${result.reload.size[0]}; 
                height: ${result.reload.size[1]}; 
                left: calc(50% ${left});
                top: calc(50% ${top}); 
                border-radius: 0px;
                background-image: linear-gradient(${rgba}, ${rgba});
            `;
        });

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
        };
    };
});
//credits to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
/*const a = new MutationObserver(mutations => {
    console.log(mutations[0]);
})
a.observe(ammoDisplay, {attributes: true, attributeOldValue: true});
background-size: {100% => 0%} 100%*/