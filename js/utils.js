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
//	this.transit = function(arg) {
//		this.tag.addEventListener("transitionend", (arg) => arg);
//	},
//	this.timeout = function() {
//		setTimeout(this.fn.bind(this), time)
//	}
};

const ranNumG= function randomNumberGenerator(max){
	return Math.floor(Math.random() * max);
}



//let reload = function tabReloader(){
//	location.reload();
//}
////setTimeout(reload, 2000);
