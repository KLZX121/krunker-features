'use strict';
const g = document.getElementById.bind(document);

//setup ammoDisplay
const ammoDisplay = document.getElementById('ammoDisplay');
document.getElementById('inGameUI').prepend(ammoDisplay);

//replace ammoDisplay
const  ammoBacking = document.createElement('div');
ammoBacking.style = 'font-size: 35px; background-color: rgba(0, 0, 0, 0.3); padding: 7px; padding-top: 8px; padding-left: 20px;';
g('bottomRight').appendChild(ammoBacking);
ammoBacking.append(g('ammoVal'), ' ', g('ammoMax'), g('ammoIcon'));

const ammoDisplayStyle = document.styleSheets[0].cssRules[232].style;
ammoDisplayStyle.setProperty('background-image', 'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3))'); //reloading colour
ammoDisplay.style = `position: absolute; background-color: transparent; width: 50px; height: 20px; top: calc(50% - 20px); left: calc(50% - 40px);`;

/*const a = new MutationObserver(mutations => {
    console.log(mutations[0]);
})
a.observe(ammoDisplay, {attributes: true, attributeOldValue: true});
background-size: 100% => 0% 100%*/

//https://stackoverflow.com/questions/36697749/html-get-color-in-rgb