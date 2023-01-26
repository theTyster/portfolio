"use strict";
const duck = {
   water: document.querySelector("pre#water"),
   illust: document.querySelector("pre#duck"),
};
const page = {
   body:  document.querySelector('body'),
   container: document.querySelector(".container")
}
document.addEventListener('keyup', (event) => {
   const keyName = event.key;
   let duckInput = document.querySelector("input[name='duck_color']");
   const phase = function(phaseNo, tag, time) {
         this.no = document.querySelector(`${tag}.${phaseNo}`),
         this.fn = function() {
              this.no.style.visibility = "unset";
//            this.no.style.position = "relative";
//            this.no.style.opacity = 1;
         },
         this.timeout = function() {
            setTimeout(this.fn.bind(this), time)
         }
   }
   let colorizeDuck = function saveDuckColorToObject() {
      duckInput.style.backgroundColor = duckInput.value;
      //saves input to memory.
      return duck.color = duckInput.value;
      }
   // defined duck phases:
   const phaseOne = new phase("storyStart", "p", 3000) 
   const phaseTwo = new phase("phaseTwo", "p", 6000);
   const phaseThree = new phase("phaseThree", "div", 8000);
   // listens for Enter and then... 
   if (keyName === 'Enter') {
      //Colors the Duck based on the input...
      colorizeDuck();
      phaseOne.fn();
      phaseOne.no.innerHTML = `<p class="storyStart">Hmmmmmmm....</p>`
      // And checks to see if it was a valid color.
      let checkInput = () => {
         let currentDuckStyle = window.getComputedStyle(duckInput).getPropertyValue("background-color");
         let regex = /rgb\(255, 255, 255\)/g;
         let match = currentDuckStyle.match(regex);
         if (match) {
         phaseOne.no.innerHTML = `<p class="storyStart">No, that wasn't it...</p>`;
         }
         else {
         phaseOne.no.innerHTML = `<p class="storyStart">Ah, yes. It was definitely a ${duck.color} duck.</p>`;
         duckInput.disabled = true;
         }
      };
      //executes checks and story phases.
      setTimeout(checkInput, 3000);
      // got frustrated trying to control CSS with JS and decided I needed to learn more.
      page.body.insertAdjacentHTML("afterbegin", '<div class="container">');
      page.body.insertAdjacentHTML("beforeend", '</div>');
      page.container.style.width = "auto";
      page.container.style.marginLeft = "33%";
      page.container.style.marginRight = "33%";
      page.container.style.paddingLeft = "5%";
      page.container.style.paddingRight = "5%";

      phaseTwo.timeout();
      phaseThree.timeout();
      duck.illust.style.color = duck.color;
      duck.water.style.color = "blue";
   };
});
