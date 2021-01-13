'use strict';
const g = document.getElementById.bind(document);

//replace ammoDisplay
const  ammoBacking = document.createElement('div');
ammoBacking.style = 'font-size: 35px; background-color: rgba(0, 0, 0, 0.3); padding: 7px; padding-top: 8px; padding-left: 20px; border-radius: 6px';
g('bottomRight').appendChild(ammoBacking);
ammoBacking.append(g('ammoVal'), ' ', g('ammoMax'), g('ammoIcon'));

//setup ammoDisplay
const ammoDisplay = document.getElementById('ammoDisplay');
document.getElementById('inGameUI').prepend(ammoDisplay);

const ammoDisplayStyle = document.styleSheets[0].cssRules[232].style;
ammoDisplayStyle.setProperty('background-image', 'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3))'); //reloading colour
ammoDisplay.style = `position: absolute; background-color: transparent; width: 50px; height: 5px; top: calc(50% + 35px); left: calc(50% - 40px); border-radius: 0px;`;

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

//credits to https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
/*const a = new MutationObserver(mutations => {
    console.log(mutations[0]);
})
a.observe(ammoDisplay, {attributes: true, attributeOldValue: true});
background-size: {100% => 0%} 100%*/