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
   let phase = function(phaseNo, tag, time) {
      this.fn = function() {
         this.no = document.querySelector(`${tag}.${phaseNo}`),
         this.no.style.display = "block";
      },
      this.timeout = function() {setTimeout(this.fn, time)}
   };

   let phaseTwo = new phase("phaseTwo", "p", 6000);
      phaseTwo.timeout();
   let phaseThree = new phase("phaseThree", "div", 8000);
      phaseThree.timeout();
   };
});
