//Constants for buttons
const sleepBtn = document.querySelector("#action-sleep");
const feedBtn = document.querySelector("#action-feed");
const playBtn = document.querySelector("#action-play");
const cleanBtn = document.querySelector("#action-clean"); 
const cureBtn = document.querySelector("#action-cure");
const startBtn = document.querySelector("#action-menu-start-game");
const infoBtn = document.querySelector("#action-info")

//Constants for main bar
const sleepHp = document.querySelector("#sleep-hp");
const hungerHp = document.querySelector("#hunger-hp");
const playHp = document.querySelector("#play-hp");
const poopHp = document.querySelector("#poop-hp"); 
const healthHp = document.querySelector("#health-hp");

//
//Constants for body
const effectLeft = document.querySelector("#effect-left");
const effectRight = document.querySelector("#effect-right");
const handLeft = document.querySelector("#hand-left");
const handRight = document.querySelector("#hand-right");
const eyeLeft = document.querySelector("#eye-left");
const eyeRight = document.querySelector("#eye-right");
const mouth = document.querySelector("#mouth");
//
//Game settings
const maxSleep = 100;
const maxHunger = 100;
const maxPlay = 100;
const maxPoop = 100; 
const maxHealth = 100;
//Game speed
let day = 20;

//New object
function Tamagotchi() {
  this.sleep = maxSleep;
  this.hunger = maxHunger;
  this.play = maxPlay;
  this.poop = 0; 
  this.health = maxHealth
}

//Abilities
Tamagotchi.prototype.actionSleep = function() {
    this.sleep+=40 / (day * 2)
};

Tamagotchi.prototype.actionEat = function() {
	this.hunger+=120 / (day * 2)
};

Tamagotchi.prototype.actionPlay = function() {
	this.play+=80 / (day * 2)
};

Tamagotchi.prototype.actionClean = function () {
	this.poop = 0; 
};

Tamagotchi.prototype.actionCure = function () {
	this.health += 120 / (day * 2); 
};

Tamagotchi.prototype.tick = function() {
    this.sleep--;
    this.hunger-=3;
    this.play-=2;
	this.poop += 1; 
	this.health --;
};

let tmgch = new Tamagotchi();
let sleepHpCount;
let hungerHpCount;
let playHpCount;
let poopHpCount;
let healthHpCount;

//Controllers
sleepBtn.addEventListener("click", function() {
	tmgch.actionSleep();
});

feedBtn.addEventListener("click", function() {
	tmgch.actionEat();
});

playBtn.addEventListener("click", function() {
	tmgch.actionPlay();
});

cleanBtn.addEventListener("click", function () {
	tmgch.actionClean();
});

cureBtn.addEventListener("click", function () {
	tmgch.actionCure();
});

startBtn.addEventListener("click", function() {
	startGame();
});



//Togglers for buttons
document.querySelector(".game-screen").classList.toggle("hide");

function MainMenu() {
	document.querySelector(".main-menu-screen").classList.toggle("hide");
}


async function fetchRandomPetName() {
	try {
		const response = await fetch("http://localhost:8000/api/pets/");
		const data = await response.json();

		if (data.length > 0) {
			const randomIndex = Math.floor(Math.random() * data.length);
			const randomPetName = data[randomIndex].name;
			// infotxt = `Age : ${data[randomIndex].age} \n Gender : ${data[randomIndex].gender} \n Nationality : ${data[randomIndex].nationality} \n Personality: ${data[randomIndex].Personality} \n Species : ${data[randomIndex].species}`
			// console.log(infotxt)
			return randomPetName;
		} 
	} catch (error) {
		console.error("Error fetching random pet name and info", error);
		return "Tamagotchi"; 
	}
}

async function startGame() {
	localStorage.clear();
	document.querySelector(".game-screen").classList.toggle("hide");
	document.querySelector(".main-menu-screen").classList.toggle("hide");

	//Tamagotchi's name
	const randomPetName = await fetchRandomPetName();
	console.log(randomPetName)
	document.querySelector("#name").innerHTML = randomPetName;
	localStorage.setItem("petName",randomPetName) 
	return randomPetName
	}
		
async function displaypetInfo(){
	try{
		const response = await fetch("http://localhost:8000/api/pets/");
		const data = await response.json();
		const pname = localStorage.getItem("petName")
		if (data[0].name == pname ){
			infotxt = `--${data[0].name}-- \n Age : ${data[0].age} \n Gender : ${data[0].gender} \n Nationality : ${data[0].nationality} \n Personality: ${data[0].Personality} \n Species : ${data[0].species}`
			alert(infotxt)
		} else if (data[1].name == pname){
			infotxt = `--${data[1].name}-- \n Age : ${data[1].age} \n Gender : ${data[1].gender} \n Nationality : ${data[1].nationality} \n Personality: ${data[1].Personality} \n Species : ${data[1].species}`
			alert(infotxt)
		} else if (data[2].name == pname) {
			infotxt = `--${data[2].name}-- \n Age : ${data[2].age} \n Gender : ${data[2].gender} \n Nationality : ${data[2].nationality} \n Personality: ${data[2].Personality} \n Species : ${data[2].species}`
			alert(infotxt)
		}

	}catch(error){
		console.error(error)
	}
	


}

