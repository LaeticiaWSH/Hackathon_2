//variable for buttons
const sleepBtn = document.querySelector("#action-sleep");
const feedBtn = document.querySelector("#action-feed");
const playBtn = document.querySelector("#action-play");
const cleanBtn = document.querySelector("#action-clean"); 
const cureBtn = document.querySelector("#action-cure");
const startBtn = document.querySelector("#action-menu-start-game");
const infoBtn = document.querySelector("#action-info")

//variable for main bar
const sleepHp = document.querySelector("#sleep-hp");
const hungerHp = document.querySelector("#hunger-hp");
const playHp = document.querySelector("#play-hp");
const poopHp = document.querySelector("#poop-hp"); 
const healthHp = document.querySelector("#health-hp");

//
//variable for body
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
// the larger the number the slower the speed
let day = 25;

// class Tama() {
// 	 tick() {

// 	}
// }

// new_tama = Tama();
//New object
class Tamagotchi{
  constructor(){
  this.sleep = maxSleep;
  this.hunger = maxHunger;
  this.play = maxPlay;
  this.poop = 0; 
  this.health = maxHealth
}

//Abilities
actionSleep() {
    this.sleep+= 4 
};

actionEat() {
	this.hunger+=12 
};

actionPlay() {
	this.play+= 12  
};

//The poop will built up so when click on clean button it becomes 0 directly it doesn't decrease
actionClean() {
	this.poop = 0; 
};

actionCure() {
	this.health += 30 
};
 //this will be displayed on screen the percentage decreasing
tick() {
    this.sleep--;
    this.hunger-=3;
    this.play-=2;
	this.poop += 1; 
	this.health --;
	console.log("Ticked!")
};

}


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
	// playGame()
});

cleanBtn.addEventListener("click", function () {
	tmgch.actionClean();
});

cureBtn.addEventListener("click", function () {
	tmgch.actionCure();
});

startBtn.addEventListener("click", function() {
	startGame();
	update()

});


// Togglers for buttons
document.querySelector(".game-screen").classList.toggle("hide");
document.querySelector(".play_screen").classList.toggle("hide");

// function playGame() {
// 	document.querySelector(".game-screen").classList.toggle("hide");
// 	document.querySelector(".play_screen").classList.toggle("hide");
// }


