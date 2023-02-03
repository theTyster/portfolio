"use strict";
//duck Object for duck quality persistance
const duck = {
	water: document.querySelectorAll("pre.water_flow"),
	illust: document.querySelector("pre#duck"),
};
//commonly used tags
const page = {
	body:  document.querySelector("body"),
	container: document.getElementsByClassName("container"),
	duckInput: document.querySelector("input#duck_color")
};
const phase = function(tag) {
	this.tag = document.querySelector(tag),
	this.fn = function() {
		this.tag.style.visibility = "unset";
		this.tag.style.opacity = 1;
	}
//	this.transit = function(arg) {
//		this.tag.addEventListener("transitionend", (arg) => arg);
//	},
//	this.timeout = function() {
//		setTimeout(this.fn.bind(this), time)
//	}
};
//fires after enter is hit
document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	if (keyName === "Enter") {
		letUsBegin();
	};
});

const letUsBegin = function fireTheShootyGunRay(){
	const phaseOne = new phase("div.storyStart");
	//Colors the Duck based on the input.
	const colorizeDuck = function saveDuckColorToObject() {
		page.duckInput.style.backgroundColor = page.duckInput.value;
		//saves input to memory.
		duck.color = page.duckInput.value;
		}
	phaseOne.tag.innerHTML = `<p class="storyStart">Hmmmmm.... </p>`;
	phaseOne.fn();
	colorizeDuck();
	page.duckInput.addEventListener("transitionend", () => {
		const checkInput = () => {
			page.duckInput.disabled = true;
			phaseOne.tag.innerHTML = `<p class="storyStart">Ah, yes. It was definitely a ${duck.color} duck.</p>`;
			phaseOne.fn();
		};
			checkInput();
	});
}
page.duckInput.addEventListener("transitionend", () => {
	const phaseTwo = new phase("div.phaseTwo");
	setTimeout(() => {
		phaseTwo.fn();
		let eyes = [document.querySelector("pre#two"), document.querySelector("pre#three")]
		for (let i of eyes)
			i.style.visibility = "collapse";
	for (let i of page.container)
	i.style.flex = 1;
	}, 1000);
})

//	phaseTwo.timeout();
//	const phaseThree = new phase("phaseThree", "div", 8000);
//	phaseThree.timeout();
//	duck.illust.style.color = duck.color;
//	for (let i of duck.water){
//	i.style.color = "blue";
//	}
