"use strict";
//fires after enter is hit
document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	if (keyName === "Enter") {
		storyStart();
	};
});


const storyStart = function storyStart(){
	//Colors the Duck based on the input.
	const phaseOne = new phase("div.storyStart"),
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
		
		// While this function is Technically producing some desired results,
		// it is not behaving 100% correctly yet. As the function iterates through 
		// the promises, there are selections to the DOM that are duplicates.
		// Thus, not all of the elements are selected even when storminess=100.
		//
		// Check the testing branch to see current attempts to fix this.
		// This bug is being shelved for a while.
		

		// remember that the arg is a range 1-100.
		const makeItRain = function letItRain(storminess) {
			const raindrops = 20;
			storminess = Math.floor(raindrops*(storminess/100));
			const rainArray = shuffle(makeArray(storminess));

			const rainfall = function rainFromASetRange(){
				const chosenDrop = shuffle(makeArray(raindrops));
				let rainCycle = rainArray.length;
				let rainSelector = document.querySelector(`#rain_${chosenDrop[rainArray[--rainCycle]]}`);
			       	rainSelector.style.display = "unset";
			       	rainSelector.style.opacity = 1;
			}

			new Promise((next) =>{
				if(storminess--){
					setTimeout(() => {
						next();
					}, 777);
				}
				else throw new Error("All done");
			})
			.then(() =>{
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
				return new Promise((next) => {
					if(storminess--){
						setTimeout(() => {
							next();
						}, 777);
					}
					else throw new Error("All done");
				});
			})
			.then(() => {
				rainfall();
			})
			.catch((e) => console.log(e));
		};
	makeItRain(100);
	});
});
