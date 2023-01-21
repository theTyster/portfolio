"use strict";
const body = document.querySelector('body');
let duckInput = document.querySelector("input[name='duck_color_name']");
let duck = {};
let phaseOne = document.querySelector('p.phaseOne');

let colorizeDuck = function saveDuckColorToObject() {
   duckInput.style.backgroundColor = duckInput.value;
   //saves input to memory.
   duck.color = duckInput.value;
}

document.addEventListener('keyup', (event) => {
   const keyName = event.key;
   // listens for Enter and then... 
   if (keyName === 'Enter') {
      //Colors the Duck based on the input...
      colorizeDuck();
      phaseOne.innerHTML = `<p class="phaseOne">Hmmmmmmm....</p>`
      // And checks to see if it was a valid color.
      let checkInput = () => {
         let currentDuckStyle = window.getComputedStyle(duckInput).getPropertyValue("background-color");
         let regex = /rgb\(255, 255, 255\)/g;
         let match = currentDuckStyle.match(regex);
         console.log(currentDuckStyle);
         console.log(match);
         if (match) {
         phaseOne.innerHTML = `<p class="phaseOne">No, that wasn't it...</p>`;
         }
         else {
         phaseOne.innerHTML = `<p class="phaseOne">Ah, yes. It was definitely a ${duck.color} duck.</p>`;
         }
      };
   setTimeout(checkInput, 3000);
      //MAKE A CONSTRUCTOR FUNCTION FOR THESE
   let phaseTwoFN = function showPhaseTwoText() {
      let phaseTwo = document.querySelector('p.phaseTwo');
      phaseTwo.style.display = "block";
   }
   let phaseThreeFN = function showPhaseThreeText() {
      let phaseThree = document.querySelector('div.phaseThree');
      phaseThree.style.display = "block";
   }
   setTimeout(phaseTwoFN, 6000);
   setTimeout(phaseThreeFN, 8000);
   };
});
