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

const ranNumG= function randomNumberGenerator(max){
	return Math.floor(Math.random() * max);
}

let shuffle = function fisherYatesArrayShuffler( // HERES THE PROBLEM ){
	// You need a way to pass an array into this function.
	//
	// Here is your hint:
	// https://stackoverflow.com/questions/2856059/passing-an-array-as-a-function-parameter-in-javascript
	// Goodluck.
	//
	//
	const deleterArr = [...Array(inputArr.length).keys()].map((x) => ++x);
	let len = deleterArr.length;
	while (len){
		let ran = ranNumG(len--)
		[inputArr[ran], deleterArr[len]] = [deleterArr[len], inputArr[ran]];
	}
	return inputArr;
}

//for testing usage only.
const refresh = function pageRefresher(time){
	let re = () => location.reload();
	setTimeout(re, time);
}
