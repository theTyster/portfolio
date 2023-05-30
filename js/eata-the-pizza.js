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

document.addEventListener("DOMContentLoaded", () => {
	page.body.style.background = page.lightGreenBG;
	page.pizzaHeading.show()
	await sleep(2)
	
});

