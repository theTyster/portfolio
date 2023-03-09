"use strict";
//fires after enter is hit
document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	if (keyName === "Enter") {
		storyStart();
	};
});


const storyStart = function storyStart(){
	//Colors the Duck based on the input.
	const phaseOne = new phase("div.storyStart"),
	colorizeDuck = function saveDuckColorToObject() {
		page.duckInput.style.backgroundColor = page.duckInput.value;
		duck.color = page.duckInput.value;
		//saves input to memory.
		localStorage.setItem("duck", JSON.stringify(duck));
		return duck.color;
		}
	phaseOne.tag.innerHTML = `<p class="storyStart">Hmmmmm.... </p>`;
	phaseOne.fn();
	colorizeDuck();
	// verifies the input.
	page.duckInput.addEventListener("transitionend", () => {
			page.duckInput.disabled = true;
			phaseOne.tag.innerHTML = `<p class="storyStart">Ah, yes. It was definitely a ${duck.color} duck.</p>`;
			phaseOne.fn();
	});
}


page.duckInput.addEventListener("transitionend", () => {
	const phaseTwo = new phase("div.phaseTwo");
	let eyes = [document.querySelector("pre#phTwo_pt2"), document.querySelector("pre#phTwo_pt3")]
	page.body.style.backgroundColor = "#888"
	setTimeout(() => {
		phaseTwo.fn();
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
});
