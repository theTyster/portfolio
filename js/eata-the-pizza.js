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
	playButton: new displayFunc("#play_button"),
	pauseButton: new displayFunc("#pause_button"),
	ffwdButton: new displayFunc("#ffwd_button"),
	playSong: new displayFunc("#play_song"),
	howGood: new displayFunc("#how_good"),
	songRatingSlide: new displayFunc("#song_rating_slide"),
	songRatingDisplay: new displayFunc("#song_rating_display"),
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
	for (let i of page.friendType){
		i.innerText = ascii.duck.friend.type;
		i.style.color = ascii.duck.friend.color;
	}

	await page.pizzaHeading.show({sec: .5}); //testing only
	await page.visitPizza.show();
	page.helper.show();
	await listen4Enter();
	page.helper.hide()
	await page.pizzaHeading.hide();
	await page.visitPizza.hide();

	await page.scream.show()
	await page.karenWords1.show({sec: .25}); //testing only
	await page.karenWords2.show({sec: .5}); //actual
	await page.karenWords3.show({sec: .5}); //actual
	await page.karenWords4.show();
	const friendCaps = document.createTextNode(ascii.duck.friend.type.toUpperCase());
	document.querySelector("#friend_typeCaps").append(friendCaps);
	await page.karenWords5.show({sec: .2}); //testing only
	await page.karenWords6.show();

	page.karenWords6.tag.after(helper);
	page.helper.show()
	await listen4Enter();
	page.helper.hide();
	await page.scream.hide()
	await page.karenWords1.hide();
	await page.karenWords2.hide();
	await page.karenWords3.hide();
	await page.karenWords4.hide();
	await page.karenWords5.hide();
	await page.karenWords6.hide();

	await page.mrFantastic.show();
	await page.sorryGuys.show();
	await page.leave.show()
	
	page.leave.tag.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();

	await page.mrFantastic.hide();
	await page.sorryGuys.hide();
	await page.leave.hide()
	
	await page.notFantastic.show();
	await page.duckNod.show();
	await page.sneaky.show();

	page.sneaky.tag.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();

	await page.notFantastic.hide();
	await page.duckNod.hide();
	await page.sneaky.hide();

	await page.sneakyHow.show();
	await page.startBand.show();
	await page.soundsAwesome.show();

	page.soundsAwesome.tag.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();

	await page.sneakyHow.hide();
	await page.startBand.hide();
	await page.soundsAwesome.hide();
	
	await page.musicPractice.show();
	await page.finallyReady.show();
	await page.back4More.show();

	page.back4More.tag.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();

	await page.musicPractice.hide();
	await page.finallyReady.hide();
	await page.back4More.hide();
	
	await page.songChoose.show();
	page.songChoose.tag.after(helper);

	const songDebut = async () => {

		page.helper.show();
		await listen4Enter();
		page.helper.hide();

		const songOptions1 = [
			"duck_sounds/1/funny-story.mp3",
			"duck_sounds/1/journey-to-the-sun.mp3",
			"duck_sounds/1/positive-way.mp3",
			"duck_sounds/1/spring-upbeat.mp3",
			"duck_sounds/1/that-good-feeling.mp3",
			"duck_sounds/1/upbeat-funky-retro.mp3",
			"duck_sounds/1/upbeat-summer-pop.mp3"
		]

		const songOptions2 = [
			"duck_sounds/2/beyond.mp3",
			"duck_sounds/2/electro-jazz.mp3",
			"duck_sounds/2/flashes.mp3",
			"duck_sounds/2/future-bass-hot-night.mp3",
			"duck_sounds/2/space.mp3",
			"duck_sounds/2/synthwave-80s.mp3",
			"duck_sounds/2/synthwave-outrun.mp3"
		]

		const songOptions3 = [
			"duck_sounds/3/calm-and-light-breakbeat.mp3",
			"duck_sounds/3/disco-groove.mp3",
			"duck_sounds/3/first.mp3",
			"duck_sounds/3/go_guy.mp3",
			"duck_sounds/3/rock-dedication.mp3",
			"duck_sounds/3/tango-hip-hop.mp3",
			"duck_sounds/3/tropical-summer.mp3"
		]

		let songPlayer = async function(songOptions){

			let playSelect = songOptions[ranNumG(6)],
//			    song = new Audio(playSelect),
					song = new Audio("duck_sounds/kim_possible.mp3"), //testing file only.
			    node = document.createElement("p"),
			    content = document.createTextNode("Loading."),
			    dot = document.createTextNode("."),
			    unableToPlay = true;

			node.append(content);
			page.songChoose.tag.after(node);
			node.style.display = "block";

			song.addEventListener("canplaythrough", e => {
				song.play();
				unableToPlay = false;
				node.remove();
				page.playSong.show();
				player_buttons.style.display = "block";
				page.pauseButton.show({sec: 0, disp: "inline"});
				page.ffwdButton.show({sec: 0, disp: "inline"});
				page.playButton.hide({sec: 0})
			});

			while (unableToPlay){
				node.append(dot);
				dot = document.createTextNode(`.`);
				await sleep(1);
			}

			return song;
		}

		
		if (song1Select.checked){
			let song = songPlayer(songOptions1);
			return song;
		}
		if (song2Select.checked){
			let song = songPlayer(songOptions2);
			return song;
		}
		if (song3Select.checked){
			let song = songPlayer(songOptions3);
			return song;
		}
		else{
			let node = document.createElement("p");
			let content = document.createTextNode("You have to pick something for them to play first!")
			node.append(content);
			node.style.display = "block";
			page.songChoose.tag.after(node);
			await sleep(3);
			node.remove();
			songDebut()

		}
	}

	let money = 0;
	do{

	let song = await songDebut();

	page.pauseButton.tag.addEventListener("click", function pauseButtonListener(){
		song.pause();
		page.pauseButton.hide({sec: 0});
		page.playButton.show({sec: 0, disp: "inline"});
	});

	page.playButton.tag.addEventListener("click", function playButtonListener(){
		song.play();
		song.playbackRate = 1;
		page.playButton.hide({sec: 0});
		page.pauseButton.show({sec: 0, disp: "inline"});
	})

	page.ffwdButton.tag.addEventListener("click", function ffwdButtonListener(){
		song.playbackRate = 4;
		song.preservePitch = false;
	})
	await new Promise((resolve) => {
			song.addEventListener("ended", async () => {
			console.log("the song is done.")
			await page.playSong.hide();
			player_buttons.style.display = "none";
			resolve();
		});
	});
	await page.howGood.show();
	await page.songRatingSlide.show();

	page.songRatingSlide.tag.after(helper);
	page.helper.show();
	await listen4Enter();
	page.helper.hide();
	
	page.howGood.hide();
	page.songRatingSlide.hide();

	money += parseFloat(song_review.value);
	console.log(money);
	console.log(typeof(money))
	} while (money < 20);

	

});
