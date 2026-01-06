//DEV Libraries
import {useEffect, useRef} from "react";
//import gsap from "gsap";
//import PropTypes from "prop-types";
import SvgDuck from "./assets/duck";
import {
	sleep,
//	bonusLevel,
//	bonusEgg,
	listen4Enter,
	getLanguage,
	ranNumG,
//	makeArray,
//	shuffle,
//	makeItRain,
//	checkColorInput,
} from "./utils";

//CSS
import "./css/story-styles.scss";
import "./css/animate_water_flow.scss";

const Pizza = ({setStory, displayFunc, ascii}) => {

//  //Props Validation
//  Pizza.propTypes = {
//    setStory: PropTypes.func,
//		displayFunc: PropTypes.func,
//		ascii: PropTypes.obj,
//  }


	let page = useRef();

	useEffect(()=>{
		
		(async() => {

			//PAGE TAGS
			page.current = {
				border: document.querySelector("#app"),
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
				sorryGuys: new displayFunc("#sorry_guys"),
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
				songPlaying: new displayFunc("#song_playing"),
				howGood: new displayFunc("#how_good"),
				songRatingSlide: new displayFunc("#song_rating_slide"),
				songReviewSliderInput: new displayFunc("input#song_review"),
				songRatingDisplay: new displayFunc("#song_rating_display"),
				rating: new displayFunc("#rating"),
				songPlayAgain: new displayFunc("#song_playAgain"),
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

		//Functions
			page.current.border.style.background = page.current.lightGreenBG;
			page.current.container.style.flex = 1;

			//TODO
			//bonusEgg.current(); 

			for (let i of page.current.duckType)
				i.style.color = ascii.duck.color;
			for (let i of page.current.friendName){
				i.innerText = ascii.duck.friend.name;
				i.style.color = ascii.duck.friend.color;
			}
			for (let i of page.current.friendType){
				i.innerText = ascii.duck.friend.type;
				i.style.color = ascii.duck.friend.color;
			}

			await page.current.pizzaHeading.show({sec: 5}); //testing only
			await page.current.visitPizza.show();
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();
			//await page.current.pizzaHeading.hide(); // Testers saying having something at the top helps UI
			await page.current.visitPizza.hide();

			await page.current.scream.show()
			await page.current.karenWords1.show({sec: 2.5}); //testing only
			await page.current.karenWords2.show({sec: .5}); //actual
			await page.current.karenWords3.show({sec: .5}); //actual
			await page.current.karenWords4.show();
			const friendCaps = document.createTextNode(ascii.duck.friend.type.toUpperCase());
			const friendTypeCaps = document.querySelector("#friend_typeCaps");
			friendTypeCaps.append(friendCaps);
			friendTypeCaps.style.color = ascii.duck.friend.color;

			await page.current.karenWords5.show({sec: 2}); //testing only
			await page.current.karenWords6.show();

			page.current.karenWords6.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();
			await page.current.scream.hide();
			await page.current.karenWords1.hide();
			await page.current.karenWords2.hide();
			await page.current.karenWords3.hide();
			await page.current.karenWords4.hide();
			await page.current.karenWords5.hide();
			await page.current.karenWords6.hide();

			await page.current.mrFantastic.show();
			await page.current.sorryGuys.show();
			await page.current.leave.show();

			page.current.leave.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();

			await page.current.mrFantastic.hide();
			await page.current.sorryGuys.hide();
			await page.current.leave.hide();

			await page.current.notFantastic.show();
			await page.current.duckNod.show();
			await page.current.sneaky.show();

			page.current.sneaky.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();

			await page.current.notFantastic.hide();
			await page.current.duckNod.hide();
			await page.current.sneaky.hide();

			await page.current.sneakyHow.show();
			await page.current.startBand.show();
			await page.current.soundsAwesome.show();

			page.current.soundsAwesome.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();

			await page.current.sneakyHow.hide();
			await page.current.startBand.hide();
			await page.current.soundsAwesome.hide();

			await page.current.musicPractice.show();
			await page.current.finallyReady.show();
			await page.current.back4More.show();

			page.current.back4More.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();

			await page.current.musicPractice.hide();
			await page.current.finallyReady.hide();
			await page.current.back4More.hide();

			await page.current.songChoose.show();
			page.current.songChoose.tag.after(page.current.helper.tag);


			let money = 0;
			// iterate over the song game as long as the duck doesn't have 20 money.
			do{
				if (money > 0){

					let songRatingDisplay = document.getElementById("song_rating_display"),
							songMoneyEarned = document.getElementById("song_moneyEarned"),
							songMoneyNeeded = document.getElementById("song_moneyNeeded");
					if (page.current.songReviewSliderInput.tag.value >= 1 & page.current.songReviewSliderInput.tag.value < 3){
						songRatingDisplay.innerText = "bad";
					}
					else if (page.current.songReviewSliderInput.tag.value >= 3 & page.current.songReviewSliderInput.tag.value < 5){
						songRatingDisplay.innerText = "lame";
					}
					else if (page.current.songReviewSliderInput.tag.value >= 5 & page.current.songReviewSliderInput.tag.value < 7){
						songRatingDisplay.innerText = "decent";
					}
					else if (page.current.songReviewSliderInput.tag.value >= 7 & page.current.songReviewSliderInput.tag.value < 9){
						songRatingDisplay.innerText = "great";
					}
					else if (page.current.songReviewSliderInput.tag.value >9){
						songRatingDisplay.innerText = "FANTASTIC";
					}

					songMoneyEarned.innerText = new Intl.NumberFormat(getLanguage(), {style: "currency", currency: "USD"}).format(money);
					songMoneyNeeded.innerText = new Intl.NumberFormat(getLanguage(), {style: "currency", currency: "USD"}).format(20 - money);

					await page.current.rating.show({sec: 3});
					await page.current.songPlayAgain.show();
				}

				let songDebut = null; 
				let song = new Audio();
				await (songDebut = async () => {

					page.current.songChoose.tag.disabled = false;
					page.current.songPlayAgain.tag.after(page.current.helper.tag);


				//Need to add a fisher-yates shuffler to this so that their are no repeats of songs.

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

				// Takes an input, one of the song arrays, and randomly selects an index to be the src value for the song.
				let songPlayer = async (songOptions) => {

					let node = document.createElement("p"),
						content = document.createTextNode("Loading."),
						dot = document.createTextNode("."),
						unableToPlay = true,
						playSelect = songOptions[ranNumG(6)];

					song.src = playSelect;

					// When the play button is clicked, waits till the song is playable then plays it. Until then a loading status is displayed.
					page.current.playButton.tag.addEventListener("click", async e => {
						song.load();

						// removes focus from radios.
						song1Select.blur();
						song2Select.blur();
						song3Select.blur();

					song.addEventListener("canplaythrough", e => {
						song.play();

						page.current.songChoose.tag.disabled = true;
						unableToPlay = false;
						node.remove();

						page.current.songPlaying.show();

						page.current.pauseButton.show({sec: 0, disp: "inline"});
						page.current.ffwdButton.show({sec: 0, disp: "inline"});
						page.current.playButton.hide({sec: 0});

					}, {once: true});


					node.append(content);
					page.current.songChoose.tag.after(node);
					node.style.display = "block";

					while (unableToPlay){
						node.append(dot);
						dot = document.createTextNode(`.`);
						await sleep(1);
					}
					}, {once:true});


					// Waits for the song to start playing before moving on.
					await (() => new Promise(resolve => song.addEventListener("playing", () => resolve(), {once: true})))();


				}

				// Waits for the play button to be clicked. And then queries the radio buttons to play a song.
				await (async () => {
					page.current.songChoose.tag.addEventListener("change", async () => {

						// Hides the previous iterations results and prompt.
						page.current.rating.hide();
						page.current.songPlayAgain.hide();

						// Display Play Button.
						player_buttons.style.display = "block";
						page.current.playButton.show({sec: 0});
						page.current.ffwdButton.hide({sec: 0});
						page.current.pauseButton.hide({sec: 0});

						if (song1Select.checked){
							songPlayer(songOptions1);
							return;
						}
						else if (song2Select.checked){
							songPlayer(songOptions2);
							return;
						}
						else if (song3Select.checked){
							songPlayer(songOptions3);
							return;
						}
						else{ // This will never be used. But is staying here jic. Feel free to delete.
							let node = document.createElement("p");
							let content = document.createTextNode("You have to pick something for them to play first!");
							node.append(content);
							node.style.display = "block";
							page.current.songChoose.tag.after(node);
							await sleep(3);
							node.remove();
							await songDebut();
						}
					}, {once: true})
				})()

			})();

				// Event Handlers for the player buttons.
				const pauseButtonListener = () => {
					song.pause();
					page.current.pauseButton.hide({sec: 0});
					page.current.playButton.show({sec: 0, disp: "inline"});
					}
				page.current.pauseButton.tag.addEventListener("click", pauseButtonListener);


				const playButtonListener = () => {
					song.play();
					song.playbackRate = 1;
					page.current.playButton.hide({sec: 0});
					page.current.pauseButton.show({sec: 0, disp: "inline"});
						}
				page.current.playButton.tag.addEventListener("click", playButtonListener);


				const ffwdButtonListener = () => {
					if (song.playbackRate === 4){
						song.playbackRate = 1;
					}
					else{
						song.playbackRate = 4;
						song.preservePitch = false;
					}
				}
				page.current.ffwdButton.tag.addEventListener("click", ffwdButtonListener);

				// uncheck all of the radios
				song1Select.checked = false;
				song2Select.checked = false;
				song3Select.checked = false;

				// Waits for the song to end before moving on.
				await new Promise((resolve) => {
					song.addEventListener("ended", async () => {

						//remove button listeners
						page.current.pauseButton.tag.removeEventListener("click", pauseButtonListener);
						page.current.playButton.tag.removeEventListener("click", playButtonListener);
						page.current.ffwdButton.tag.removeEventListener("click", ffwdButtonListener);

						page.current.songPlaying.hide(); 
						player_buttons.style.display = "none";

						resolve();
					}, {once: true});
				});
				await page.current.howGood.show();
				page.current.songRatingSlide.show();

				page.current.songRatingSlide.tag.after(page.current.helper.tag);
				page.current.helper.show();
				await listen4Enter();
				page.current.helper.hide();
				
				page.current.howGood.hide();
				page.current.songRatingSlide.hide();
				page.current.songRatingSlide.tag.blur();

				// Sets the money equal to the review
				money += parseFloat(page.current.songReviewSliderInput.tag.value);

				let node = document.createElement("p"),
						content = document.createTextNode(`+${page.current.songReviewSliderInput.tag.value}`);
				node.append(content);
				node.style.display = "block";
				page.current.songChoose.tag.after(node);
				await sleep(1);
				node.remove();

				// reset the slider
				page.current.songReviewSliderInput.tag.value = 5;

			} while (money < 20);

			await page.current.songChoose.hide();
			await page.current.pizzaFinally.show();
			await page.current.sneakInside.show();

			page.current.sneakInside.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();

			await page.current.pizzaFinally.hide();
			await page.current.sneakInside.hide();

			await page.current.slipInTheBack.show();
			await page.current.outback.show();
			await page.current.pizzaWait.show()

			for (let i=0; i<8; i++){
				let dot = document.createTextNode(`.`);
				page.current.pizzaWait.tag.append(dot);
				await sleep(1);
			}

			page.current.ninjaSneak.show();

			page.current.ninjaSneak.tag.after(page.current.helper.tag);
			page.current.helper.show();
			await listen4Enter();
			page.current.helper.hide();

			await page.current.ninjaSneak.hide();
			await page.current.slipInTheBack.hide();
			await page.current.outback.hide();
			await page.current.pizzaWait.hide();

			await page.current.YAY.show();
			await page.current.pizzaDance.show();
			await page.current.pizzaEnd.show({sec: 3});

			await page.current.pizzaEndButtons.show();

			pizza_playAgain.addEventListener("click", () => {
				window.open("page1.html", "_self");
			}, {once: true});

			print_this.addEventListener("click", () => {
				print();
			});

		})();

	},[]);

	//JSX
  return(
		<>
      <main className="flex-container main_container">
      <aside className="container"></aside>
      <article>
        <div className="phasedDisplay flex-container">
          <h1 id="pizza_story">They-a eat-a the pizza</h1>
          <p id="visit_pizza">So, <span className="duck_type bonus_egg">Duck</span> and <span className="friend_name bonus_egg"></span> decided to head into town to visit a pizza shop they had seen a few times.</p>
          <p id="helper">Hit &quot;Enter&quot; on your keyboard. 
						<span id="mobile_helper_screen"><input id="mobile_helper_input" type="text" name="mobile_helper" />Tap here to show keyboard</span></p>
          <p id="pizza_fantastic">It was called Pizza Fantastic. And it was truly the most fantastic pizza place they had ever seen.</p>
          <p id="scream">As soon as they walked in the door, a lady screamed!</p>
          <h3 id="karenWords1">AAAAAAAAAHHHHHHHHHHH!!!!!!!</h3>
          <h3 id="karenWords2">OHHH</h3>
          <h3 id="karenWords3">EMMM</h3>
          <h3 id="karenWords4">GEEEEE</h3>
          <h3 id="karenWords5">IT&apos;S A <span className="duck_type bonus_egg">DUCK</span> AND A <span id="friend_typeCaps" className="bonus_egg"></span>!!!!!!!!!!</h3>
          <h3 id="karenWords6">SHOOOO SHOOOO!!!!!!!!!!</h3>
          <p id="mrFantastic">The owner, Mr. Fantastic, came over.</p>
          <p id="sorry_guys">&quot;Sorry, guys&quot;, He said. &quot;I can only serve paying customers today.&quot;</p>
          <p id="leave"><span className="duck_type bonus_egg">Duck</span> and <span className="friend_name bonus_egg"></span> had to leave.</p>
          <p id="notFantastic">&quot;That wasn&apos;t very fantastic&quot;, said <span className="friend_name bonus_egg"></span>.</p>
          <p id="duck_nod"><span className="duck_type bonus_egg">Duck</span> nodded.</p>
          <p id="sneaky">&quot;But, I bet we could still get some pizza if we are sneaky.&quot; said <span className="duck_type bonus_egg">Duck</span>.</p>
          <p id="sneaky_how">&quot;How is that?&quot; asked <span className="friend_name bonus_egg"></span>.</p>
          <p id="start_band">&quot;We&apos;ll start a band! Then, when we play music people will pay us money and we can use that to buy pizza!&quot;, said <span className="duck_type bonus_egg">Duck</span>.</p>
          <p id="sounds_awesome">&quot;That sounds awesome!&quot;, said <span className="friend_name bonus_egg"></span>.</p>
          <p id="music_practice">So, they went and stole some music stuff and practiced real hard.</p>
          <p id="finally_ready">Finally, they felt like they were ready.</p>
          <p id="back_4_more">They went back to Pizza Fantastic and started playing one of the songs they had practiced.</p>
          <fieldset id="song_choose">
            <legend id="song_which">Which song should they play?</legend>
            <input id="song1Select" type="radio" name="song" defaultValue="song1" />
            <label htmlFor="song1Select">A Happy Song</label><br />
            <input id="song2Select" type="radio" name="song" defaultValue="song2" />
            <label htmlFor="song2Select">An Electric Song</label><br />
            <input id="song3Select" type="radio" name="song" defaultValue="song3" />
            <label htmlFor="song3Select">A Dancing Song</label><br />
          </fieldset>
          <p id="song_playing"><em>The song is playing.</em></p>
          <div id="player_buttons">
            <svg id="play_button" width="50" height="50"> 
              <path d="m0,0 l0,50 l50,-25 z" /> 
            </svg>
            <svg id="pause_button" width="50" height="50">
              <rect x="10" y="0" width="10" height="50" />
              <rect x="30" y="0" width="10" height="50" />
            </svg>
            <svg id="ffwd_button" width="60" height="50">
              <path d="m0,0 l0,50 l25,-17 l0,17 l30,-25 l-30,-25 l0,17 z" />
            </svg>
          </div>
          <p id="how_good">Did you like that song?</p>
          <div id="song_rating_slide">
            <span id="song_reallyBad">Boring!</span><input id="song_review" type="range" name="song_review" max="10" min="1" step="1" defaultValue="5" /><span id="song_reallyGood">Awesome!</span>
          </div>
          <p id="rating">That was a <span id="song_rating_display"></span> song! <span className="duck_type bonus_egg">Duck</span> and <span className="friend_name bonus_egg"></span> have made <span id="song_moneyEarned"></span>. They still need <span id="song_moneyNeeded"></span> so that they can buy a pizza at Pizza Fantastic!</p>
          <p id="song_playAgain">What should they play next?</p>
          <p id="pizza_finally">FINALLY!!! They had enough money to buy a pizza!</p>
          <p id="sneak_inside">&quot;Now we just have to find a way to sneak inside without getting caught by that scary screaming lady.&quot; said <span className="friend_name bonus_egg"></span>.</p>
          <p id="slip_in_the_back">&quot;Let&apos;s go around the back.&quot; said <span className="duck_type bonus_egg">Duck</span>.</p>
          <p id="outback">So, they went around the back.</p>
          <p id="pizza_wait">They waited</p>
          <p id="ninja_sneak">When Mr. Fantastic came outside to take out the trash, they slipped in the door behind him, grabbed a pizza, and left the cash on the counter.</p>
          <p id="YAY">YAYYY!!</p>
          <p id="pizza_dance"><span className="duck_type bonus_egg">Duck</span> and <span className="friend_name bonus_egg"></span> were so happy, they did a little dance in their pizza.</p>
          <p id="pizza_end">The End.</p>
          <div id="pizza_end_buttons">
            <button id="pizza_playAgain">Play again?</button>
            <button id="print_this">Print this page for memories.</button>
          </div>
        </div>
      </article>
      <aside className="container"></aside>
      </main>
      <SvgDuck props={{
        top:"10vh",
        bottom:"auto",
        left:"0",
        right:"auto"
      }}/>
		</>
  );
}

export default Pizza;