async function fetchRandomPetName() {
	try {
		const response = await fetch("http://localhost:8000/api/pets/");
		const data = await response.json();

		if (data.length > 0) {
			const randomIndex = Math.floor(Math.random() * data.length);
			const randomPetName = data[randomIndex].name;
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
	document.querySelector("#name").innerText = randomPetName;
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
	displaypetInfo()
})

let coreUpdate;
//Start game
// This function will be called at each interval which is 100 * day
// core();
function update(){
 	coreUpdate = setInterval(core, 1000);
 	let tickUpdate = setInterval(tmgch.tick, 100 * day)
 	core()


// tmgch.tick()
}
	//Main function of tamagotchi
function core() {
	
		console.log(tmgch)
		// the first part of the bracket is to calculate the percentage of the pet's attribute relative to max value
		// the second part .toFixed(2) is a method used to round the calculated percentage to two decimal places.
		sleepHpCount = (tmgch.sleep / maxSleep * 100).toFixed(2);
		hungerHpCount = (tmgch.hunger / maxHunger * 100).toFixed(2);
		playHpCount = (tmgch.play / maxPlay * 100).toFixed(2);
		poopHpCount = (tmgch.poop / maxPoop * 100).toFixed(2); 
		healthHpCount = (tmgch.health / maxHealth * 100).toFixed(2); 
		
		//Death sentence
		if ((playHpCount < 0) || (sleepHpCount < 0) || (hungerHpCount < 0 || poopHpCount > 100 || healthHpCount < 0)) {
			playHpCount = 0;
			sleepHpCount = 0;
			hungerHpCount = 0;
			poopHpCount = 0;
			healthHpCount = 0;
			
			alert('Your pet died ' + '\n ╭(x_x)╮');
			clearInterval(coreUpdate);
		}

		//maximum limit set
		if (tmgch.sleep > 100) {
			tmgch.sleep = 100;
			sleepHpCount = 100;
		}

		if (tmgch.hunger > 100) {
			tmgch.hunger = 100;
			hungerHpCount =  100;
		}

		if (tmgch.play >  100) {
			tmgch.play = 100;
			playHpCount = 100
		}
		if (tmgch.poop > 100) {
			tmgch.poop = 100;
			poopHpCount = 100;
		}
		if (tmgch.health > 100) {
			tmgch.health = 100;
			healthHpCount = 100;
		}

		//Show HP on screen
		sleepHp.innerText = sleepHpCount;
		hungerHp.innerText = hungerHpCount;
		playHp.innerText = playHpCount;
		poopHp.innerText = poopHpCount; 
		healthHp.innerText = healthHpCount;

		console.log("Core Update")
		tmgch.tick()

		//Thank you internet for the emoticon.
		//Hunger bar
		if (hungerHpCount <= 0) {
			mouth.innerText = "_";
		} else if (hungerHpCount < 20) {
			mouth.innerText = "0";
		} else if (hungerHpCount < 40) {
			mouth.innerText = "O";
		} else if (hungerHpCount < 60) {
			mouth.innerText = "o";
		} else if (hungerHpCount < 80) {
			mouth.innerText = "-";
		} else if (hungerHpCount > 80) {
			mouth.innerText = "▿";
		}

		//Sleep bar
		if (sleepHpCount <= 0) {
			eyeLeft.innerText = "x";
			eyeRight.innerText = "x";
		} else if (sleepHpCount < 20) {
			eyeLeft.innerText = "◡";
			eyeRight.innerText = "◡";
			mouth.innerText = ".";
		} else if (sleepHpCount < 40) {
			eyeLeft.innerText = " ´ ";
			eyeRight.innerText = " ` ";
		} else if (sleepHpCount < 60) {
			eyeLeft.innerText = "●";
			eyeRight.innerText = "●";
		} else if (sleepHpCount < 80) {
			eyeLeft.innerText = "・";
			eyeRight.innerText = "・";
		} else if (sleepHpCount > 80) {
			eyeLeft.innerText = "^";
			eyeRight.innerText = "^";
		}

		//Play bar
		if (playHpCount <= 0) {
			effectRight.innerText = "   ";
			effectLeft.innerText = "   ";
			handRight.innerText = "╮";
			handLeft.innerText = "╭";
		} else if (playHpCount < 40) {
			effectRight.innerText = "*  ";
			effectLeft.innerText = "   ";
			handRight.innerText = " ";
			handLeft.innerText = " ";
		} else if (playHpCount < 60) {
			effectLeft.innerText = "   ";
			effectRight.innerText = "   ";
			handRight.innerText = "╮";
			handLeft.innerText = "╭";
		} else if (playHpCount < 80) {
			effectLeft.innerText = "  ♥";
			effectRight.innerText = "♥  ";
			handRight.innerText = "╭";
			handLeft.innerText = "╮";
		} else if (playHpCount < 90) {
			effectLeft.innerText = " ˖✧";
			effectRight.innerText = "✧˖ ";
			handRight.innerText = "/";
			handLeft.innerText = "\\";
		} else if (playHpCount > 90) {
			effectLeft.innerText = "°˖✧";
			effectRight.innerText = "✧˖°";
			handRight.innerText = "◜";
			handLeft.innerText = "◝";
		}

		//poop bar 
	if (poopHpCount > 50){
		eyeLeft.innerText = "ㆆ";
		eyeRight.innerText = "ㆆ";
	}
	if (poopHpCount > 90){
		eyeLeft.innerText = "°";
		eyeRight.innerText = "o";
	}
	// health bar 

	if (healthHpCount < 30){
		mouth.innerText ="︵"
	}
	}




