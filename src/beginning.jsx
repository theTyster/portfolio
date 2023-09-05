//DEV Libraries
import {useLayoutEffect} from "react";
import gsap from "gsap";
import PropTypes from "prop-types";
import {
	sleep,
//	bonusLevel,
	bonusEgg,
	listen4Enter,
//	getLanguage,
//	ranNumG,
//	makeArray,
//	shuffle,
	makeItRain,
	checkColorInput,
} from "./utils.jsx";

//TODO
// COMBINE ALL PAGES OF THE STORY INTO ONE COMPONENT. 
// MAKE SMALLER COMPONENTS WITH PARTS OF THE STORY THAT CAN BE REUSED.
// USE UTILS.JS TO CONTROL THE STORY.

//Components
import SvgDuck from "./assets/duck.jsx";

//CSS
import "./css/story-styles.scss";
import "./css/animate_water_flow.scss";
import "./css/animate_rain.scss";


const Beginning = ({setStory})=>{

  //Props Validation
  Beginning.propTypes = {
    setStory: PropTypes.func,
  }

	let placement_tl;

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


		//FUNCTIONS
	async function startButtonListener(){

		page.startButton.hide();
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
		page.border.style.background = page.lightGreenBG; // light green

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
				       <button id="startButton" onClick={startButtonListener}>click to start</button>
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
