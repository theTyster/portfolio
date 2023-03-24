"use strict";

//waits for content to load and then adds a listener to the button.
document.addEventListener("DOMContentLoaded", () => {
	const oneTime = new displayFunc("p.oneTime"),
		startButton = new displayFunc("button.startButton"),
		closeNotice = function(){
		document.querySelector("header").style.display = "none";
		document.querySelector("header > button").removeEventListener("click", closeNotice);
		}

	document.querySelector("header > button").addEventListener("click", closeNotice)

	//listener for button that starts off the story.
	return startButton.tag.addEventListener("click", async function startButtonListener(){

		//if parent notice is open, close it.
		closeNotice();
		document.querySelector("header > button").removeEventListener("click", closeNotice);

		await startButton.hide();
		startButton.tag.style.display = "none"; //won't be used again. Easier than putting it in the constructor to hide it.
		await oneTime.show(1.5);
		await oneTime.hide();
		await page.duckWhatColor.show();
		await page.duckInlineInput.show(0);
		page.duckInput.focus();
		//resizes the box based on how many characters are in it.
		//css declares monospace font so no sizing issues.
		let inputResizer = page.duckInput.addEventListener("input", (event) => {
			page.duckInput.style.width = page.duckInput.value.length + "ch";
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
	const phaseOne_hmm = new displayFunc("p.storyStart_hm"),
		phaseOne_no = new displayFunc("p.storyStart_no"),
		phaseOne_yes = new displayFunc("p.storyStart_yes"),
		colorizeDuck = function saveDuckColorToObject() {
		page.duckInput.style.backgroundColor = page.duckInput.value;
		duck.color = page.duckInput.value;
		duck.illust.style.color = duck.color;
		//a little easter egg in case anyone puts in the same color that is used for the background later on.
		if (duck.color === "paleTurquoise")
			duck.bonusLevel = true;
		//saves input to memory.
		localStorage.setItem("duck", JSON.stringify(duck));
		return duck;
		}

	// after colorizeDuck() is run, verifies the input. If the transition on duckInput occurred, then transitionend will detect it.
	page.duckInput.addEventListener("transitionend", async function storyStartListener(event){
		document.removeEventListener("keyup", storyStartListener);
		if (page.duckInput.value.match(/^[aeiou]/m))
			phaseOne_yes.tag.innerText = `Ah, yes! That's it. He was a very normal looking ${duck.color} duck.`;
		else
			phaseOne_yes.tag.innerText = `Ah, yes! That's it. He was definitely a ${duck.color} duck.`;
		await page.duckInlineInput.hide();
		await page.duckWhatColor.hide();
		await phaseOne_yes.show();
		await sleep(3);// allow reading the message...


		const phaseTwo = new displayFunc("div.phaseTwo"),
			eyes = new displayFunc("pre#phTwo_eyes");

		await phaseOne_yes.hide();
		phaseTwo.show(0);
		eyes.hide(0);

		await sleep(2.5);// allow the bg animation time to center.

		//styles the background and activates the flex box centering.
		for (let i of page.container)
		i.style.flex = 1;
		page.body.style.background = "paleTurquoise";

		//easter egg styles.
		if (duck.bonusLevel){
			page.body.style.filter = "invert(100%)";
			page.body.style.background = "MidnightBlue";
			for (let i of eyes){
				i.tag.style.filter = "invert(100%)";
				i.tag.style.transition = "opacity 2s";
			}
				

		}

		//eyes animation
		await eyes.show(3);
		eyes.tag.style.transform = "rotate(0.5turn)"
		await sleep(3);
		await eyes.hide(0);

//		document.querySelector(".eyes_container").style.display = "none";

		const phaseThree = new displayFunc("div.phaseThree");
		await phaseThree.show();
	});

	page.duckInput.disabled = true;
	await phaseOne_hmm.show(); 
	await phaseOne_hmm.hide();

	//Colors the Duck based on the input.
	colorizeDuck(); 
	//blocks the input while it is being checked.
	if (!page.duckInput.style.backgroundColor){
		await phaseOne_no.show();
		await phaseOne_no.hide();
		page.duckInput.disabled = false;
	}
	//checks to ensure that no hex colors were used and that the duck is not colored white.
	const inputRegex = /#/gu;
	switch(true){
		case page.duckInput.style.backgroundColor === "white":
		case Boolean(page.duckInput.value.match(inputRegex)):{
			await phaseOne_no.show();
			await phaseOne_no.hide();
			page.duckInput.disabled = false;
			break;
		}
	}
	

}
