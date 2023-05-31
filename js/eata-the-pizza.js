"use strict";

const page = {
	body: document.querySelector("body"),
	lightGreenBG: "#B3DCBD",
	container: document.querySelector(".container"),
	duckType: document.querySelectorAll(".duck_type"),
	friendType: document.querySelectorAll(".friend_type"),
	friendName: document.querySelectorAll(".friend_name"),
  helper: new displayFunc("#helper"),
	pizzaHeading: new displayFunc("#pizza_story"),
	visitPizza: new displayFunc("#visit_pizza"),
	pizzaFantastic: new displayFunc("#pizza_fantastic"),
	scream: new displayFunc("#scream"),
	karenWords1: new displayFunc("#karenWords1"),
	karenWords2: new displayFunc("#karenWords2"),
	karenWords3: new displayFunc("#karenWords3"),
	karenWords4: new displayFunc("#karenWords4"),
	karenWords5: new displayFunc("#karenWords5"),
	karenWords6: new displayFunc("#karenWords6"),
	mrFantastic: new displayFunc("#mrFantastic"),
	sorryGuys: new displayFunc("#sorryGuys"),
	leave: new displayFunc("#leave"),
	notFantastic: new displayFunc("#notFantastic"),
	duckNod: new displayFunc("#duck_nod"),
	sneaky: new displayFunc("#sneaky"),
	sneakyHow: new displayFunc("#sneaky_how"),
	startBand: new displayFunc("#start_band"),
	soundsAwesome: new displayFunc("#sounds_awesome"),
	musicPractice: new displayFunc("#music_practice"),
	finallyReady: new displayFunc("#finally_ready"),
	back4More: new displayFunc("#back_4_more"),
	songChoose: new displayFunc("#song_choose"),
	playSong: new displayFunc("#play_song"),
	howGood: new displayFunc("#how_good"),
	songRating: new displayFunc("#song_rating"),
	rating: new displayFunc("#rating"),
	song_playAgain: new displayFunc("#song_playAgain"),
	pizzaFinally: new displayFunc("#pizza_finally"),
	sneakInside: new displayFunc("#sneak_inside"),
	slipInTheBack: new displayFunc("#slip_in_the_back"),
	outback: new displayFunc("#outback"),
	pizzaWait: new displayFunc("#pizza_wait"),
	ninjaSneak: new displayFunc("#ninja_sneak"),
	YAY: new displayFunc("#YAY"),
	pizzaDance: new displayFunc("#pizza_dance"),
	pizzaEnd: new displayFunc("#pizza_end"),
	pizzaEndButtons: new displayFunc("#pizza_end_buttons")
}

document.addEventListener("DOMContentLoaded", async () => {
	page.body.style.background = page.lightGreenBG;

	//parse local storage for saved data.
	const parsedJson = JSON.parse(localStorage.getItem("duck"));

	switch (parsedJson.friend.type){
		case ("frog"):
			ascii.duck.friend = ascii.frog;
			break;
		case ("dog"):
			ascii.duck.friend = ascii.dog;
			break;
		case ("hog"):
			ascii.duck.friend = ascii.hog;
			break;
		case ("eggnog"):
			ascii.duck.friend = ascii.eggnog;
			break;
	}
	
	ascii.duck.color = parsedJson.color;
	ascii.duck.friend.name = parsedJson.friend.name;
	ascii.duck.friend.color = parsedJson.friend.color;
	ascii.duck.friend.type = parsedJson.friend.type;

	bonusLevel.enabled = JSON.parse(localStorage.getItem("bonus")).enabled;
	bonusEgg();

	for (let i of page.duckType)
		i.style.color = ascii.duck.color;
	for (let i of page.friendName){
		i.innerText = ascii.duck.friend.name;
		i.style.color = ascii.duck.friend.color;
	}
	// finish writing the conditional above.
	// also fix the css it is not inverting colors correctly.

	await page.pizzaHeading.show(5);
	page.visitPizza.show();


});
