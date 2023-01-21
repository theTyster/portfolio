"use strict";
const body = document.querySelector('body');
let duck = document.querySelector("input[name='duck_color_name']");
let duckObject = {}
let result = document.querySelector('p.result');

function colorizeBG() {
   document.querySelector("body").style.backgroundColor = duck.value;
   //saves input to memory.
   duckObject.color = duck.value;
}

document.addEventListener('keyup', (event) => {
   const keyName = event.key;
   // listens for Enter and then... 
   if (keyName === 'Enter') {
      //Colors the BG based on the input...
      colorizeBG();
      duck.value = null;
      result.textContent = "Hmmmmmmm...."
      // And checks to see if it was a valid color.
      let fn = () => {
         let currentBGStyle = window.getComputedStyle(body).getPropertyValue("background-color");
         let regex = /rgba/;
         let match = currentBGStyle.match(regex);
         if (Array.isArray(match)) {
         result.textContent = "No, that wasn't it.";
         };
      result.textContent = `Ah, yes. It was definitely a ${duckObject.color} duck.`;
      };
   setTimeout(fn, 3000);
      
   };
});
