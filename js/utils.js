"use strict";

//commonly used objects
const duck = {
	water: document.querySelectorAll("pre.water_flow"),
	illust: document.querySelector("pre#duck"),
};

// custom sleep function.
async function sleep(time){ return new Promise((resolve) => setTimeout(resolve, time * 1000)); }

//constructor used for showing and hiding objects. Uses the computed transition time as the timer for sleeping the integrated promise.
const displayFunc = function(tag) {
	this.tag = document.querySelector(tag),
	this.show = async function(seconds = 1){
		this.tag.style.display = "unset";
		await sleep(seconds * 1);
	},
	this.hide = async function(seconds = .5){
		this.tag.style.display = "none";
		await sleep(seconds * 1);
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
