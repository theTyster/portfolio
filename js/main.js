"use strict";

async function storyStart(){
	//const phaseOne = new displayFunc("div.storyStart"),
	const phaseOne_hmm = new displayFunc("p.storyStart_hm"),
		phaseOne_no = new displayFunc("p.storyStart_no"),
		phaseOne_yes = new displayFunc("p.storyStart_yes"),
		regex = /#f/gui,
		colorizeDuck = function saveDuckColorToObject() {
	//Colors the Duck based on the input.
		page.duckInput.style.backgroundColor = page.duckInput.value;
		duck.color = page.duckInput.value;
		//saves input to memory.
		localStorage.setItem("duck", JSON.stringify(duck));
		return duck.color;
		}
	phaseOne_hmm.show(); 
	await sleep (1500);
	phaseOne_hmm.hide();
	await sleep (700);

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
	page.duckInput.addEventListener("transitionend", function storyStartListener(){
		page.duckInput.disabled = true;
		phaseOne_yes.tag.style.position = "relative";
		phaseOne_yes.tag.innerText = `Ah, yes! That's it. He was definitely a ${duck.color} duck.`;
		phaseOne_yes.show();
		document.removeEventListener("keyup", storyStartListener);
	});
}


//fires after enter is hit. 
document.addEventListener("keyup", function storyStartListener(event){
	const keyName = event.key;
	if (keyName === "Enter") {
		storyStart();
	};
});


page.duckInput.addEventListener("transitionend", function phaseTwoListener(){
	const phaseTwo = new displayFunc("div.phaseTwo");
	let eyes = [document.querySelector("pre#phTwo_pt2"), document.querySelector("pre#phTwo_pt3")]
	page.body.style.backgroundColor = "#888"
	setTimeout(() => {
		phaseTwo.show();
		for (let i of eyes)
			i.style.visibility = "collapse";
	for (let i of page.container)
	i.style.flex = 1;
	}, 1000);
	page.container[0].addEventListener("transitionrun", () => {
		eyes[0].style.visibility = "unset";
		eyes[0].style.fontSize = "30pt";
		setTimeout(() => {
		eyes[0].style.visibility = "collapse";
		}, 3000);
		setTimeout(() => {
			eyes[1].style.visibility = "unset";
			eyes[1].style.fontSize = "30pt";
		}, 3000);
		setTimeout(() => {
		eyes[1].style.visibility = "collapse";
		}, 6000);
	makeItRain(33);
	});
	document.removeEventListener("transitionend", phaseTwoListener);
});
