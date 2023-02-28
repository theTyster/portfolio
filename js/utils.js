"use strict";
//duck Object for duck quality persistance
const duck = {
	water: document.querySelectorAll("pre.water_flow"),
	illust: document.querySelector("pre#duck"),
};
//let testerButton = 
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
};

const ranNumG = function randomNumberGenerator(max){
	return Math.floor(Math.random() * max);
}

const makeArray = function arrayFromMaxIndex(maxIndex){
	return [...Array(maxIndex).keys()].map((x) => ++x);
}

let shuffle = function fisherYatesArrayShuffler(inputArr){
	let applyShuffler = () => {
		const shuffledArr = [...Array(inputArr.length).keys()].map((x) => ++x);
		let len = shuffledArr.length;
		let placeholder;
		while (len){
			let ran = ranNumG(len--);
			[inputArr[ran], shuffledArr[len]] = [shuffledArr[len], inputArr[ran]];
		}
		return shuffledArr;
	}
	return applyShuffler(...inputArr);
}

//for testing usage only.
const refresh = function pageRefresher(time){
	let re = () => location.reload();
	setTimeout(re, time);
}
