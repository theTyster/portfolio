"use strict";

//page tags
const page = {
	body: document.querySelector("body"),
	lightGreenBG: "#B3DCBD",
	container: document.querySelector(".container"),
	mobileNotice: new displayFunc("header"),
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
		eyes:  new displayFunc("#eyes"),
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

//waits for content to load and then adds a listener to the start button.
document.addEventListener("DOMContentLoaded", function(){
	//closes the mobile notice once the "x" button is clicked.
	document.querySelector("header > button").addEventListener("click", page.mobileNotice.hide, {once:true})
	//listener for button that starts off the story.
	return startButton.addEventListener("click", startButtonListener);
}, {once: true});


async function startButtonListener(){
	

	//page.body.querySelector("h1").style.display = "none"; // Testers saying having something at the top helps UI
	page.body.querySelector("h1").innerText = "The Duck Story";
	page.mobileNotice.hide();
	await page.startButton.hide();
	await page.oneTime.show(1.5);
	page.oneTime.tag.after(helper);
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
	yes.innerHTML = `<p>Ah, yes! That's it. She was a very normal looking ${ascii.duck.color} <span class="inline" style="color: ${ascii.duck.color};">duck.</span></p>`;

	await page.phaseOne.duckInlineInput.hide(.5);
	await page.phaseOne.duckWhatColor.hide(.5);

	await page.yes.show(1.5);
	yes.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	await page.yes.hide();

	page.phaseTwo.body.show();
	await page.phaseTwo.where.show(2);
	where.after(helper);
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
	eyes.style.transform = "rotate(0.5turn)";
	eyes.style.textShadow = "-1px -1px 3px black";
	await sleep(3);

	page.phaseTwo.eyes.hide();
	await page.phaseTwo.letsSee.hide();

	await page.phaseTwo.ah.show(.5);
	await page.phaseTwo.thereSheIs.show();
	await ascii.duck.show();
	page.helper.show();

	page.phaseTwo.body.tag.after(helper);
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
	duck.style.marginLeft = "50%";
	duck.style.marginTop = "-40px";

	page.phaseThree.body.show({sec: 0});
  page.phaseThree.chooseAFriend.show();

	chooseAFriend.after(helper);
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
		let l = true;
		while (l){
			await page.phaseThree.friendDeclare.show();
			friend_name_input.focus();
			friend_declare.after(helper);

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
				friend_declare.after(friend_nameError);
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
			page.phaseThree.friendNameCheck.tag.after(helper);
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
				l = false;
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

		// checks to see if easterEgg applies
		bonusEgg();

		//colors the friends name according to the users selection.
		for (let i of page.friendName)
			i.style.color = ascii.duck.friend.color;

		friend_color.blur();
		await page.phaseThree.friendColorInput.hide();
		page.yes.hide();
		yes.innerHTML = `<p>Oh, duh! How could I forget! They were definitely a ${ascii.duck.friend.color} <span class="inline friend_type" style="color: ${ascii.duck.friend.color};">${ascii.duck.friend.type}.</span></p>`;
		page.phaseThree.friendColorInput.tag.after(yes);
		await page.phaseThree.friendColorQuestion.hide();
		ascii.animalsBlock.tag.append(ascii.duck.friend.tag);

		ascii.duck.friend.show({rel: false, disp: "inline-block"});
		ascii.duck.show({rel: false, disp: "inline-block"});

		ascii.duck.friend.tag.style.marginTop = "-50px";
		ascii.animalsBlock.tag.style.marginTop = "50px";

		await page.yes.show({sec: 1.5});

		yes.after(helper)
		page.helper.show();
		await listen4Enter();
		page.helper.hide();

		await page.yes.hide();

		await page.phaseThree.friendGoofy.show();
		await page.phaseThree.friendLaugh.show();
		await page.phaseThree.duckLaugh.show();

		page.phaseThree.duckLaugh.tag.after(helper);
		page.helper.show();
		await listen4Enter();
		await page.helper.hide();

		await page.phaseThree.friendGoofy.hide();
		await page.phaseThree.friendLaugh.hide();
		await page.phaseThree.duckLaugh.hide();

		await page.phaseThree.rainStart.show();
		await page.phaseThree.rainHowBad.show();
		page.phaseThree.rainInputNode.show();

		page.phaseThree.rainInputNode.tag.after(helper);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();

		makeItRain(rain_range.value);

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

		await page.phaseThree.rainGetOut.show();
		await page.phaseThree.rainHungry.show();
		await page.phaseThree.eatChoose.show();

		page.phaseThree.eatChoose.tag.after(helper);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();

		localStorage.setItem("duck", JSON.stringify(ascii.duck));
		localStorage.setItem("friend", JSON.stringify(ascii.duck.friend));
		localStorage.setItem("bonus", JSON.stringify(bonusLevel));

		await (async () => {
			const pizza = document.querySelector("#pizzaSelect"),
				pudding = document.querySelector("#puddingSelect"),
				grapes = document.querySelector("#grapesSelect");

			while (true){
				if (pizza.checked){
					window.open("eata-the-pizza.html", "_self");
					page.helper.show();
					await listen4Enter();
					page.helper.hide();
				}
				else if (pudding.checked){
					window.open("yummy-puhd.html", "_self");
					page.helper.show();
					await listen4Enter();
					page.helper.hide();
				}
				else if (grapes.checked){
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
