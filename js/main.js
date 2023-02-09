"use strict";
//fires after enter is hit
document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	if (keyName === "Enter") {
		storyStart();
	};
});


const storyStart = function storyStart(){
	const phaseOne = new phase("div.storyStart"),
	//Colors the Duck based on the input.
	colorizeDuck = function saveDuckColorToObject() {
		page.duckInput.style.backgroundColor = page.duckInput.value;
		duck.color = page.duckInput.value;
		//saves input to memory.
		return duck.color;
		}
	phaseOne.tag.innerHTML = `<p class="storyStart">Hmmmmm.... </p>`;
	phaseOne.fn();
	colorizeDuck();
	// verifies the input.
	page.duckInput.addEventListener("transitionend", () => {
			page.duckInput.disabled = true;
			phaseOne.tag.innerHTML = `<p class="storyStart">Ah, yes. It was definitely a ${duck.color} duck.</p>`;
			phaseOne.fn();
	});
}


page.duckInput.addEventListener("transitionend", () => {
	const phaseTwo = new phase("div.phaseTwo");
	let eyes = [document.querySelector("pre#phTwo_pt2"), document.querySelector("pre#phTwo_pt3")]
	page.body.style.backgroundColor = "#888"
	setTimeout(() => {
		phaseTwo.fn();
		for (let i of eyes)
			i.style.visibility = "collapse";
	for (let i of page.container)
	i.style.flex = 1;
	}, 1000);
	page.container[0].addEventListener("transitionrun", () => {
		eyes[0].style.visibility = "unset";
		eyes[0].style.fontSize = "30pt";
		setTimeout(() => {
		eyes[0].style.visibility = "collapse";
		}, 3000);
		setTimeout(() => {
			eyes[1].style.visibility = "unset";
			eyes[1].style.fontSize = "30pt";
		}, 3000);
		setTimeout(() => {
		eyes[1].style.visibility = "collapse";
		}, 6000);
		

		const makeItRain = function letItRain() {
			const rainArray = [],
			ranListGen = function randomListGenerator() {
				let ranNum = ranNumG(9) + 1;
				const raindrops = 10;
				while (rainArray.length < raindrops) {
					if (rainArray.some((match) => match === ranNum))
						ranNum = ranNumG(9) + 1;
					else 
						rainArray.push(ranNum);
				}
			}
			ranListGen();
			for (let i of rainArray){
				setTimeout(() => {
					let rainSelector = document.querySelector(`#rain_${i}`);
					rainSelector.style.display = "unset";
					rainSelector.style.opacity = 1;
				}, rainArray[i/3] * 1000)
			}
		};
		makeItRain();
	});
});



// ALRIGHT screw the random number generator just use this:
// const rainOrder = [5,9,7,2,4,1,6,10,8,3]
// have the makeItRain function iterate through this array after a one second delay on each item.
// If you really want to you can look at how to generate a unique array with no repeating numbers again.
//
// You are getting hung up on this promise await statement stuff though.
// generate a workable list and THEN iterate through it.
// stop trying to generate the list AS you iterate through it.
//
// This was, still, a lot of fun.
// 



// OLD PLAN BELOW
//		const repeats = [];
//		let ranNum = randomNum(9) + 1;
//		const rainDrops = 10;
//		const rainRep = function raindropRepeaterFn(rainfall){
//			console.log(repeats);
//				if (repeats.some((e) => {e === ranNum})){
//					ranNum = randomNum(9) + 1;
//					rainRep();
//					}
//				else {
//					const ranRain = document.querySelector(`#rain_${ranNum}`);
//					ranRain.style.display = "unset";
//					ranRain.style.opacity = 1;
//					rainfall(ranNum);
//				}
//		}
//		const promRep = function promiseMeAgain(){
//			const rainWillFall = new Promise((rainfall) => {
//				setTimeout(() => {rainRep(rainfall)}, 1000);
//			})
//			rainWillFall.then((passedValue) => {
//				repeats.push(passedValue);
//				while (repeats.length < rainDrops){
//					ranNum = randomNum(9) + 1;
//					promRep();
//				};
//			});
//		}
//		promRep();



//	phaseTwo.timeout();
//	const phaseThree = new phase("phaseThree", "div", 8000);
//	phaseThree.timeout();
//	duck.illust.style.color = duck.color;
//	for (let i of duck.water){
//	i.style.color = "blue";
//	}
