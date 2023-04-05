"use strict";

//waits for content to load and then adds a listener to the start button.
document.addEventListener("DOMContentLoaded", () => {
	//closes the mobile notice once the "x" button is clicked.
	document.querySelector("header > button").addEventListener("click", page.mobileNotice.hide, {once:true})
	//listener for button that starts off the story.
	return page.startButton.tag.addEventListener("click", startButtonListener);
}, {once: true});


async function startButtonListener(){
	const checkcolorInput = async function checkInputForColor(){
		const colorizeDuck = () => {
			page.phaseOne.duckColorInput.style.backgroundColor = page.phaseOne.duckColorInput.value;
			ascii.duck.color = page.phaseOne.duckColorInput.value;
			ascii.duck.tag.style.color = ascii.duck.color;
			//a little easter egg in case anyone puts in the same color that is used for the background later on.
			if (page.phaseOne.duckColorInput.value === "paleTurquoise"){
				bonusLevel.enabled = true;
				//saves input to memory.
				localStorage.setItem("duck", JSON.stringify(ascii.duck));
			}
		}

		//moves helper text to after the input box.
		document.querySelector("span.inline").after(page.helper.tag);
		await listen4Enter(); // wait for enter to be hit after inputing the color
		page.helper.hide();

		//blocks the input while it is being checked.
		page.phaseOne.duckColorInput.disabled = true;
		await page.phaseOne.hmm.show(); 
		await page.phaseOne.hmm.hide();

		// event listener verifies the input. If the transition on duckColorInput occurred after colorizeDuck ran, then transitionend will detect it.
		page.phaseOne.duckColorInput.addEventListener("transitionend", storyStartListener, {once: true});

		//Colors the Duck based on the input.
		//saves details to object and local storage.
		colorizeDuck(); 

		const inputRegex = /#/gu;
		// checks if the background color has a value.
		if (!page.phaseOne.duckColorInput.style.backgroundColor){
			await page.phaseOne.no.show();
			await page.phaseOne.no.hide();
			page.phaseOne.duckColorInput.disabled = false;
			checkcolorInput();
		}
		//checks to ensure that no hex colors were used and that the duck is not colored white.
		switch(true){
			case page.phaseOne.duckColorInput.style.backgroundColor === "white":
			case Boolean(page.phaseOne.duckColorInput.value.match(inputRegex)):{
				await page.phaseOne.no.show();
				await page.phaseOne.no.hide();
				page.phaseOne.duckColorInput.disabled = false;
				checkcolorInput();
				break;
			}
		}
	}

	page.body.querySelector("h1").style.display = "none";
	page.mobileNotice.hide();
	await page.startButton.hide();
	await page.oneTime.show(1.5);
	page.oneTime.tag.after(page.helper.tag);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	await page.oneTime.hide();
	await page.phaseOne.duckWhatColor.show();
	page.phaseOne.duckInlineInput.show();
	page.phaseOne.duckColorInput.focus();

	//acctively resizes the box based on how many characters are in it.
	//css declares monospace font so no sizing issues.
	page.phaseOne.duckColorInput.addEventListener("input", function inputResizeListener(event){
		page.phaseOne.duckColorInput.style.width = page.phaseOne.duckColorInput.value.length + "ch";
		page.helper.show();
	})

	await checkcolorInput();
};

async function storyStartListener(event){
	const obtainAFriend = async () => {
		const frog = document.querySelector("#frogSelect"),
			dog = document.querySelector("#dogSelect"),
			hog = document.querySelector("#hogSelect"),
			eggnog = document.querySelector("#eggnogSelect");
		switch(true){
			case (frog.checked):{
				ascii.duck.friend = ascii.frog;
				console.log(ascii.duck.friend);
				break;
			}
			case(dog.checked):{
				ascii.duck.friend = ascii.dog;
				console.log(ascii.duck.friend);
				break;
			}
			case(hog.checked):{
				ascii.duck.friend = ascii.hog;
				console.log(ascii.duck.friend);
				break;
			}
			case(eggnog.checked):{
				friend = eggnog.checked
				ascii.duck.friend = ascii.eggnog;
				console.log(ascii.duck.friend);
				break;
			}
			default:{
				await page.phaseThree.tryAgain.show(1.5);
				await page.helper.show();
				await listen4Enter();
				await page.phaseThree.tryAgain.hide();
				obtainAFriend();
			}
		}
	}
	page.phaseOne.yes.tag.innerText = `Ah, yes! That's it. She was a very normal looking ${ascii.duck.color} duck.`;

	await page.phaseOne.duckInlineInput.hide(.5);
	await page.phaseOne.duckWhatColor.hide(.5);

	await page.phaseOne.yes.show(1.5);
	page.phaseOne.yes.tag.after(page.helper.tag);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	page.phaseOne.yes.hide();

	page.phaseTwo.body.show();
	await page.phaseTwo.where.show(2);
	page.phaseTwo.where.tag.after(page.helper.tag)
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
		ascii.duck.tag.style.filter = "invert(100%)";
		page.phaseTwo.eyes.tag.style.filter = "invert(100%)";
		page.phaseTwo.eyes.tag.style.transition = "opacity 2s";
	}

	//eyes animation
	await page.phaseTwo.eyes.show(3);
	page.phaseTwo.eyes.tag.style.transform = "rotate(0.5turn)"
	page.phaseTwo.eyes.tag.style.textShadow = "-1px -1px 3px black"
	await sleep(3);
	page.phaseTwo.eyes.hide();

	await page.phaseTwo.letsSee.hide();

	await page.phaseTwo.ah.show(.5);
	await page.phaseTwo.thereSheIs.show()
	//duck is in a flex container. Needs to be made visible.
	//page.phaseTwo.body.tag.querySelector(".duck_container").style.display = "block";
	await ascii.duck.show();

	ascii.duck.tag.after(page.helper.tag);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	await page.phaseTwo.ah.hide();
	await page.phaseTwo.thereSheIs.hide();
	page.phaseTwo.splashing.tag.after(page.helper.tag)
	page.phaseTwo.splashing.show();
	ascii.duck.tag.after(ascii.water.tag);
	await ascii.water.show();
	
	//move the duck onto the water.
	ascii.duck.tag.style.left = "100px";
	ascii.duck.tag.style.top = "77px";
	page.phaseThree.body.show();
	//working on getting data from a form
	page.phaseThree.chooseAFriend.show();
	page.phaseThree.chooseAFriend.tag.after(page.helper.tag);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
// Checks to ensure a friend was selected and assigns the value.
	obtainAFriend();
}
