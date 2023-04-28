"use strict";

//page tags
const page = {
	body: document.querySelector("body"),
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
		eatChoose: new displayFunc("#eat_choose")//,
		//: new displayFunc("#")
	}
};

//waits for content to load and then adds a listener to the start button.
document.addEventListener("DOMContentLoaded", () => {
	//closes the mobile notice once the "x" button is clicked.
	document.querySelector("header > button").addEventListener("click", page.mobileNotice.hide, {once:true})
	//listener for button that starts off the story.
	return startButton.addEventListener("click", startButtonListener);
}, {once: true});


async function startButtonListener(){
	

	page.body.querySelector("h1").style.display = "none";
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
	})

	await checkColorInput(duck_color, ascii.duck);
};

async function storyStartListener(event){
	const obtainAFriend = async () => {
		const frog = document.querySelector("#frogSelect"),
			dog = document.querySelector("#dogSelect"),
			hog = document.querySelector("#hogSelect"),
			eggnog = document.querySelector("#eggnogSelect");
		// A switch statement here is probably not best practice since IF is faster. But I need the practice.
		switch(true){
			case (frog.checked):{
				ascii.duck.friend = ascii.frog;
				ascii.duck.friend.type = "frog";
				break;
			}
			case(dog.checked):{
				ascii.duck.friend = ascii.dog;
				ascii.duck.friend.type= "dog";
				break;
			}
			case(hog.checked):{
				ascii.duck.friend = ascii.hog;
				ascii.duck.friend.type = "hog";
				break;
			}
			case(eggnog.checked):{
				friend = eggnog.checked
				ascii.duck.friend = ascii.eggnog;
				ascii.duck.friend.type = "eggnog";
				break;
			}
			default:{
				await page.helper.hide();
				await page.phaseThree.tryAgain.show(1.5);
				await page.phaseThree.tryAgain.hide();
				await page.helper.show();
				await listen4Enter();
				obtainAFriend();
			}
		}
	}
	const chooseFriendName = async () => {
		page.phaseThree.friendDeclare.show();
		friend_name_input.focus();
		friend_declare.after(helper)
		//choose a name for duck's friend.
		friend_name_input.addEventListener("input", function inputResizeListener(event){
			friend_name_input.style.width = friend_name_input.value.length + "ch";
			page.helper.show();
		})
		await listen4Enter();
		page.helper.hide();
		page.phaseThree.friendDeclare.hide(); //hide input box to remove focus.
		friend_name_input.disabled = true;
		document.querySelector("legend>span.friend_name").innerText = friend_name_input.value;
		page.phaseThree.friendNameCheck.show();
		page.phaseThree.friendNameCheck.tag.after(helper);
		page.helper.show();
		await listen4Enter();
		page.helper.hide();
		if (name_check_yes.checked){
			ascii.duck.friend.name = friend_name_input.value
			page.phaseThree.friendNameCheck.hide();
			for(let i of page.friendName){
				i.innerText = ascii.duck.friend.name
			}
		}
		else if(name_check_no.checked){
			page.phaseThree.friendNameCheck.hide();
			friend_name_input.style.width = "11ch";
			friend_name_input.value = "";
			friend_name_input.disabled = false;
			chooseFriendName();
		}
	}
	yes.innerText = `Ah, yes! That's it. She was a very normal looking ${ascii.duck.color} duck.`;

	await page.phaseOne.duckInlineInput.hide(.5);
	await page.phaseOne.duckWhatColor.hide(.5);

	await page.yes.show(1.5);
	yes.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	page.yes.hide();

	page.phaseTwo.body.show();
	await page.phaseTwo.where.show(2);
	where.after(helper)
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	await page.phaseTwo.where.hide();
	await page.phaseTwo.letsSee.show();

	//styles the background and activates the flex box centering.
	page.container.style.flex = 1;
	page.body.style.background = "#B3DCBD"; // light green

	//easter egg styles.
	if (bonusLevel.enabled){
		page.body.style.filter = "invert(100%)";
		page.body.style.background = "MidnightBlue";
		duck.style.filter = "invert(100%)";
		eyes.style.filter = "invert(100%)";
		eyes.style.transition = "opacity 2s";
	}

	//eyes animation
	await page.phaseTwo.eyes.show(3);
	eyes.style.transform = "rotate(0.5turn)"
	eyes.style.textShadow = "-1px -1px 3px black"
	await sleep(3);
	page.phaseTwo.eyes.hide();

	await page.phaseTwo.letsSee.hide();

	await page.phaseTwo.ah.show(.5);
	await page.phaseTwo.thereSheIs.show()
	//duck is in a flex container. Needs to be made visible.
	//page.phaseTwo.body.tag.querySelector(".duck_container").style.display = "block";
	await ascii.duck.show();

	duck.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	await page.phaseTwo.ah.hide();
	await page.phaseTwo.thereSheIs.hide();
	splashing.after(helper)
	page.phaseTwo.splashing.show();
	duck.after(ascii.water.tag);
	await ascii.water.show();
	
	//move the duck onto the water.
	duck.style.left = "100px";
	duck.style.top = "77px";
	page.phaseThree.body.show();
	//working on getting data from a form
	page.phaseThree.chooseAFriend.show();
	chooseAFriend.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	// Checks to ensure a friend was selected and assigns the value to the duck object.
	obtainAFriend();
	page.phaseTwo.splashing.hide();
	page.phaseThree.chooseAFriend.hide();
	//assigns the friend animal to each span element with ".friend_type"
	for (let i of page.friendType)
		i.innerHTML = ascii.duck.friend.type;
	chooseFriendName();
	friendColorQuestion.show();
	friendColorInput.show();
	//YOU SHOULD BE ABLE TO SEE THE INPUT NOW. TIME TO SANITIZE THAT FIELD AND CHECK
	//IF CHECKCOLORINPUT() IS REALLY REUSABLE.
	//ALSO. DON'T FORGET TO ADD A RULE FOR PICKING THE FRIEND NAME SO THAT USERS CAN'T
	//RETURN A BLANK FIELD.
	//ALSO. DON'T FORGET TO ADD COLOR TO ALL OF THESE INPUTS. DUCK, FRIEND NAME, AND FRIEND TYPE SHOULD ALL BE COLORIZED.
}
