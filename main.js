"use strict";
const body = document.querySelector('body');
let duckInput = document.querySelector("input[name='duck_color_name']");
let duck = {
   water: document.querySelector("pre#water"),
   illust: document.querySelector("pre#duck"),
};

const phasesObj = {
   phase: function(phaseNo, tag, time) {
      this.no = document.querySelector(`${tag}.${phaseNo}`),
      this.fn = function() {
         this.no.style.display = "block";
      },
      this.timeout = function() {
         setTimeout(this.fn.bind(this), time)
      }
   }
}

let colorizeDuck = function saveDuckColorToObject() {
   duckInput.style.backgroundColor = duckInput.value;
   //saves input to memory.
   return duck.color = duckInput.value;
   }

// defined duck phases:

phasesObj.phaseOne = new phasesObj.phase("phaseOne", "p", 3000) 
phasesObj.phaseTwo = new phasesObj.phase("phaseTwo", "p", 6000);
phasesObj.phaseThree = new phasesObj.phase("phaseThree", "div", 8000);

document.addEventListener('keyup', (event) => {
   const keyName = event.key;
   // listens for Enter and then... 
   if (keyName === 'Enter') {
      //Colors the Duck based on the input...
      colorizeDuck();
      phasesObj.phaseOne.no.innerHTML = `<p class="phaseOne">Hmmmmmmm....</p>`
      // And checks to see if it was a valid color.
      let checkInput = () => {
         let currentDuckStyle = window.getComputedStyle(duckInput).getPropertyValue("background-color");
         let regex = /rgb\(255, 255, 255\)/g;
         let match = currentDuckStyle.match(regex);
         if (match) {
         phasesObj.phaseOne.no.innerHTML = `<p class="phaseOne">No, that wasn't it...</p>`;
         }
         else {
         phasesObj.phaseOne.no.innerHTML = `<p class="phaseOne">Ah, yes. It was definitely a ${duck.color} duck.</p>`;
         duckInput.disabled = true;
         }
      };
   setTimeout(checkInput, 3000);
      phasesObj.phaseTwo.timeout();
      phasesObj.phaseThree.timeout();
      duck.illust.style.color = duck.color;
      duck.water.style.color = "blue";
   };
});
