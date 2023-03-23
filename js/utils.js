"use strict";

//commonly used objects
const duck = {
	water: document.querySelectorAll("pre.water_flow"),
	illust: document.querySelector("pre#duck"),
};

// custom sleep function.
async function sleep(time){ return new Promise((resolve) => setTimeout(resolve, time)); }

//constructor used for showing and hiding objects. Uses the computed transition time as the timer for sleeping the integrated promise.
const displayFunc = function(tag) {
	this.tag = document.querySelector(tag),
	this.show = async function(){
		let sleepRegex = /[0-9]+s|[0-9]*\.[0-9]+s/
		let seconds = parseFloat(document.defaultView.getComputedStyle(this.tag).transition.match(sleepRegex)) * 1000;
		this.tag.style.visibility = "unset";
		this.tag.style.opacity = 1;
		await sleep(seconds);
	},
	this.hide = async function(){
		let sleepRegex = /[0-9]+s|[0-9]*\.[0-9]+s/
		let seconds = parseFloat(document.defaultView.getComputedStyle(this.tag).transition.match(sleepRegex)) * 1000;
		this.tag.style.opacity = 0;
		await sleep(seconds);
		this.tag.style.visibility = "collapse";
	}
};

//commonly used tags
const page = {
	body: document.querySelector("body"),
	container: document.getElementsByClassName("container"),
	duckInput: document.querySelector("input#duck_color"),
	duckInlineInput: new displayFunc("span.inline"),
	duckWhatColor: new displayFunc("p.whatColor")
};


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




// remember that the arg is a range 1-100.
const makeItRain = function letItRain(storminess) {
	const hiddenRaindrops = 20;
	storminess = Math.floor(hiddenRaindrops*(storminess/100));
	const rainArray = shuffle(makeArray(storminess));
	const shuffledDrops = shuffle(makeArray(hiddenRaindrops, "Add 1"));

	let delayedRain = async () => {
		try {
			for (let rDropIteration = rainArray.length - 1; rDropIteration > -1; rDropIteration--){
				await sleep(777);
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
