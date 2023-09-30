//TODO
//Combine all tags as refs that can be used to manipulate the DOM.

//DEV Libraries
import {useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

//COMPONENTS
import SvgDuck from "./assets/duck.jsx";

//CSS
import "./css/story-styles.scss";
import "./css/animate_water_flow.scss";
import "./css/animate_rain.scss";

const Story = ({setStory})=>{

  //Props Validation
  Story.propTypes = {
    setStory: PropTypes.func,
  }


  //ANIMATIONS
	let placement_tl;

  useLayoutEffect(()=>{


    const ctx = gsap.context(()=>{
			let placement = {}
			if(window.screen.width < 700){
				placement = {
					scale:.25,
					y:-400,
					x:""
				}
			}
			else if(window.screen.width < 900){
				placement = {
					scale:.6,
					y:-280,
					x:280
				}
			}
			else{
				placement = {
					scale:.6,
					y:-300,
					x:430
				}
			}
      const dur = 1;
      placement_tl = gsap.timeline();
      placement_tl
        .from("p", {duration:dur, opacity:0, y:"+=10"})
        .from("footer", {duration:dur, y:"+=200px"},"<")
        .from("main", {duration:dur, height:"100vh"},"<")
				.to("#duck-canvas", {duration:dur, width:"auto", ...placement})
      
    })


    return () => {
      ctx.revert();
    }
  }, [])


//UTILITIES
  //constructor used for showing and hiding objects. Uses the computed transition time as the timer for sleeping the integrated promise.
  const displayFunc = function() {
    this.tag = useRef(),
      this.show = async function({sec = 1, rel = true, disp = "block"} = {}){
        this.tag.current.style.display = disp;
      if (rel)
        this.tag.current.style.position = "relative";
      if (!rel)
        this.tag.current.style.position = "absolute";
      await sleep(sec * 1);
      },
    this.hide = async function(sec = .5){
      this.tag.current.style.display = "none";
      await sleep(sec * 1);
    }
  };

  // custom sleep function.
  const sleep = time => new Promise(resolve => setTimeout(resolve, time * 1000));

  //PAGE TAGS
  const page = {
    //Unilateral Tags
    border: document.querySelector("#app"),
    lightGreenBG: "#B3DCBD",
    container: useRef(),
    duckType: [],
    friendType: document.querySelectorAll(".friend_type"),
    friendName: document.querySelectorAll(".friend_name"),
    helper: new displayFunc(),
  }

  // Beginning Tags
	const beginningPage = {
    oneTime: new displayFunc(),
    startButton: new displayFunc(),
    hm: new displayFunc(),
    no: new displayFunc(),
    yes: new displayFunc(),
    phaseOne:{
      duckInline: new displayFunc(),
      duckInlineInput: new displayFunc(),
      duckWhatColor: new displayFunc(),
    },
    phaseTwo:{
      body: new displayFunc(),
      where: new displayFunc(),
      letsSee: new displayFunc(),
      eyes: new displayFunc(),
      ah: new displayFunc(),
      thereSheIs: new displayFunc(),
      splashing: new displayFunc(),
    },
    phaseThree:{
      body: new displayFunc(),
      chooseAFriend: new displayFunc(),
			frogSelect:new displayFunc(),
			dogSelect:new displayFunc(),
			hogSelect:new displayFunc(),
			eggnogSelect:new displayFunc(),
      tryAgain: new displayFunc(),
      friendDeclare: new displayFunc(),
      friendNameInput: new displayFunc(),
      friendNameCheck: new displayFunc(),
      friendNameCheckYes: new displayFunc(),
      friendNameCheckNo: new displayFunc(),
      friendColorQuestion: new displayFunc(),
      friendColorInput: new displayFunc(),
      friendColor: new displayFunc(),
      friendGoofy: new displayFunc(),
      friendLaugh: new displayFunc(),
      duckLaugh: new displayFunc(),
      rainStart: new displayFunc(),
      rainHowBad: new displayFunc(),
      rainInputNode: new displayFunc(),
      rainNotBad: new displayFunc(),
      rainRangeInput: new displayFunc(),
      rainReallyBad: new displayFunc(),
      rainGetOut: new displayFunc(),
      rainHungry: new displayFunc(),
      eatChoose: new displayFunc(),
    },
  }

  // Pizza Tags
	const pizza = {
    pizzaHeading: new displayFunc("#pizza_story"),
    visitPizza: new displayFunc("#visit_pizza"),
    pizzaFantastic: new displayFunc("#pizza_fantastic"),
    scream: new displayFunc("#scream"),
    karenWords1: new displayFunc("#karenWords1"),
    karenWords2: new displayFunc("#karenWords2"),
    karenWords3: new displayFunc("#karenWords3"),
    karenWords4: new displayFunc("#karenWords4"),
    karenWords5: new displayFunc("#karenWords5"),
    karenWords6: new displayFunc("#karenWords6"),
    mrFantastic: new displayFunc("#mrFantastic"),
    sorryGuys: new displayFunc("#sorry_guys"),
    leave: new displayFunc("#leave"),
    notFantastic: new displayFunc("#notFantastic"),
    duckNod: new displayFunc("#duck_nod"),
    sneaky: new displayFunc("#sneaky"),
    sneakyHow: new displayFunc("#sneaky_how"),
    startBand: new displayFunc("#start_band"),
    soundsAwesome: new displayFunc("#sounds_awesome"),
    musicPractice: new displayFunc("#music_practice"),
    finallyReady: new displayFunc("#finally_ready"),
    back4More: new displayFunc("#back_4_more"),
    songChoose: new displayFunc("#song_choose"),
    playButton: new displayFunc("#play_button"),
    pauseButton: new displayFunc("#pause_button"),
    ffwdButton: new displayFunc("#ffwd_button"),
    songPlaying: new displayFunc("#song_playing"),
    howGood: new displayFunc("#how_good"),
    songRatingSlide: new displayFunc("#song_rating_slide"),
    songReviewSliderInput: new displayFunc("input#song_review"),
    songRatingDisplay: new displayFunc("#song_rating_display"),
    rating: new displayFunc("#rating"),
    songPlayAgain: new displayFunc("#song_playAgain"),
    pizzaFinally: new displayFunc("#pizza_finally"),
    sneakInside: new displayFunc("#sneak_inside"),
    slipInTheBack: new displayFunc("#slip_in_the_back"),
    outback: new displayFunc("#outback"),
    pizzaWait: new displayFunc("#pizza_wait"),
    ninjaSneak: new displayFunc("#ninja_sneak"),
    YAY: new displayFunc("#YAY"),
    pizzaDance: new displayFunc("#pizza_dance"),
    pizzaEnd: new displayFunc("#pizza_end"),
    pizzaEndButtons: new displayFunc("#pizza_end_buttons"),
  }

  //ASCII TAGS
	const ascii = {
    water: new displayFunc("#waterBody"),
    duck: new displayFunc("#duck"),
    frog: new displayFunc("#frog"),
    dog: new displayFunc("#dog"),
    hog: new displayFunc("#hog"),
    eggnog: new displayFunc("#eggnog"),
    animalsBlock: new displayFunc(".ascii_animals_block")
  };

  //declares the object for easter egg features.
  const bonusLevel = {}

  //function to invert styles if easter egg is activated.
  const bonusEgg = function(){
    if (bonusLevel.enabled){
      const invert = "invert(100%)";
      page.border.style.background = "MidnightBlue";
      const selectorTexts = document.querySelectorAll(".bonus_egg");
      for (let i of selectorTexts)
        i.style.filter = invert;
    }
  }

  // Listens for Enter to be pressed before continuing.
  const listen4Enter = function(){
    return new Promise(resolve => {
      document.addEventListener("keyup", function enterInputListener(event){
        if (event.key === "Enter"){
          document.removeEventListener("keyup", enterInputListener);
          resolve();
        }
      });
    })
  }

  // guesses the local language from the browser.
  const getLanguage = () => {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    }
  }

  const ranNumG = function(max){
    return Math.floor(Math.random() * max);
  }

  const makeArray = function arrayFromMaxIndex(maxIndex, useKeysBool){
    if (useKeysBool){
      return [...Array(maxIndex).keys()].map(x => ++x);
    }
    else {
      return [...Array(maxIndex).keys()];
    }
  }

  const shuffle = function fisherYatesArrayShuffler(inputArr){
    let applyShuffler = () => {
      let len = inputArr.length;
      while (len){
        let ran = ranNumG(len--);
        [inputArr[ran], inputArr[len]] = [inputArr[len], inputArr[ran]];
      }
      return inputArr;
    }
    return applyShuffler(...inputArr);
  }

  const makeItRain = function(storminess) { // remember that the arg is a range 1-100.
    const hiddenRaindrops = 20;
    storminess = Math.floor(hiddenRaindrops*(storminess/100));
    const rainArray = shuffle(makeArray(storminess));
    const shuffledDrops = shuffle(makeArray(hiddenRaindrops, "Add 1"));

    let delayedRain = async () => {
      try {
        for (let rDropIteration = rainArray.length - 1; rDropIteration > -1; rDropIteration--){
          await sleep(1.77);
          let rainSelector = document.querySelector(`#rain_${shuffledDrops[rainArray[rDropIteration]]}`);
          rainSelector.style.display = "unset";
          rainSelector.style.opacity = 1;
        }
      }
      catch (e){
        console.log(e);
      }
    }
    delayedRain();
  }

  //color input sanitizer
  const checkColorInput = async function checkInputForColor(inputSelector, asciiObj, transFunc){
    //inputSelector = The selector ID for the text input box being used to choose a color.
    //asciiObj = the ascii picture that the color is going to be applied to.
    //transFunc = the function which fires after the check is complete.

    //moves helper text to after the input box. If the input box is in an inline class.
    if (inputSelector.parentNode.classList.toString() === "inline"){
      inputSelector.parentNode.after(page.helper.tag.current);
      inputSelector.parentNode.after(beginningPage.hm.tag.current);
      inputSelector.parentNode.after(beginningPage.no.tag.current);
      inputSelector.parentNode.after(beginningPage.yes.tag.current);
    }
    else{
      inputSelector.after(page.helper.tag.current);
    }
    await listen4Enter(); // wait for enter to be hit after inputing the color
    page.helper.hide();

    //blocks the input while it is being checked.
    inputSelector.disabled = true;
    await beginningPage.hm.show(); 
    await beginningPage.hm.hide();

    // event listener verifies the input. If the transition on the input box occurred after colorizeAscii ran, then transitionend will detect it.
    inputSelector.addEventListener("transitionend", transFunc, {once: true});

    //Colors the Duck based on the input.
    //saves details to object and local storage.
    const colorizeAscii = (async () => {
      inputSelector.style.backgroundColor = inputSelector.value;
      asciiObj.color = inputSelector.value;
      asciiObj.tag.current.style.color = asciiObj.color;
      for (let i of asciiObj.typeSpans)
        i.current.style.color = asciiObj.color;

      //a little easter egg in case anyone puts in the same color that is used for the background later on.
      if (inputSelector.value === "paleTurquoise")
        bonusLevel.enabled = true;
    })();

    const inputRegex = /#/gu;
    // checks if the background color has a value.
    if (!inputSelector.style.backgroundColor){
      await page.no.show();
      await page.no.hide();
      inputSelector.disabled = false;
      checkColorInput(inputSelector, asciiObj);
    }
    //checks to ensure that no hex colors were used and that the duck is not colored white.
    switch(true){
      case inputSelector.style.backgroundColor === "white":
      case Boolean(inputSelector.value.match(inputRegex)):{
        await page.no.show();
        await page.no.hide();
        inputSelector.disabled = false;
        checkColorInput(inputSelector, asciiObj);
        break;
      }
    }
  }

  //STORY FUNCTIONS
  //BEGINNING 
	async function startButtonListener(){

		beginningPage.startButton.hide();
		await beginningPage.oneTime.show(1.5);
		beginningPage.oneTime.tag.current.after(page.helper.tag.current);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();
		await beginningPage.oneTime.hide();
		await beginningPage.phaseOne.duckWhatColor.show();
		beginningPage.phaseOne.duckInline.show();
		beginningPage.phaseOne.duckInlineInput.tag.current.focus();

		//actively resizes the box based on how many characters are in it.
		//css declares monospace font so no sizing issues.
		beginningPage.phaseOne.duckInlineInput.tag.current.addEventListener("input", function inputResizeListener(){
			beginningPage.phaseOne.duckInlineInput.tag.current.style.width = beginningPage.phaseOne.duckInlineInput.tag.current.value.length + "ch";
			page.helper.show();
		});

		ascii.duck.typeSpans = page.duckType;
		await checkColorInput(beginningPage.phaseOne.duckInlineInput.tag.current, ascii.duck, storyStartListener);
	}

		
	async function storyStartListener(){
		beginningPage.phaseOne.duckWhatColor.tag.current.blur();
		beginningPage.yes.tag.current.innerHTML = `<p>Ah, yes! That's it. She was a very normal looking ${ascii.duck.color} <span class="inline" style="color: ${ascii.duck.color};">duck.</span></p>`;

		await beginningPage.phaseOne.duckInline.hide(.5);
		await beginningPage.phaseOne.duckWhatColor.hide(.5);

		await beginningPage.yes.show(1.5);
		beginningPage.yes.tag.current.after(page.helper.tag.current);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();
		await beginningPage.yes.hide();

		beginningPage.phaseTwo.body.show();
		await beginningPage.phaseTwo.where.show(2);
		beginningPage.phaseTwo.where.tag.current.after(page.helper.tag.current);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();
		await beginningPage.phaseTwo.where.hide();
		await beginningPage.phaseTwo.letsSee.show();

		//styles the background and activates the flex box centering.
		page.container.style.flex = 1;
		page.border.style.background = page.lightGreenBG; // light green

		//easter egg styles.
		bonusEgg();

		//eyes animation
		await beginningPage.phaseTwo.eyes.show(3);
		beginningPage.phaseTwo.eyes.tag.current.style.transform = "rotate(0.5turn)";
		beginningPage.phaseTwo.eyes.tag.current.style.textShadow = "-1px -1px 3px black";
		await sleep(3);

		beginningPage.phaseTwo.eyes.hide();
		await beginningPage.phaseTwo.letsSee.hide();

		await beginningPage.phaseTwo.ah.show(.5);
		await beginningPage.phaseTwo.thereSheIs.show();
		await ascii.duck.show();
		page.helper.show();

		beginningPage.phaseTwo.body.tag.current.after(page.helper.tag.current);
		beginningPage.phaseTwo.thereSheIs.tag.current.after(duck);
		await listen4Enter();

		page.helper.hide();
		await beginningPage.phaseTwo.ah.hide();
		await beginningPage.phaseTwo.thereSheIs.hide();
		await ascii.duck.hide();
		ascii.water.hide();

		beginningPage.phaseTwo.splashing.tag.current.after(ascii.animalsBlock.tag.current);
		ascii.animalsBlock.tag.current.append(ascii.water.tag.current, duck);

		beginningPage.phaseTwo.splashing.show();
		await ascii.animalsBlock.show({sec: 2, disp: "flex"});
		ascii.water.show({sec: 0});
		ascii.duck.show({sec:0, rel: false});

		ascii.water.tag.current.style.flex = 1;
		ascii.animalsBlock.tag.current.style.Top = "55px";
		//duck.style.left = "50%";
		duck.style.top = "-60px";


		beginningPage.phaseThree.body.show({sec: 0});
		beginningPage.phaseThree.chooseAFriend.show();

		beginningPage.phaseThree.chooseAFriend.tag.current.after(page.helper.tag.current);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();
		// Checks to ensure a friend was selected and assigns the value to the duck object.
		await (async function obtainAFriend(){
			let friendObtained = false;

			while (!friendObtained === true){
				// A switch statement here is probably not best practice since IF is faster. But I need the practice so
				switch(true){
					case (frog.checked):{
						ascii.duck.friend = ascii.frog;
						ascii.duck.friend.type = "frog";
						friendObtained = true;
						break;
					}
					case(dog.checked):{
						ascii.duck.friend = ascii.dog;
						ascii.duck.friend.type= "dog";
						friendObtained = true;
						break;
					}
					case(hog.checked):{
						ascii.duck.friend = ascii.hog;
						ascii.duck.friend.type = "hog";
						friendObtained = true;
						break;
					}
					case(eggnog.checked):{
						ascii.duck.friend = ascii.eggnog;
						ascii.duck.friend.type = "eggnog";
						friendObtained = true;
						break;
					}
					default:{
						await page.helper.hide();
						await beginningPage.phaseThree.tryAgain.show({sec: 1.5});
						await beginningPage.phaseThree.tryAgain.hide();
						await page.helper.show();
						await listen4Enter();
						break;
					}
			}

			}
		})();
		await beginningPage.phaseTwo.splashing.hide();
		await beginningPage.phaseThree.chooseAFriend.hide();

		//assigns the friend animal to each span element with ".friend_type"
		for (let i of page.friendType)
			i.innerHTML = ascii.duck.friend.type;


		await (async () => {
			let isFriendUndeclared = true;
			while (isFriendUndeclared){

				// fixes a styling quirk with the easter Egg
				document.querySelector("p#friend_declare > span.friend_type").className = "friend_type bonus_egg";

				await beginningPage.phaseThree.friendDeclare.show();
				beginningPage.phaseThree.friendNameInput.tag.current.focus();
				beginningPage.phaseThree.friendDeclare.tag.current.after(page.helper.tag.current);

				//choose a name for duck's friend.
				beginningPage.phaseThree.friendNameInput.tag.current.addEventListener("input", function inputResizeListener(event){
					beginningPage.phaseThree.friendNameInput.tag.current.style.width = beginningPage.phaseThree.friendNameInput.tag.current.value.length + "ch";
					page.helper.show();
				});

				await listen4Enter();
				page.helper.hide();
				await beginningPage.phaseThree.friendDeclare.hide();
				beginningPage.phaseThree.friendNameInput.tag.current.disabled = true;

				// If the inputed name has a space, is blank, or is a number have them try again.
				const tryAgain = async (friend_nameError, friend_nameError_content) => {
					friend_nameError.append(friend_nameError_content);
					beginningPage.phaseThree.friendDeclare.tag.current.after(friend_nameError);
					friend_nameError.style.display = "block";
					await sleep(4);
					friend_nameError.remove();
					beginningPage.phaseThree.friendNameInput.tag.current.disabled = false;
				}

				if (beginningPage.phaseThree.friendNameInput.tag.current.value.indexOf(" ") > -1){
					const friend_nameError = document.createElement("p");
					const friend_nameError_content = document.createTextNode("Sorry, names can't contain spaces. Try again.");
					tryAgain(friend_nameError, friend_nameError_content);
					continue;
				}
				else if (!(beginningPage.phaseThree.friendNameInput.tag.current.value) || beginningPage.phaseThree.friendNameInput.tag.current.value.match(/[0-9]/)){
					const friend_nameError = document.createElement("p");
					const friend_nameError_content = document.createTextNode("That name won't work! Try again.");
					tryAgain(friend_nameError, friend_nameError_content);
					continue;
				}
				else if (!beginningPage.phaseThree.friendNameInput.tag.current.value.match(/^[A-Z]/m)){
					const friend_nameError = document.createElement("p");
					const friend_nameError_content = document.createTextNode("Don't forget to capitalize names!")
					tryAgain(friend_nameError, friend_nameError_content);
					continue;
				}


				document.querySelector("legend>span.friend_name").innerText = beginningPage.phaseThree.friendNameInput.tag.current.value;
				beginningPage.phaseThree.friendNameCheck.show();
				beginningPage.phaseThree.friendNameCheck.tag.current.after(page.helper.tag.current);
				page.helper.show();
				await listen4Enter();
				page.helper.hide();

				if (beginningPage.phaseThree.friendNameCheckYes.tag.current.checked){
					ascii.duck.friend.name = beginningPage.phaseThree.friendNameInput.tag.current.value;
					await beginningPage.phaseThree.friendNameCheck.hide();
					for(let i of page.friendName){
						i.innerText = ascii.duck.friend.name;
						i.style.color = ascii.duck.friend.color;
					}
					isFriendUndeclared = false;
					beginningPage.phaseThree.friendNameInput.tag.current.blur();
				}

				else if(beginningPage.phaseThree.friendNameCheckNo.tag.current.checked){
					await beginningPage.phaseThree.friendNameCheck.hide();
					beginningPage.phaseThree.friendNameInput.tag.current.style.width = "11ch";
					beginningPage.phaseThree.friendNameInput.tag.current.value = "";
					beginningPage.phaseThree.friendNameInput.tag.current.disabled = false;
				}
			}
		})();


		await beginningPage.phaseThree.friendColorQuestion.show();
		beginningPage.phaseThree.friendColorInput.show();
		beginningPage.phaseThree.friendColor.tag.current.focus();
		beginningPage.phaseThree.friendColor.tag.current.addEventListener("input", function inputResizeListener(event){
			beginningPage.phaseThree.friendColor.tag.current.style.width = beginningPage.phaseThree.friendColor.tag.current.value.length + "ch";
			page.helper.show();
		});
		ascii.duck.friend.typeSpans = page.friendType;
		await checkColorInput(beginningPage.phaseThree.friendColor.tag.current, ascii.duck.friend, async () => {

			// Sets the Easter Egg after the color has been declared to avoid black on dark text.
			document.querySelector("p#friend_colorQuestion > span.friend_name").className = "friend_name bonus_egg";
			document.querySelector("span#friend_colorQuestion_input > span.friend_type").className = "friend_type bonus_egg";

			//Sets the value of the success text so that it can be colored, if necessary by the Easter Egg function.
			beginningPage.yes.tag.current.innerHTML = `<p>Oh, duh! How could I forget! They were definitely a ${ascii.duck.friend.color} <span class="inline friend_type bonus_egg" style="color: ${ascii.duck.friend.color};">${ascii.duck.friend.type}.</span></p>`;

			// checks to see if easterEgg applies
			bonusEgg();

			//colors the friends name according to the users selection.
			for (let i of page.friendName)
				i.style.color = ascii.duck.friend.color;

			beginningPage.phaseThree.friendColor.tag.current.blur();
			await beginningPage.phaseThree.friendColorInput.hide();
			beginningPage.yes.hide();
			beginningPage.phaseThree.friendColorInput.tag.current.after(beginningPage.yes.tag.current);
			await beginningPage.phaseThree.friendColorQuestion.hide();
			ascii.animalsBlock.tag.current.append(ascii.duck.friend.tag.current);

			ascii.duck.friend.show({rel: false, disp: "inline-block"});
			ascii.duck.show({rel: false, disp: "inline-block"});

			let placementFriend = {};
			let placementDuck = {};
			if(window.screen.width < 700){
				placementFriend = {
					scale:.80,
					left:-60,
				}
				placementDuck = {
					scale:.80,
					top:10,
				}
			}
			else {
				placementDuck = {
					top:-50,
					left:80,
				};
				if(ascii.duck.friend.type === "hog") {
					placementFriend = {
						left:-30,
						transform:"scale(-1,1)",
					}
				}
			}

			gsap.timeline()
				.to("#frog, #dog, #hog, #eggnog", {duration:.5, ...placementFriend})
				.to("#duck", {duration:.5, ...placementDuck},"<");

			ascii.duck.friend.tag.current.style.top = "-50px";
			ascii.animalsBlock.tag.current.style.marginTop = "50px";

			await beginningPage.yes.show({sec: 1.5});

			beginningPage.yes.tag.current.after(page.helper.tag.current)
			page.helper.show();
			await listen4Enter();
			page.helper.hide();

			await beginningPage.yes.hide();

			await beginningPage.phaseThree.friendGoofy.show();
			await beginningPage.phaseThree.friendLaugh.show();
			await beginningPage.phaseThree.duckLaugh.show();

			beginningPage.phaseThree.duckLaugh.tag.current.after(page.helper.tag.current);
			page.helper.show();
			await listen4Enter();
			await page.helper.hide();

			await beginningPage.phaseThree.friendGoofy.hide();
			await beginningPage.phaseThree.friendLaugh.hide();
			await beginningPage.phaseThree.duckLaugh.hide();

			await beginningPage.phaseThree.rainStart.show();
			await beginningPage.phaseThree.rainHowBad.show();
			beginningPage.phaseThree.rainInputNode.show();

			beginningPage.phaseThree.rainInputNode.tag.current.after(page.helper.tag.current);
			page.helper.show();
			await listen4Enter();
			page.helper.hide();

			makeItRain(beginningPage.phaseThree.rainRangeInput.tag.current.value);

			// simulate a lightning flash
			page.border.style.background = `#666`;
			await sleep(3);
			page.border.style.transition = "unset";
			page.border.style.background = "paleGoldenRod";
			await sleep(.2)
			page.border.style.background = `#666`;
			await sleep(.2)
			page.border.style.background = "paleGoldenRod";
			await sleep(.2)
			page.border.style.background = `#666`;
			await sleep(.2)
			page.border.style.transition = "background-color 2s"

			await beginningPage.phaseThree.rainStart.hide();
			await beginningPage.phaseThree.rainHowBad.hide();
			await beginningPage.phaseThree.rainInputNode.hide();

			// DISABLE ALL RADIOS EXCEPT WHAT IS AVAILABLE.
			// ENABLE OTHER BRANCHES AS THEY BECOME COMPLEET.
			puddingSelect.disabled = true;
			grapesSelect.disabled = true;

			await beginningPage.phaseThree.rainGetOut.show();

			beginningPage.phaseThree.rainGetOut.tag.current.after(page.helper.tag.current);
			page.helper.show();
			await listen4Enter();
			page.helper.hide();

			await beginningPage.phaseThree.rainGetOut.hide();

			await beginningPage.phaseThree.rainHungry.show();
			await beginningPage.phaseThree.eatChoose.show();

			beginningPage.phaseThree.eatChoose.tag.current.after(page.helper.tag.current);

			// Text to inform of more to come.
			let node = document.createElement("p");
			let content = document.createTextNode("Pudding and Grape Stories To come! Check back later!");
			node.append(content);
			page.helper.tag.current.after(node);
			node.style.display = "block";
			node.style.scale = ".5";
			node.style.textAlign = "center";
			node.style.marginTop = "50px";

			page.helper.show();
			await listen4Enter();
			page.helper.hide();


			await (async () => {

				while (true){
					if (pizzaSelect.checked){
						setStory("pizza");
						page.helper.show();
						await listen4Enter();
						page.helper.hide();
					}
					else if (puddingSelect.checked){
						setStory("pudding");
						page.helper.show();
						await listen4Enter();
						page.helper.hide();
					}
					else if (grapesSelect.checked){
						setStory("grapes");
						page.helper.show();
						await listen4Enter();
						page.helper.hide();
					}
					else{
						const p = document.createElement("p");
						p.append(document.createTextNode("You must make a selection to continue."));
						beginningPage.phaseThree.eatChoose.tag.current.after(p);
						p.style.display = "block";
						page.helper.show();
						await listen4Enter();
						page.helper.hide();
						p.remove();
					}
				}
			})();
		});

    //PIZZA STORY
    (async()=>{

      //Functions
      page.border.style.background = page.lightGreenBG;
      page.container.style.flex = 1;

      //TODO
      //bonusEgg(); 

  //NO LONGER NECESSARY.
  //    for (let i of page.current.duckType)
  //      i.style.color = ascii.duck.color;
  //    for (let i of page.current.friendName){
  //      i.innerText = ascii.duck.friend.name;
  //      i.style.color = ascii.duck.friend.color;
  //    }
  //    for (let i of page.current.friendType){
  //      i.innerText = ascii.duck.friend.type;
  //      i.style.color = ascii.duck.friend.color;
  //    }

      await pizza.pizzaHeading.show({sec: 5}); //testing only
      await pizza.visitPizza.show();
      page.helper.show();
      await listen4Enter();
      page.helper.hide();
      //await pizza.pizzaHeading.hide(); // Testers saying having something at the top helps UI
      await pizza.visitPizza.hide();

      await pizza.scream.show()
      await pizza.karenWords1.show({sec: 2.5}); //testing only
      await pizza.karenWords2.show({sec: .5}); //actual
      await pizza.karenWords3.show({sec: .5}); //actual
      await pizza.karenWords4.show();
      const friendCaps = document.createTextNode(ascii.duck.friend.type.toUpperCase());
      const friendTypeCaps = document.querySelector("#friend_typeCaps");
      friendTypeCaps.append(friendCaps);
      friendTypeCaps.style.color = ascii.duck.friend.color;

      await pizza.karenWords5.show({sec: 2}); //testing only
      await pizza.karenWords6.show();

      pizza.karenWords6.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();
      await pizza.scream.hide();
      await pizza.karenWords1.hide();
      await pizza.karenWords2.hide();
      await pizza.karenWords3.hide();
      await pizza.karenWords4.hide();
      await pizza.karenWords5.hide();
      await pizza.karenWords6.hide();

      await pizza.mrFantastic.show();
      await pizza.sorryGuys.show();
      await pizza.leave.show();

      pizza.leave.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();

      await pizza.mrFantastic.hide();
      await pizza.sorryGuys.hide();
      await pizza.leave.hide();

      await pizza.notFantastic.show();
      await pizza.duckNod.show();
      await pizza.sneaky.show();

      pizza.sneaky.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();

      await pizza.notFantastic.hide();
      await pizza.duckNod.hide();
      await pizza.sneaky.hide();

      await pizza.sneakyHow.show();
      await pizza.startBand.show();
      await pizza.soundsAwesome.show();

      pizza.soundsAwesome.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();

      await pizza.sneakyHow.hide();
      await pizza.startBand.hide();
      await pizza.soundsAwesome.hide();

      await pizza.musicPractice.show();
      await pizza.finallyReady.show();
      await pizza.back4More.show();

      pizza.back4More.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();

      await pizza.musicPractice.hide();
      await pizza.finallyReady.hide();
      await pizza.back4More.hide();

      await pizza.songChoose.show();
      pizza.songChoose.tag.current.after(page.helper.tag.current);


      let money = 0;
      // iterate over the song game as long as the duck doesn't have 20 money.
      do{
        if (money > 0){

          let songRatingDisplay = document.getElementById("song_rating_display"),
              songMoneyEarned = document.getElementById("song_moneyEarned"),
              songMoneyNeeded = document.getElementById("song_moneyNeeded");
          if (pizza.songReviewSliderInput.tag.current.value >= 1 & pizza.songReviewSliderInput.tag.current.value < 3){
            songRatingDisplay.innerText = "bad";
          }
          else if (pizza.songReviewSliderInput.tag.current.value >= 3 & pizza.songReviewSliderInput.tag.current.value < 5){
            songRatingDisplay.innerText = "lame";
          }
          else if (pizza.songReviewSliderInput.tag.current.value >= 5 & pizza.songReviewSliderInput.tag.current.value < 7){
            songRatingDisplay.innerText = "decent";
          }
          else if (pizza.songReviewSliderInput.tag.current.value >= 7 & pizza.songReviewSliderInput.tag.current.value < 9){
            songRatingDisplay.innerText = "great";
          }
          else if (pizza.songReviewSliderInput.tag.current.value >9){
            songRatingDisplay.innerText = "FANTASTIC";
          }

          songMoneyEarned.innerText = new Intl.NumberFormat(getLanguage(), {style: "currency", currency: "USD"}).format(money);
          songMoneyNeeded.innerText = new Intl.NumberFormat(getLanguage(), {style: "currency", currency: "USD"}).format(20 - money);

          await pizza.rating.show({sec: 3});
          await pizza.songPlayAgain.show();
        }

        let songDebut = null; 
        let song = new Audio();
        await (songDebut = async () => {

          pizza.songChoose.tag.current.disabled = false;
          pizza.songPlayAgain.tag.current.after(page.helper.tag.current);


        //TODO
        //Need to add a fisher-yates shuffler to this so that their are no repeats of songs.

        const songOptions1 = [
          "duck_sounds/1/funny-story.mp3",
          "duck_sounds/1/journey-to-the-sun.mp3",
          "duck_sounds/1/positive-way.mp3",
          "duck_sounds/1/spring-upbeat.mp3",
          "duck_sounds/1/that-good-feeling.mp3",
          "duck_sounds/1/upbeat-funky-retro.mp3",
          "duck_sounds/1/upbeat-summer-pop.mp3"
        ]

        const songOptions2 = [
          "duck_sounds/2/beyond.mp3",
          "duck_sounds/2/electro-jazz.mp3",
          "duck_sounds/2/flashes.mp3",
          "duck_sounds/2/future-bass-hot-night.mp3",
          "duck_sounds/2/space.mp3",
          "duck_sounds/2/synthwave-80s.mp3",
          "duck_sounds/2/synthwave-outrun.mp3"
        ]

        const songOptions3 = [
          "duck_sounds/3/calm-and-light-breakbeat.mp3",
          "duck_sounds/3/disco-groove.mp3",
          "duck_sounds/3/first.mp3",
          "duck_sounds/3/go_guy.mp3",
          "duck_sounds/3/rock-dedication.mp3",
          "duck_sounds/3/tango-hip-hop.mp3",
          "duck_sounds/3/tropical-summer.mp3"
        ]

        // Takes an input, one of the song arrays, and randomly selects an index to be the src value for the song.
        let songPlayer = async (songOptions) => {

          let node = document.createElement("p"),
            content = document.createTextNode("Loading."),
            dot = document.createTextNode("."),
            unableToPlay = true,
            playSelect = songOptions[ranNumG(6)];

          song.src = playSelect;

          // When the play button is clicked, waits till the song is playable then plays it. Until then a loading status is displayed.
          pizza.playButton.tag.current.addEventListener("click", async e => {
            song.load();

            // removes focus from radios.
            song1Select.blur();
            song2Select.blur();
            song3Select.blur();

          song.addEventListener("canplaythrough", e => {
            song.play();

            pizza.songChoose.tag.current.disabled = true;
            unableToPlay = false;
            node.remove();

            pizza.songPlaying.show();

            pizza.pauseButton.show({sec: 0, disp: "inline"});
            pizza.ffwdButton.show({sec: 0, disp: "inline"});
            pizza.playButton.hide({sec: 0});

          }, {once: true});


          node.append(content);
          pizza.songChoose.tag.current.after(node);
          node.style.display = "block";

          while (unableToPlay){
            node.append(dot);
            dot = document.createTextNode(`.`);
            await sleep(1);
          }
          }, {once:true});


          // Waits for the song to start playing before moving on.
          await (() => new Promise(resolve => song.addEventListener("playing", () => resolve(), {once: true})))();


        }

        // Waits for the play button to be clicked. And then queries the radio buttons to play a song.
        await (async () => {
          pizza.songChoose.tag.current.addEventListener("change", async () => {

            // Hides the previous iterations results and prompt.
            pizza.rating.hide();
            pizza.songPlayAgain.hide();

            // Display Play Button.
            player_buttons.style.display = "block";
            pizza.playButton.show({sec: 0});
            pizza.ffwdButton.hide({sec: 0});
            pizza.pauseButton.hide({sec: 0});

            if (song1Select.checked){
              songPlayer(songOptions1);
              return;
            }
            else if (song2Select.checked){
              songPlayer(songOptions2);
              return;
            }
            else if (song3Select.checked){
              songPlayer(songOptions3);
              return;
            }
            else{ // This will never be used. But is staying here jic. Feel free to delete.
              let node = document.createElement("p");
              let content = document.createTextNode("You have to pick something for them to play first!");
              node.append(content);
              node.style.display = "block";
              pizza.songChoose.tag.current.after(node);
              await sleep(3);
              node.remove();
              await songDebut();
            }
          }, {once: true})
        })()

      })();

        // Event Handlers for the player buttons.
        const pauseButtonListener = () => {
          song.pause();
          pizza.pauseButton.hide({sec: 0});
          pizza.playButton.show({sec: 0, disp: "inline"});
          }
        pizza.pauseButton.tag.current.addEventListener("click", pauseButtonListener);


        const playButtonListener = () => {
          song.play();
          song.playbackRate = 1;
          pizza.playButton.hide({sec: 0});
          pizza.pauseButton.show({sec: 0, disp: "inline"});
            }
        pizza.playButton.tag.current.addEventListener("click", playButtonListener);


        const ffwdButtonListener = () => {
          if (song.playbackRate === 4){
            song.playbackRate = 1;
          }
          else{
            song.playbackRate = 4;
            song.preservePitch = false;
          }
        }
        pizza.ffwdButton.tag.current.addEventListener("click", ffwdButtonListener);

        // uncheck all of the radios
        song1Select.checked = false;
        song2Select.checked = false;
        song3Select.checked = false;

        // Waits for the song to end before moving on.
        await new Promise((resolve) => {
          song.addEventListener("ended", async () => {

            //remove button listeners
            pizza.pauseButton.tag.current.removeEventListener("click", pauseButtonListener);
            pizza.playButton.tag.current.removeEventListener("click", playButtonListener);
            pizza.ffwdButton.tag.current.removeEventListener("click", ffwdButtonListener);

            pizza.songPlaying.hide(); 
            player_buttons.style.display = "none";

            resolve();
          }, {once: true});
        });
        await pizza.howGood.show();
        pizza.songRatingSlide.show();

        pizza.songRatingSlide.tag.current.after(page.helper.tag.current);
        page.helper.show();
        await listen4Enter();
        page.helper.hide();
        
        pizza.howGood.hide();
        pizza.songRatingSlide.hide();
        pizza.songRatingSlide.tag.current.blur();

        // Sets the money equal to the review
        money += parseFloat(pizza.songReviewSliderInput.tag.current.value);

        let node = document.createElement("p"),
            content = document.createTextNode(`+${pizza.songReviewSliderInput.tag.current.value}`);
        node.append(content);
        node.style.display = "block";
        pizza.songChoose.tag.current.after(node);
        await sleep(1);
        node.remove();

        // reset the slider
        pizza.songReviewSliderInput.tag.current.value = 5;

      } while (money < 20);

      await pizza.songChoose.hide();
      await pizza.pizzaFinally.show();
      await pizza.sneakInside.show();

      pizza.sneakInside.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();

      await pizza.pizzaFinally.hide();
      await pizza.sneakInside.hide();

      await pizza.slipInTheBack.show();
      await pizza.outback.show();
      await pizza.pizzaWait.show()

      for (let i=0; i<8; i++){
        let dot = document.createTextNode(`.`);
        pizza.pizzaWait.tag.current.append(dot);
        await sleep(1);
      }

      pizza.ninjaSneak.show();

      pizza.ninjaSneak.tag.current.after(page.helper.tag.current);
      page.helper.show();
      await listen4Enter();
      page.helper.hide();

      await pizza.ninjaSneak.hide();
      await pizza.slipInTheBack.hide();
      await pizza.outback.hide();
      await pizza.pizzaWait.hide();

      await pizza.YAY.show();
      await pizza.pizzaDance.show();
      await pizza.pizzaEnd.show({sec: 3});

      await pizza.pizzaEndButtons.show();

      pizza_playAgain.addEventListener("click", () => {
        window.open("page1.html", "_self");
      }, {once: true});

      print_this.addEventListener("click", () => {
        print();
      });

    })()
	}
		

  //JSX
  return(
    <>
      <div className="sky">
        <div className="air"></div>
        <div className="raindrop" id="rain_1"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_2"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_3"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_4"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_5"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_6"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_7"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_8"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_9"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_10"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_11"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_12"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_13"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_14"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_15"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_16"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_17"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_18"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_19"></div>
        <div className="air"></div>
        <div className="raindrop" id="rain_20"></div>
        <div className="air"></div>
      </div>
			<div className="flex-container">
				<div ref={page.container} className="container"></div>
				       <button ref={beginningPage.startButton.tag} onClick={startButtonListener}>click to start</button>
				       <div className="phasedDisplay flex-container">
                 <p id="oneTime" ref={beginningPage.oneTime.tag}>Once upon a time there was a <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span>.</p>
                 <p ref={beginningPage.phaseOne.duckWhatColor.tag} id="whatColor">Now, what was the color of that <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span> again?</p>
				         <span ref={beginningPage.phaseOne.duckInline.tag} className="inline">
				           <p>I think she was a </p>
				           <input ref={beginningPage.phaseOne.duckInlineInput.tag} id="duck_color" type="text" name="duck_color" placeholder="Type a color" maxLength="24" size="12" />
				           <p> <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]}  className="duck_type bonus_egg">duck</span>.</p>
				         </span>
				         <p ref={page.helper.tag} id="helper">Hit &quot;Enter&quot; on your keyboard. 
				           <span id="mobile_helper_screen"><input id="mobile_helper_input" type="text" name="mobile_helper" />Tap here to show keyboard</span>
				         </p>
				         <p ref={beginningPage.hm.tag} id="hm">Hmmmmmm.....</p>
				         <p ref={beginningPage.no.tag} id="no">No, that wasn&apos;t it.</p>
				         <p ref={beginningPage.yes.tag} id="yes"></p>
				         <div ref={beginningPage.phaseTwo.body.tag}className="phaseTwo">
				           <p ref={beginningPage.phaseTwo.where.tag} id="where">Now, where is that <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span>? She was just around here somewhere. </p>
				           <p ref={beginningPage.phaseTwo.letsSee.tag} id="letsSee">Let&apos;s see.......</p>
									 <span role="img" aria-label="eyes" ref={beginningPage.phaseTwo.eyes.tag} id="eyes" className="bonus_egg">👀</span>
				           <h2 ref={beginningPage.phaseTwo.ah.tag} id="ah">ah! </h2>
				             <p ref={beginningPage.phaseTwo.thereSheIs.tag} id="thereSheIs">there she is.</p>
				               <pre className="ascii_animal bonus_egg" ref={ascii.duck.tag} id="duck">{`
         __
       =(• )___
        (  _> /  
				                 `}
				               </pre>
				             <p ref={beginningPage.phaseTwo.splashing.tag} id="splashing">One day <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span> was splashing in the pond with her best friend.</p>
				         </div>
				         <div className="ascii_animals_block">
				         </div>
				         <div ref={beginningPage.phaseThree.body.tag} className="phaseThree">
				             <fieldset ref={beginningPage.phaseThree.chooseAFriend.tag} id="chooseAFriend">
				               <legend>Please Choose one friend for <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span>.</legend>
				               <input ref={beginningPage.phaseThree.frogSelect.tag} id="frogSelect" type="radio" name="friend" defaultValue="frog" />
				               <label htmlFor="frogSelect">Frog</label>
				               <br />
				               <input ref={beginningPage.phaseThree.dogSelect.tag} id="dogSelect" type="radio" name="friend" defaultValue="dog" />
				               <label htmlFor="dogSelect">Dog</label>
				               <br />
				               <input ref={beginningPage.phaseThree.hogSelect.tag} id="hogSelect" type="radio" name="friend" defaultValue="hog" />
				               <label htmlFor="hogSelect">Hog</label>
				               <br />
				               <input ref={beginningPage.phaseThree.eggnogSelect.tag} id="eggnogSelect" type="radio" name="friend" defaultValue="eggnog" />
				               <label htmlFor="eggnogSelect">Eggnog</label>
				               <br />
				             </fieldset>
				             <p ref={beginningPage.phaseThree.tryAgain.tag} id="tryAgain">You have to pick a friend for <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span> first!</p>
				             <p ref={beginningPage.phaseThree.friendDeclare.tag} id="friend_declare"><span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span>&apos;s best friend was a <span className="friend_type"></span> named
				                <span className="inline">
				               <input ref={beginningPage.phaseThree.friendNameInput.tag} id="friend_name_input" type="text" name="friend_name" placeholder="Type a name" maxLength="23" size="11" />.
				                </span>
				             </p>
				             <fieldset ref={beginningPage.phaseThree.friendNameCheck.tag} className="input_name_check">
				               <legend>Does <span className="friend_name"></span> sound right?</legend>
				               <input ref={beginningPage.phaseThree.friendNameCheckYes.tag} id="name_check_yes" type="radio" name="name_check" defaultValue="yes" />
				               <label htmlFor="name_check">Yes</label>
				               <br />
				               <input ref={beginningPage.phaseThree.friendNameCheckNo.tag} id="name_check_no" type="radio" name="name_check" defaultValue="no" defaultChecked />
				               <label htmlFor="name_check">No</label>
				               <br />
				             </fieldset>
				               <p ref={beginningPage.phaseThree.friendColorQuestion.tag} id="friend_colorQuestion">I always forget what color <span className="friend_name"></span> is. Do you remember?</p>
				               <span ref={beginningPage.phaseThree.friendColorInput.tag} id="friend_colorQuestion_input" className="inline" >
				                 <p>Maybe they were a </p>
				                 <input ref={beginningPage.phaseThree.friendColor.tag} id="friend_color" type="text" name="friend_color" placeholder="Type a color" maxLength="24" size="12" />
				                <span className="friend_type"></span>.
				               </span>
				               <p ref={beginningPage.phaseThree.friendGoofy.tag} id="friend_goofy">&quot;You sure are one goofy <span className="friend_type bonus_egg"></span>, <span className="friend_name bonus_egg"></span>.&quot; <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span> said as they splashed together.</p>
				               <p ref={beginningPage.phaseThree.friendLaugh.tag} id="friend_laugh"><span className="friend_name bonus_egg"></span> laughed.</p>
				               <p ref={beginningPage.phaseThree.duckLaugh.tag} id="duck_laugh"><span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">Duck</span> laughed.</p>
				               <p ref={beginningPage.phaseThree.rainStart.tag} id="rain_start">After a little while it started to <span style={{color:"blue"}}>rain</span>.</p>
				               <p ref={beginningPage.phaseThree.rainHowBad.tag} id="rain_howBad">How bad was the storm?</p>
				               <div ref={beginningPage.phaseThree.rainInputNode.tag} id="rain_input_node">
				                 <span ref={beginningPage.phaseThree.rainNotBad.tag} id="notBad">Not too bad. </span><input ref={beginningPage.phaseThree.rainRangeInput.tag} id="rain_range" type="range" name="rain_range" min="0" max="100" step="5" defaultValue="25" /><span ref={beginningPage.phaseThree.rainReallyBad.tag} id="reallyBad" > Really Bad.</span>
				               </div>
				               <p ref={beginningPage.phaseThree.rainGetOut.tag} id="rain_getOut">&quot;We should get out of the water during a rainstorm.&quot; said <span className="friend_name bonus_egg"></span></p>
				               <p ref={beginningPage.phaseThree.rainHungry.tag} id="rain_hungry">&quot;Yeah. I&apos;m hungry anyways. What should we eat today?&quot; said <span ref={page.duckType[(()=>{page.duckType.push(useRef()); return (page.duckType.length - 1)})()]} className="duck_type bonus_egg">duck</span>.</p>
				               <fieldset ref={beginningPage.phaseThree.eatChoose.tag} id="eat_choose">
				               <legend id="eat_what">What should they eat?</legend>  
				                 <input id="pizzaSelect" type="radio" name="food" defaultValue="pizza" />
				                 <label htmlFor="pizzaSelect">Pizza</label><br />
				                 <input id="puddingSelect" type="radio" name="food" defaultValue="pudding" />
				                 <label htmlFor="puddingSelect">Pudding</label><br />
				                 <input id="grapesSelect" type="radio" name="food" defaultValue="grapes" />
				                 <label htmlFor="grapesSelect">Grapes</label><br />
				               </fieldset>
				               <p id="lets_eat">&quot;Let&apos;s eat <span id="foodSelect"></span>&quot;, said <span className="friend_name bonus_egg"></span></p>
				               <h1 className="pudding_story">Time to slurp the pud</h1>
				               <h1 className="grapes_story">The grape story (for brave souls)</h1>
				                     <div id="waterBody">
				                       <pre className="water_flow" id="water1">
																 {`-^------^--^--^--^------^--^`}
				                 </pre>
				                       <pre className="water_flow" id="water2">
																 {`    ^----^--        ^---^--`}
				                 </pre>
				                     </div>
							</div>
				</div>
				<div className="container"></div>
			</div>
      <SvgDuck props={{
        top:"10vh",
        bottom:"auto",
        left:"0",
        right:"auto"
      }}/>
    </>
  )
}

export default Story;
