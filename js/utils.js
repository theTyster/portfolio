"use strict";

//constructor used for showing and hiding objects. Uses the computed transition time as the timer for sleeping the integrated promise.
const displayFunc = function(tag) {
	this.tag = document.querySelector(tag),
	this.show = async function(seconds = 1){
		this.tag.style.display = "block";
		await sleep(seconds * 1);
	},
	this.hide = async function(seconds = .5){
		this.tag.style.display = "none";
		await sleep(seconds * 1);
	}
};

//declares the object for easter egg features.
const bonusLevel = {}

//tags to ascii graphics
const ascii = {
	water: new displayFunc("#waterBody"),
	duck: new displayFunc("#duck"),
	frog: new displayFunc("#frog"),
	dog: new displayFunc("#dog"),
	hog: new displayFunc("#hog"),
	eggnog: new displayFunc("eggnog")
};

//page tags
const page = {
	body: document.querySelector("body"),
	container: document.querySelector(".container"),
	mobileNotice: new displayFunc("header"),
	oneTime: new displayFunc("#oneTime"),
	startButton: new displayFunc("button#startButton"),
	helper: new displayFunc("#helper"),
	phaseOne:{
		duckColorInput: document.querySelector("input#duck_color"),
		duckInlineInput: new displayFunc("span.inline"),
		duckWhatColor: new displayFunc("#whatColor"),
		hmm:  new displayFunc("#storyStart_hm"),
		no: new displayFunc("#storyStart_no"),
		yes: new displayFunc("#storyStart_yes")
	},
	phaseTwo:{
		body: new displayFunc("div.phaseTwo"),
		where: new displayFunc("#where"),
		letsSee: new displayFunc("#letsSee"),
		eyes:  new displayFunc("#eyes"),
		ah: new displayFunc("#ah"),
		thereSheIs: new displayFunc("#thereSheIs"),
		splashing: new displayFunc("#splashing"),
		chooseAfriend: new displayFunc("chooseAFriend")
	},
	phaseThree:{
		body: new displayFunc("div.phaseThree"),
		chooseAFriend: new displayFunc("#chooseAFriend"),
	}
};


// custom sleep function.
async function sleep(time){ return new Promise((resolve) => setTimeout(resolve, time * 1000)); }

// Listens for Enter to be pressed before continuing.
const listen4Enter = function(){
	return new Promise((resolve) => {
		document.addEventListener("keyup", function enterInputListener(event){
			if (event.key === "Enter"){
				document.removeEventListener("keyup", enterInputListener);
				resolve();
			}
		});
	})
}


const ranNumG = function randomNumberGenerator(max){
	return Math.floor(Math.random() * max);
}


const makeArray = function arrayFromMaxIndex(maxIndex, useKeysBool){
	if (useKeysBool){
	return [...Array(maxIndex).keys()].map((x) => ++x);
	}
	else {
	return [...Array(maxIndex).keys()];
	}
}


let shuffle = function fisherYatesArrayShuffler(inputArr){
	let applyShuffler = () => {
		let len = inputArr.length;
		let placeholder;
		while (len){
			let ran = ranNumG(len--);
			[inputArr[ran], inputArr[len]] = [inputArr[len], inputArr[ran]];
		}
		return inputArr;
	}
	return applyShuffler(...inputArr);
}



const makeItRain = function letItRain(storminess) { // remember that the arg is a range 1-100.
	const hiddenRaindrops = 20;
	storminess = Math.floor(hiddenRaindrops*(storminess/100));
	const rainArray = shuffle(makeArray(storminess));
	const shuffledDrops = shuffle(makeArray(hiddenRaindrops, "Add 1"));

	let delayedRain = async () => {
		try {
			for (let rDropIteration = rainArray.length - 1; rDropIteration > -1; rDropIteration--){
				await sleep(7.77);
				let rainSelector = document.querySelector(`#rain_${shuffledDrops[rainArray[rDropIteration]]}`);
				rainSelector.style.display = "unset";
				rainSelector.style.opacity = 1;
			}
		}
		catch (e){
			console.log(e);
		}
	}
	delayedRain();
}
