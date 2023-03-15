"use strict";

async function storyStart(){
	//const phaseOne = new displayFunc("div.storyStart"),
	const phaseOne_hmm = new displayFunc("p.storyStart_hm"),
		phaseOne_no = new displayFunc("p.storyStart_no"),
		phaseOne_yes = new displayFunc("p.storyStart_yes"),
		regex = /#/gui,
		colorizeDuck = function saveDuckColorToObject() {
		page.duckInput.style.backgroundColor = page.duckInput.value;
		duck.color = page.duckInput.value;
		if (duck.color === "paleTurquoise")
			duck.bonusLevel = true;
		//saves input to memory.
		localStorage.setItem("duck", JSON.stringify(duck));
		return duck;
		}

	phaseOne_hmm.show(); 
	await sleep (1500);
	phaseOne_hmm.hide();
	await sleep (700);

	//Colors the Duck based on the input.
	colorizeDuck(); 
	if (!page.duckInput.style.backgroundColor){
		phaseOne_no.show();
		await sleep(1500);
		phaseOne_no.hide();
	}
	else if(page.duckInput.style.backgroundColor === "white" || page.duckInput.value.match(regex)){
		phaseOne_no.show();
		await sleep(1500);
		phaseOne_no.hide();
	}

	// verifies the input. If the transition occurred, then transitionend will detect it.
	page.duckInput.addEventListener("transitionend", async function storyStartListener(){
		document.removeEventListener("keyup", storyStartListener);
		page.duckInput.disabled = true;
		phaseOne_yes.tag.style.position = "relative"; //necessary so that text doesn't get mashed. This is not important enough to add to CSS directly imo.
		phaseOne_yes.tag.innerText = `Ah, yes! That's it. He was definitely a ${duck.color} duck.`;
		phaseOne_yes.show();


		const phaseTwo = new displayFunc("div.phaseTwo");
		let eyes = [document.querySelector("pre#phTwo_eyes1"), document.querySelector("pre#phTwo_eyes2")]

		await sleep(2000)
		phaseTwo.show();

		for (let i of eyes){
			i.style.textShadow = "1px 1px 2px black";
			i.style.visibility = "collapse";
		}
		await sleep(3500);

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

		await sleep(2000);
		const phaseThree = new displayFunc("div.phaseThree");
		await phaseThree.show();
	});
}


//fires after enter is hit. 
document.addEventListener("keyup", function storyStartListener(event){
	const keyName = event.key;
	if (keyName === "Enter") {
		storyStart();
	};
});