// add event listener for info button
infoBtn.addEventListener("click",function(){
	// displaypetInfo(randomPetName)
	// console.log(startGame())
	// displaypetInfo(startGame())
	displaypetInfo()


})


	//Start game
	// This function will be called at each interval which is 100 * day
	core();
	let coreUpdate = setInterval(core, 100 * day);

	//Main function of tamagotchi
	function core() {
		// the first part of the bracket is to calculate the percentage of the pet's attribute relative to max value
		// the second part .toFixed(2) is a method used to round the calculated percentage to two decimal places.
		sleepHpCount = (tmgch.sleep / maxSleep * 100).toFixed(2);
		hungerHpCount = (tmgch.hunger / maxHunger * 100).toFixed(2);
		playHpCount = (tmgch.play / maxPlay * 100).toFixed(2);
		poopHpCount = (tmgch.poop / maxPoop * 100).toFixed(2); 
		healthHpCount = (tmgch.health / maxHealth * 100).toFixed(2); 

		//Death sentence
		if ((playHpCount <= 0) || (sleepHpCount <= 0) || (hungerHpCount <= 0 || poopHpCount >= 100 || healthHpCount <= 0)) {
			playHpCount = 0;
			sleepHpCount = 0;
			hungerHpCount = 0;
			clearInterval(coreUpdate);
			alert('Your pet died ' + '\n ╭(x_x)╮');
		}

		//Max bar percentage 
		if (tmgch.sleep >= maxSleep) {
			tmgch.sleep = maxSleep ;
		}

		if (tmgch.hunger >= maxHunger) {
			tmgch.hunger = maxHunger;
		}

		if (tmgch.play >=  maxPlay) {
			tmgch.play = maxPlay;
		}

		//Max health percentage (for player)
		if ((tmgch.sleep / maxSleep * 100) > 100) {
			sleepHpCount = 100;
		}
		if ((tmgch.hunger / maxHunger * 100) > 100) {
			hungerHpCount = 100;
		}
		if ((tmgch.play / maxPlay * 100) > 100) {
			playHpCount = 100;
		}
		if ((tmgch.poop / maxPoop * 100) > 100) {
			poopHpCount = 100;
		}
		if ((tmgch.health / maxHealth * 100) > 100) {
			healthHpCount = 100;
		}

		//Show HP on screen
		sleepHp.innerHTML = sleepHpCount;
		hungerHp.innerHTML = hungerHpCount;
		playHp.innerHTML = playHpCount;
		poopHp.innerHTML = poopHpCount; 
		healthHp.innerHTML = healthHpCount;

		//Remove HP every tick
		tmgch.tick();


		//Thank you internet for the emoticon.
		//Hunger bar
		if (hungerHpCount <= 0) {
			mouth.innerHTML = "_";
		} else if (hungerHpCount < 20) {
			mouth.innerHTML = "0";
		} else if (hungerHpCount < 40) {
			mouth.innerHTML = "O";
		} else if (hungerHpCount < 60) {
			mouth.innerHTML = "o";
		} else if (hungerHpCount < 80) {
			mouth.innerHTML = "-";
		} else if (hungerHpCount > 80) {
			mouth.innerHTML = "▿";
		}

		//Sleep bar
		if (sleepHpCount <= 0) {
			eyeLeft.innerHTML = "x";
			eyeRight.innerHTML = "x";
		} else if (sleepHpCount < 20) {
			eyeLeft.innerHTML = "◡";
			eyeRight.innerHTML = "◡";
			mouth.innerHTML = ".";
		} else if (sleepHpCount < 40) {
			eyeLeft.innerHTML = " ´ ";
			eyeRight.innerHTML = " ` ";
		} else if (sleepHpCount < 60) {
			eyeLeft.innerHTML = "●";
			eyeRight.innerHTML = "●";
		} else if (sleepHpCount < 80) {
			eyeLeft.innerHTML = "・";
			eyeRight.innerHTML = "・";
		} else if (sleepHpCount > 80) {
			eyeLeft.innerHTML = "^";
			eyeRight.innerHTML = "^";
		}

		//Play bar
		if (playHpCount <= 0) {
			effectRight.innerHTML = "   ";
			effectLeft.innerHTML = "   ";
			handRight.innerHTML = "╮";
			handLeft.innerHTML = "╭";
		} else if (playHpCount < 40) {
			effectRight.innerHTML = "*  ";
			effectLeft.innerHTML = "   ";
			handRight.innerHTML = " ";
			handLeft.innerHTML = " ";
		} else if (playHpCount < 60) {
			effectLeft.innerHTML = "   ";
			effectRight.innerHTML = "   ";
			handRight.innerHTML = "╮";
			handLeft.innerHTML = "╭";
		} else if (playHpCount < 80) {
			effectLeft.innerHTML = "  ✧";
			effectRight.innerHTML = "✧  ";
			handRight.innerHTML = "╭";
			handLeft.innerHTML = "╮";
		} else if (playHpCount < 90) {
			effectLeft.innerHTML = " ˖✧";
			effectRight.innerHTML = "✧˖ ";
			handRight.innerHTML = "/";
			handLeft.innerHTML = "\\";
		} else if (playHpCount > 90) {
			effectLeft.innerHTML = "°˖✧";
			effectRight.innerHTML = "✧˖°";
			handRight.innerHTML = "◜";
			handLeft.innerHTML = "◝";
		}
	}




