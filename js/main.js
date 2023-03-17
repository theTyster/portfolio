"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const oneTime = new displayFunc("p.oneTime"),
		startButton = new displayFunc("button.startButton");

	return startButton.tag.addEventListener("click", async function startButtonListener(){
		await startButton.hide();
		startButton.tag.style.display = "none";
		await oneTime.show();
		await oneTime.hide();
		await page.duckWhatColor.show();
		await page.duckInlineInput.show();
		page.duckInput.focus();
		let inputResizer = page.duckInput.addEventListener("input", (event) => {
			console.log(event);
			page.duckInput.style.width = page.duckInput.value.length + "ch";
		})

		//fires after enter is hit. 
		return document.addEventListener("keyup", function storyStartListener(event){
			const keyName = event.key;
			if (keyName === "Enter") {
				storyStart();
			};
		});
	})

})

async function storyStart(){
	//const phaseOne = new displayFunc("div.storyStart"),
	const phaseOne_hmm = new displayFunc("p.storyStart_hm"),
		phaseOne_no = new displayFunc("p.storyStart_no"),
		phaseOne_yes = new displayFunc("p.storyStart_yes"),
		inputRegex = /#/gui,
		colorizeDuck = function saveDuckColorToObject() {
		page.duckInput.style.backgroundColor = page.duckInput.value;
		duck.color = page.duckInput.value;
		duck.illust.style.color = duck.color;
		if (duck.color === "paleTurquoise")
			duck.bonusLevel = true;
		//saves input to memory.
		localStorage.setItem("duck", JSON.stringify(duck));
		return duck;
		}

	// verifies the input. If the transition on duckInput occurred, then transitionend will detect it.
	page.duckInput.addEventListener("transitionend", async function storyStartListener(event){
		document.removeEventListener("keyup", storyStartListener);
		phaseOne_yes.tag.innerText = `Ah, yes! That's it. He was definitely a ${duck.color} duck.`;
		await page.duckInlineInput.hide();
		await page.duckWhatColor.hide();
		await phaseOne_yes.show();
		await sleep(3000);// allow reading the message...


		const phaseTwo = new displayFunc("div.phaseTwo"),
		eyes = [document.querySelector("pre#phTwo_eyes1"), document.querySelector("pre#phTwo_eyes2")]

		await phaseOne_yes.hide();
		phaseTwo.show();

		for (let i of eyes){
			i.style.textShadow = "1px 1px 2px black";
			i.style.visibility = "collapse";
		}
		await sleep(2500);// allow the animation time.

		for (let i of page.container)
		i.style.flex = 1;
		page.body.style.background = "paleTurquoise";

		if (duck.bonusLevel){
			page.body.style.filter = "invert(100%)";
			page.body.style.background = "MidnightBlue";
			for (let i of eyes)
				i.style.filter = "invert(100%)";

		}

		eyes[0].style.visibility = "unset";
		eyes[0].style.fontSize = "30pt";
		await sleep(3000);

		eyes[0].style.visibility = "collapse";
		await sleep(3000);

		eyes[1].style.visibility = "unset";
		eyes[1].style.fontSize = "30pt";
		await sleep(3000);

		for (let i of eyes)
		i.style.display = "none";

		//await sleep(2000);
		const phaseThree = new displayFunc("div.phaseThree");
		await phaseThree.show();
	});

	page.duckInput.disabled = true;
	await phaseOne_hmm.show(); 
	await phaseOne_hmm.hide();

	//Colors the Duck based on the input.
	colorizeDuck(); 
	if (!page.duckInput.style.backgroundColor){
		phaseOne_no.show();
		await sleep(1500);
		phaseOne_no.hide();
		page.duckInput.disabled = false;
	}
	else if(page.duckInput.style.backgroundColor === "white" || page.duckInput.value.match(inputRegex)){
		phaseOne_no.show();
		await sleep(1500);
		phaseOne_no.hide();
		page.duckInput.disabled = false;
	}

}
