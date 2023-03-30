"use strict";

//waits for content to load and then adds a listener to the button.
document.addEventListener("DOMContentLoaded", function DOMEventListenerMain(){
	document.removeEventListener("DOMContentLoaded", DOMEventListenerMain);
		const closeNotice = function(){
		document.querySelector("header").style.display = "none";
		document.querySelector("header > button").removeEventListener("click", closeNotice);
		}

	document.querySelector("header > button").addEventListener("click", closeNotice)

	//listener for button that starts off the story.
	return page.startButton.tag.addEventListener("click", async function startButtonListener(){

		//if parent notice is open, close it.
		closeNotice();
		document.querySelector("header > button").removeEventListener("click", closeNotice);

		await page.startButton.hide();
		page.startButton.tag.style.display = "none"; //won't be used again. Easier than putting it in the constructor to hide it.
		await page.oneTime.show(1.5);
		await page.oneTime.hide();
		await page.phaseOne.duckWhatColor.show();
		await page.phaseOne.duckInlineInput.show(0);
		page.phaseOne.duckColorInput.focus();
		page.phaseOne.duckColorInput.addEventListener("keyup", function inputListener(){
			document.querySelector("span.helper").style.display = "unset";
		});
		//resizes the box based on how many characters are in it.
		//css declares monospace font so no sizing issues.
		let inputResizer = page.phaseOne.duckColorInput.addEventListener("input", (event) => {
			page.phaseOne.duckColorInput.style.width = page.phaseOne.duckColorInput.value.length + "ch";
		})

		//fires after enter is hit when inputting the duck color.
		return document.addEventListener("keyup", function storyStartListener(event){
			const keyName = event.key;
			if (keyName === "Enter") {
				storyStart();
			};
		});
	})

})

async function storyStart(){
	const colorizeDuck = () => {
	page.phaseOne.duckColorInput.style.backgroundColor = page.phaseOne.duckColorInput.value;
	duck.color = page.phaseOne.duckColorInput.value;
	duck.illust.style.color = duck.color;
	}
	//a little easter egg in case anyone puts in the same color that is used for the background later on.
	if (duck.color === "paleTurquoise"){
		duck.bonusLevel = true;
		//saves input to memory.
		localStorage.setItem("duck", JSON.stringify(duck));
		return duck;
	}

	// after colorizeDuck() is run, verifies the input. If the transition on duckColorInput occurred, then transitionend will detect it.
	page.phaseOne.duckColorInput.addEventListener("transitionend", async function storyStartListener(event){
		document.removeEventListener("keyup", storyStartListener);
		if (page.phaseOne.duckColorInput.value.match(/^[aeiou]/m))
			page.phaseOne.yes.tag.innerText = `Ah, yes! That's it. He was a very normal looking ${duck.color} duck.`;
		else
			page.phaseOne.yes.tag.innerText = `Ah, yes! That's it. He was definitely a ${duck.color} duck.`;
		await page.phaseOne.duckInlineInput.hide();
		await page.phaseOne.duckWhatColor.hide();
		await page.phaseOne.yes.show();
		await sleep(3);// allow reading the message...

		await page.phaseOne.yes.hide();
		page.phaseTwo.body.show(0);
		page.phaseTwo.eyes.hide(0);

		await sleep(2.5);// allow the bg animation time to center.

		//styles the background and activates the flex box centering.
		page.container.style.flex = 1;
		page.body.style.background = "paleTurquoise";

		//easter egg styles.
		if (duck.bonusLevel){
			page.body.style.filter = "invert(100%)";
			page.body.style.background = "MidnightBlue";
			for (let i of page.phaseTwo.eyes){
				i.tag.style.filter = "invert(100%)";
				i.tag.style.transition = "opacity 2s";
			}
				

		}

		//eyes animation
		await page.phaseTwo.eyes.show(3);
		page.phaseTwo.eyes.tag.style.transform = "rotate(0.5turn)"
		await sleep(3);
		await page.phaseTwo.eyes.hide(0);

		await page.phaseThree.show();
	});

	page.phaseOne.duckColorInput.disabled = true;
	await page.phaseOne.hmm.show(); 
	await page.phaseOne.hmm.hide();

	//Colors the Duck based on the input.
	colorizeDuck(); 
	//blocks the input while it is being checked.
	if (!page.phaseOne.duckColorInput.style.backgroundColor){
		await page.phaseOne.no.show();
		await page.phaseOne.no.hide();
		page.phaseOne.duckColorInput.disabled = false;
	}
	//checks to ensure that no hex colors were used and that the duck is not colored white.
	const inputRegex = /#/gu;
	switch(true){
		case page.phaseOne.duckColorInput.style.backgroundColor === "white":
		case Boolean(page.phaseOne.duckColorInput.value.match(inputRegex)):{
			await page.phaseOne.no.show();
			await page.phaseOne.no.hide();
			page.phaseOne.duckColorInput.disabled = false;
			break;
		}
	}
	

}
