//DEV Libraries
import {useLayoutEffect, useEffect, useRef} from "react";
import gsap from "gsap";

//Components
import SvgDuck from "./assets/duck.jsx";

//CSS
import "./css/story-styles.scss";
import "./css/animate_water_flow.scss";
import "./css/animate_rain.scss";


const Beginning = ()=>{
  const placement_tl = useRef();

  //ANIMATIONS
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
			console.log(placement)
      const dur = 1;
      placement_tl.current = gsap.timeline();
      placement_tl.current
        .from("p", {duration:dur, opacity:0, y:"+=10"})
        .from("footer", {duration:dur, y:"+=200px"},"<")
        .from("main", {duration:dur, height:"100vh"},"<")
				.to("#duck-canvas", {duration:dur, width:"auto", ...placement})
      
    })


    return () => {
      ctx.revert();
    }
  }, [])

	const startButtonListenerRef = useRef();

	useEffect(()=>{

		//UTILS
		//constructor used for showing and hiding objects. Uses the computed transition time as the timer for sleeping the integrated promise.
		const displayFunc = function(tag) {
			this.tag = document.querySelector(tag),
				this.show = async function({sec = 1, rel = true, disp = "block"} = {}){
					this.tag.style.display = disp;
				if (rel)
					this.tag.style.position = "relative";
				if (!rel)
					this.tag.style.position = "absolute";
				await sleep(sec * 1);
				},
			this.hide = async function(sec = .5){
				this.tag.style.display = "none";
				await sleep(sec * 1);
			}
		};

		//declares the object for easter egg features.
		const bonusLevel = {}

		//function to invert styles if easter egg is activated.
		const bonusEgg = function(){
			if (bonusLevel.enabled){
				const invert = "invert(100%)";
				page.body.style.background = "MidnightBlue";
				const selectorTexts = document.querySelectorAll(".bonus_egg");
				for (let i of selectorTexts)
					i.style.filter = invert;
			}
		}

		//tags to ascii graphics
		const ascii = {
			water: new displayFunc("#waterBody"),
			duck: new displayFunc("#duck"),
			frog: new displayFunc("#frog"),
			dog: new displayFunc("#dog"),
			hog: new displayFunc("#hog"),
			eggnog: new displayFunc("#eggnog"),
			animalsBlock: new displayFunc(".ascii_animals_block")
		};


		// custom sleep function.
		const sleep = time => new Promise(resolve => setTimeout(resolve, time * 1000));

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


		let shuffle = function fisherYatesArrayShuffler(inputArr){
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


		const checkColorInput = async function checkInputForColor(inputSelector, asciiObj, transFunc){
			//inputSelector = The selector ID for the text input box being used to choose a color.
			//asciiObj = the ascii picture that the color is going to be applied to.
			//transFunc = the function which fires after the check is complete.

			//moves helper text to after the input box. If the input box is in an inline class.
			if (inputSelector.parentNode.classList.toString() === "inline"){
				inputSelector.parentNode.after(page.helper.tag);
				inputSelector.parentNode.after(page.hm.tag);
				inputSelector.parentNode.after(page.no.tag);
				inputSelector.parentNode.after(page.yes.tag);
			}
			else{
				inputSelector.after(document.querySelector("#helper"));
			}
			await listen4Enter(); // wait for enter to be hit after inputing the color
			page.helper.hide();

			//blocks the input while it is being checked.
			inputSelector.disabled = true;
			await page.hm.show(); 
			await page.hm.hide();

			// event listener verifies the input. If the transition on the input box occurred after colorizeAscii ran, then transitionend will detect it.
			inputSelector.addEventListener("transitionend", transFunc, {once: true});

			//Colors the Duck based on the input.
			//saves details to object and local storage.
			const colorizeAscii = (async () => {
				inputSelector.style.backgroundColor = inputSelector.value;
				asciiObj.color = inputSelector.value;
				asciiObj.tag.style.color = asciiObj.color;
				for (let i of asciiObj.typeSpans)
					i.style.color = asciiObj.color;

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

		//page tags
		const page = {
			body: document.querySelector("body"),
			lightGreenBG: "#B3DCBD",
			container: document.querySelector(".container"),
			mobileNotice: new displayFunc("#notice"),
			oneTime: new displayFunc("#oneTime"),
			startButton: new displayFunc("button#startButton"),
			helper: new displayFunc("#helper"),
			hm:  new displayFunc("#hm"),
			no: new displayFunc("#no"),
			yes: new displayFunc("#yes"),
			duckType: document.querySelectorAll(".duck_type"),
			friendType: document.querySelectorAll(".friend_type"),
			friendName: document.querySelectorAll(".friend_name"),
			phaseOne:{
				duckInlineInput: new displayFunc("span.inline"),
				duckWhatColor: new displayFunc("#whatColor")
			},
			phaseTwo:{
				body: new displayFunc("div.phaseTwo"),
				where: new displayFunc("#where"),
				letsSee: new displayFunc("#letsSee"),
				eyes: new displayFunc("#eyes"),
				ah: new displayFunc("#ah"),
				thereSheIs: new displayFunc("#thereSheIs"),
				splashing: new displayFunc("#splashing")
			},
			phaseThree:{
				body: new displayFunc("div.phaseThree"),
				chooseAFriend: new displayFunc("#chooseAFriend"),
				tryAgain: new displayFunc("#tryAgain"),
				friendDeclare: new displayFunc("#friend_declare"),
				friendNameCheck: new displayFunc(".input_name_check"),
				friendColorQuestion: new displayFunc("#friend_colorQuestion"),
				friendColorInput: new displayFunc("#friend_colorQuestion_input"),
				friendGoofy: new displayFunc("#friend_goofy"),
				friendLaugh: new displayFunc("#friend_laugh"),
				duckLaugh: new displayFunc("#duck_laugh"),
				rainStart: new displayFunc("#rain_start"),
				rainHowBad: new displayFunc("#rain_howBad"),
				rainInputNode: new displayFunc("#rain_input_node"),
				rainNotBad: new displayFunc("#notBad"),
				rainRangeInput: new displayFunc("input#rain_range"),
				rainReallyBad: new displayFunc("#reallyBad"),
				rainGetOut: new displayFunc("#rain_getOut"),
				rainHungry: new displayFunc("#rain_hungry"),
				eatChoose: new displayFunc("#eat_choose")
			}
		};

		async function startButtonListener(){

			//page.body.querySelector("h1").style.display = "none"; // Testers saying having something at the top helps UI
			page.body.querySelector("h1").innerText = "The Duck Story";
			//await page.startButton.hide();
			document.querySelector("button#startButton").style.display = "none";
			await page.oneTime.show(1.5);
			page.oneTime.tag.after(page.helper.tag);
			page.helper.show();
			await listen4Enter();
			page.helper.hide();
			await page.oneTime.hide();
			await page.phaseOne.duckWhatColor.show();
			page.phaseOne.duckInlineInput.show();
			duck_color.focus();

			//acctively resizes the box based on how many characters are in it.
			//css declares monospace font so no sizing issues.
			duck_color.addEventListener("input", function inputResizeListener(event){
				duck_color.style.width = duck_color.value.length + "ch";
				page.helper.show();
			});

			ascii.duck.typeSpans = page.duckType;
			await checkColorInput(duck_color, ascii.duck, storyStartListener);
		};

		
		startButtonListenerRef.current = startButtonListener(); 


		async function storyStartListener(event){
			duck_color.blur();
			page.yes.tag.innerHTML = `<p>Ah, yes! That's it. She was a very normal looking ${ascii.duck.color} <span class="inline" style="color: ${ascii.duck.color};">duck.</span></p>`;

			await page.phaseOne.duckInlineInput.hide(.5);
			await page.phaseOne.duckWhatColor.hide(.5);

			await page.yes.show(1.5);
			page.yes.tag.after(page.helper.tag);
			page.helper.show();
			await listen4Enter();
			page.helper.hide();
			await page.yes.hide();

			page.phaseTwo.body.show();
			await page.phaseTwo.where.show(2);
			page.phaseTwo.where.tag.after(page.helper.tag);
			page.helper.show();
			await listen4Enter();
			page.helper.hide();
			await page.phaseTwo.where.hide();
			await page.phaseTwo.letsSee.show();

			//styles the background and activates the flex box centering.
			page.container.style.flex = 1;
			page.body.style.background = page.lightGreenBG; // light green

			//easter egg styles.
			bonusEgg();

			//eyes animation
			await page.phaseTwo.eyes.show(3);
			page.phaseTwo.eyes.tag.style.transform = "rotate(0.5turn)";
			page.phaseTwo.eyes.tag.style.textShadow = "-1px -1px 3px black";
			await sleep(3);

			page.phaseTwo.eyes.hide();
			await page.phaseTwo.letsSee.hide();

			await page.phaseTwo.ah.show(.5);
			await page.phaseTwo.thereSheIs.show();
			await ascii.duck.show();
			page.helper.show();

			page.phaseTwo.body.tag.after(page.helper.tag);
			page.phaseTwo.thereSheIs.tag.after(duck);
			await listen4Enter();

			page.helper.hide();
			await page.phaseTwo.ah.hide();
			await page.phaseTwo.thereSheIs.hide();
			await ascii.duck.hide();
			ascii.water.hide();

			page.phaseTwo.splashing.tag.after(ascii.animalsBlock.tag);
			ascii.animalsBlock.tag.append(ascii.water.tag, duck);

			page.phaseTwo.splashing.show();
			await ascii.animalsBlock.show({sec: 2, disp: "flex"});
			ascii.water.show({sec: 0});
			ascii.duck.show({sec:0, rel: false});

			ascii.water.tag.style.flex = 1;
			ascii.animalsBlock.tag.style.Top = "55px";
			//duck.style.left = "50%";
			duck.style.top = "-60px";


			page.phaseThree.body.show({sec: 0});
			page.phaseThree.chooseAFriend.show();

			page.phaseThree.chooseAFriend.tag.after(page.helper.tag);
			page.helper.show();
			await listen4Enter();
			page.helper.hide();
			// Checks to ensure a friend was selected and assigns the value to the duck object.
			await (async function obtainAFriend(){
				const frog = document.querySelector("#frogSelect"),
					dog = document.querySelector("#dogSelect"),
					hog = document.querySelector("#hogSelect"),
					eggnog = document.querySelector("#eggnogSelect");
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
							await page.phaseThree.tryAgain.show({sec: 1.5});
							await page.phaseThree.tryAgain.hide();
							await page.helper.show();
							await listen4Enter();
							break;
						}
				}

				}
			})();
			await page.phaseTwo.splashing.hide();
			await page.phaseThree.chooseAFriend.hide();

			//assigns the friend animal to each span element with ".friend_type"
			for (let i of page.friendType)
				i.innerHTML = ascii.duck.friend.type;


			await (async () => {
				let isFriendUndeclared = true;
				while (isFriendUndeclared){

					// fixes a styling quirk with the easter Egg
					document.querySelector("p#friend_declare > span.friend_type").className = "friend_type bonus_egg";

					await page.phaseThree.friendDeclare.show();
					friend_name_input.focus();
					page.phaseThree.friendDeclare.tag.after(page.helper.tag);

					//choose a name for duck's friend.
					friend_name_input.addEventListener("input", function inputResizeListener(event){
						friend_name_input.style.width = friend_name_input.value.length + "ch";
						page.helper.show();
					});

					await listen4Enter();
					page.helper.hide();
					await page.phaseThree.friendDeclare.hide();
					friend_name_input.disabled = true;

					// If the inputed name has a space, is blank, or is a number have them try again.
					const tryAgain = async (friend_nameError, friend_nameError_content) => {
						friend_nameError.append(friend_nameError_content);
						page.phaseThree.friendDeclare.tag.after(friend_nameError);
						friend_nameError.style.display = "block";
						await sleep(4);
						friend_nameError.remove();
						friend_name_input.disabled = false;
					}

					if (friend_name_input.value.indexOf(" ") > -1){
						const friend_nameError = document.createElement("p");
						const friend_nameError_content = document.createTextNode("Sorry, names can't contain spaces. Try again.");
						tryAgain(friend_nameError, friend_nameError_content);
						continue;
					}
					else if (!(friend_name_input.value) || friend_name_input.value.match(/[0-9]/)){
						const friend_nameError = document.createElement("p");
						const friend_nameError_content = document.createTextNode("That name won't work! Try again.");
						tryAgain(friend_nameError, friend_nameError_content);
						continue;
					}
					else if (!friend_name_input.value.match(/^[A-Z]/m)){
						const friend_nameError = document.createElement("p");
						const friend_nameError_content = document.createTextNode("Don't forget to capitalize names!")
						tryAgain(friend_nameError, friend_nameError_content);
						continue;
					}


					document.querySelector("legend>span.friend_name").innerText = friend_name_input.value;
					page.phaseThree.friendNameCheck.show();
					page.phaseThree.friendNameCheck.tag.after(page.helper.tag);
					page.helper.show();
					await listen4Enter();
					page.helper.hide();

					if (name_check_yes.checked){
						ascii.duck.friend.name = friend_name_input.value;
						await page.phaseThree.friendNameCheck.hide();
						for(let i of page.friendName){
							i.innerText = ascii.duck.friend.name;
							i.style.color = ascii.duck.friend.color;
						}
						isFriendUndeclared = false;
						friend_name_input.blur();
					}

					else if(name_check_no.checked){
						await page.phaseThree.friendNameCheck.hide();
						friend_name_input.style.width = "11ch";
						friend_name_input.value = "";
						friend_name_input.disabled = false;
					}
				}
			})();


			await page.phaseThree.friendColorQuestion.show();
			page.phaseThree.friendColorInput.show();
			friend_color.focus();
			friend_color.addEventListener("input", function inputResizeListener(event){
				friend_color.style.width = friend_color.value.length + "ch";
				page.helper.show();
			});
			ascii.duck.friend.typeSpans = page.friendType;
			await checkColorInput(friend_color, ascii.duck.friend, async () => {

				// Sets the Easter Egg after the color has been declared to avoid black on dark text.
				document.querySelector("p#friend_colorQuestion > span.friend_name").className = "friend_name bonus_egg";
				document.querySelector("span#friend_colorQuestion_input > span.friend_type").className = "friend_type bonus_egg";

				//Sets the value of the success text so that it can be colored, if necessary by the Easter Egg function.
				page.yes.tag.innerHTML = `<p>Oh, duh! How could I forget! They were definitely a ${ascii.duck.friend.color} <span class="inline friend_type bonus_egg" style="color: ${ascii.duck.friend.color};">${ascii.duck.friend.type}.</span></p>`;

				// checks to see if easterEgg applies
				bonusEgg();

				//colors the friends name according to the users selection.
				for (let i of page.friendName)
					i.style.color = ascii.duck.friend.color;

				friend_color.blur();
				await page.phaseThree.friendColorInput.hide();
				page.yes.hide();
				page.phaseThree.friendColorInput.tag.after(page.yes.tag);
				await page.phaseThree.friendColorQuestion.hide();
				ascii.animalsBlock.tag.append(ascii.duck.friend.tag);

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
				}

				gsap.timeline()
					.to("#frog, #dog, #hog, #eggnog", {duration:.5, ...placementFriend})
					.to("#duck", {duration:.5, ...placementDuck},"<");

				ascii.duck.friend.tag.style.top = "-50px";
				ascii.animalsBlock.tag.style.marginTop = "50px";

				await page.yes.show({sec: 1.5});

				page.yes.tag.after(page.helper.tag)
				page.helper.show();
				await listen4Enter();
				page.helper.hide();

				await page.yes.hide();

				await page.phaseThree.friendGoofy.show();
				await page.phaseThree.friendLaugh.show();
				await page.phaseThree.duckLaugh.show();

				page.phaseThree.duckLaugh.tag.after(page.helper.tag);
				page.helper.show();
				await listen4Enter();
				await page.helper.hide();

				await page.phaseThree.friendGoofy.hide();
				await page.phaseThree.friendLaugh.hide();
				await page.phaseThree.duckLaugh.hide();

				await page.phaseThree.rainStart.show();
				await page.phaseThree.rainHowBad.show();
				page.phaseThree.rainInputNode.show();

				page.phaseThree.rainInputNode.tag.after(page.helper.tag);
				page.helper.show();
				await listen4Enter();
				page.helper.hide();

				makeItRain(page.phaseThree.rainRangeInput.tag.value);

				// simulate a lightning flash
				page.body.style.background = `#666`;
				await sleep(3);
				page.body.style.transition = "unset";
				page.body.style.background = "paleGoldenRod";
				await sleep(.2)
				page.body.style.background = `#666`;
				await sleep(.2)
				page.body.style.background = "paleGoldenRod";
				await sleep(.2)
				page.body.style.background = `#666`;
				await sleep(.2)
				page.body.style.transition = "background 5s"

				await page.phaseThree.rainStart.hide();
				await page.phaseThree.rainHowBad.hide();
				await page.phaseThree.rainInputNode.hide();

				// DISABLE ALL RADIOS EXCEPT WHAT IS AVAILABLE.
				// ENABLE OTHER BRANCHES AS THEY BECOME COMPLEET.
				puddingSelect.disabled = true;
				grapesSelect.disabled = true;

				await page.phaseThree.rainGetOut.show();

				page.phaseThree.rainGetOut.tag.after(page.helper.tag);
				page.helper.show();
				await listen4Enter();
				page.helper.hide();

				await page.phaseThree.rainGetOut.hide();

				await page.phaseThree.rainHungry.show();
				await page.phaseThree.eatChoose.show();

				page.phaseThree.eatChoose.tag.after(page.helper.tag);

				// Text to inform of more to come.
				let node = document.createElement("p");
				let content = document.createTextNode("Pudding and Grape Stories To come! Check back later!");
				node.append(content);
				page.helper.tag.after(node);
				node.style.display = "block";
				node.style.scale = ".5";
				node.style.textAlign = "center";
				node.style.marginTop = "50px";

				page.helper.show();
				await listen4Enter();
				page.helper.hide();

				// NOT WORKING WITH REACT.
				//localStorage.setItem("duck", JSON.stringify(ascii.duck));
				//localStorage.setItem("friend", JSON.stringify(ascii.duck.friend));
				//localStorage.setItem("bonus", JSON.stringify(bonusLevel));

				await (async () => {

					while (true){
						if (pizzaSelect.checked){
							window.open("eata-the-pizza.html", "_self");
							page.helper.show();
							await listen4Enter();
							page.helper.hide();
						}
						else if (puddingSelect.checked){
							window.open("yummy-puhd.html", "_self");
							page.helper.show();
							await listen4Enter();
							page.helper.hide();
						}
						else if (grapesSelect.checked){
							window.open("got-any-grapes.html", "_self");
							page.helper.show();
							await listen4Enter();
							page.helper.hide();
						}
						else{
							const p = document.createElement("p");
							p.append(document.createTextNode("You must make a selection to continue."));
							page.phaseThree.eatChoose.tag.after(p);
							p.style.display = "block";
							page.helper.show();
							await listen4Enter();
							page.helper.hide();
							p.remove();
						}

					}

				})();
			});
		}
		
	},[])

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
				<div className="container"></div>
				       <h1>Welcome to story time</h1>
				       <button id="startButton" onClick={startButtonListenerRef.current}>click to start</button>
				       <div className="phasedDisplay flex-container">
				         <p id="oneTime">Once upon a time there was a <span className="duck_type bonus_egg">duck</span>.</p>
				         <p id="whatColor">Now, what was the color of that <span className="duck_type bonus_egg">duck</span> again?</p>
				         <span className="inline">
				           <p>I think she was a </p>
				           <input id="duck_color" type="text" name="duck_color" placeholder="Type a color" maxLength="24" size="12" />
				           <p> <span className="duck_type bonus_egg">duck</span>.</p>
				         </span>
				         <p id="helper">Hit &quot;Enter&quot; on your keyboard. 
				           <span id="mobile_helper_screen"><input id="mobile_helper_input" type="text" name="mobile_helper" />Tap here to show keyboard</span>
				         </p>
				         <p id="hm">Hmmmmmm.....</p>
				         <p id="no">No, that wasn&apos;t it.</p>
				         <p id="yes"></p>
				         <div className="phaseTwo">
				           <p id="where">Now, where is that <span className="duck_type bonus_egg">duck</span>? She was just around here somewhere. </p>
				           <p id="letsSee">Let&apos;s see.......</p>
									 <span role="img" aria-label="eyes" id="eyes" className="bonus_egg">👀</span>
				           <h2 id="ah">ah! </h2>
				             <p id="thereSheIs">there she is.</p>
				               <pre className="ascii_animal bonus_egg" id="duck">{`
         __
       =(• )___
        (  _> /  
				                 `}
				               </pre>
				             <p id="splashing">One day <span className="duck_type bonus_egg">duck</span> was splashing in the pond with her best friend.</p>
				         </div>
				         <div className="ascii_animals_block">
				         </div>
				         <div className="phaseThree">
				             <fieldset id="chooseAFriend">
				               <legend>Please Choose one friend for <span className="duck_type bonus_egg">duck</span>.</legend>
				               <input id="frogSelect" type="radio" name="friend" defaultValue="frog" />
				               <label htmlFor="frogSelect">Frog</label>
				               <br />
				               <input id="dogSelect" type="radio" name="friend" defaultValue="dog" />
				               <label htmlFor="dogSelect">Dog</label>
				               <br />
				               <input id="hogSelect" type="radio" name="friend" defaultValue="hog" />
				               <label htmlFor="hogSelect">Hog</label>
				               <br />
				               <input id="eggnogSelect" type="radio" name="friend" defaultValue="eggnog" />
				               <label htmlFor="eggnogSelect">Eggnog</label>
				               <br />
				             </fieldset>
				             <p id="tryAgain">You have to pick a friend for <span className="duck_type bonus_egg">duck</span> first!</p>
				             <p id="friend_declare"><span className="duck_type bonus_egg">duck</span>&apos;s best friend was a <span className="friend_type"></span> named
				                <span className="inline">
				               <input id="friend_name_input" type="text" name="friend_name" placeholder="Type a name" maxLength="23" size="11" />.
				                </span>
				             </p>
				             <fieldset className="input_name_check">
				               <legend>Does <span className="friend_name"></span> sound right?</legend>
				               <input id="name_check_yes" type="radio" name="name_check" defaultValue="yes" />
				               <label htmlFor="name_check">Yes</label>
				               <br />
				               <input id="name_check_no" type="radio" name="name_check" defaultValue="no" defaultChecked />
				               <label htmlFor="name_check">No</label>
				               <br />
				             </fieldset>
				               <p id="friend_colorQuestion">I always forget what color <span className="friend_name"></span> is. Do you remember?</p>
				               <span id="friend_colorQuestion_input" className="inline" >
				                 <p>Maybe they were a </p>
				                 <input id="friend_color" type="text" name="friend_color" placeholder="Type a color" maxLength="24" size="12" />
				                <span className="friend_type"></span>.
				               </span>
				               <p id="friend_goofy">&quot;You sure are one goofy <span className="friend_type bonus_egg"></span>, <span className="friend_name bonus_egg"></span>.&quot; <span className="duck_type bonus_egg">duck</span> said as they splashed together.</p>
				               <p id="friend_laugh"><span className="friend_name bonus_egg"></span> laughed.</p>
				               <p id="duck_laugh"><span className="duck_type bonus_egg">Duck</span> laughed.</p>
				               <p id="rain_start">After a little while it started to <span style={{color:"blue"}}>rain</span>.</p>
				               <p id="rain_howBad">How bad was the storm?</p>
				               <div id="rain_input_node">
				                 <span id="notBad">Not too bad. </span><input id="rain_range" type="range" name="rain_range" min="0" max="100" step="5" defaultValue="25" /><span id="reallyBad" > Really Bad.</span>
				               </div>
				               <p id="rain_getOut">&quot;We should get out of the water during a rainstorm.&quot; said <span className="friend_name bonus_egg"></span></p>
				               <p id="rain_hungry">&quot;Yeah. I&apos;m hungry anyways. What should we eat today?&quot; said <span className="duck_type bonus_egg">duck</span>.</p>
				               <fieldset id="eat_choose">
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
      <div className="hidden_ascii">
       <pre className="ascii_animal bonus_egg" id="frog">{`
         _   _
        (•)_(•)
     _ (   _   ) _
    / \\/'-----'\\/ \\
  __\\ ( (     ) ) /__
  )   /\\ \\___/ /\\   (
   )_/ /|\\   /|\\ \\_(
         `}

      </pre>
            <pre className="ascii_animal bonus_egg" id="dog">{`
       __
  (___()•\`;
  /,    /\`
  \\\\\`--\\\\
              `}
      </pre>
            <pre className="ascii_animal bonus_egg" id="hog">{`
  ^..^_____  
  (00)     \\9
    \\______/ 
     WW  WW
              `}
      </pre>
      <pre className="ascii_animal bonus_egg" id="eggnog">{`
   ____
  |____|      
  /___/_\\      
  |   | |      
  |nog| |      
  |   | |      
  |___|_|      
        `}
      </pre>
      </div>
        <pre id="print_div">{`
                                  ___
                              ,-""   \`.
                            ,'  _   • )\`-._
                           /  ,' \`-._:.===-'
                          /  /
                         /  ;
             _.--.__    /   ;
(\`._    _.-""       "--'    |
(_  \`-""                     \\
 (\`-                          :
  (__   (__.                  ;
    \`-.   '-.__.      _.'    /
       \\      \`-.__,-'    _,'
        \`._    ,    /__,-'
           ""._\\__,'| |____
                | |  \`----.\`.
                | |        \\ \`.
                ; |___      \\-\`\`
                \\   --)
                 \`.\`.)

           Goose. (not a duck.)
          `}
        </pre>
      <SvgDuck props={{
        top:"10vh",
        bottom:"auto",
        left:"0",
        right:"auto"
      }}/>
    </>
  )
}

export default Beginning;
