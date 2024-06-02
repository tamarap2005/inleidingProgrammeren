// naamveld
// met hulp van demi
const nameInput = document.getElementById("nameInput");
const buttonNaam = document.getElementById("buttonNaam");
const uitlegElement = document.getElementById("naamInUitleg")

// progressbar monster
const progressBar = document.getElementById("leeg");
const koekjeKnop = document.getElementById("koekje");
const catapultKnop = document.getElementById("catapult");
const kanonKnop = document.getElementById("kanon");

const startKnop = document.getElementById("startKnop");

// progressbar boot
const getalVeld2 = document.getElementById("supplies");
const emmerWater = document.getElementById("emmerWater");

// gameover status aangeven
const pElement = document.getElementById("pElement");
const gameOverPlaatje = document.getElementById("#gameOver");

// audio
const kanon = new Audio("sounds/cannon.mp3");
const gameOverAudio = new Audio("sounds/rawr.mp3");

const progressBarImages = [
    "images/pb0.png",
    "images/pb1.png",
    "images/pb2.png",
    "images/pb3.png",
    "images/pb4.png",
    "images/pb5.png",
    "images/pb6.png",
    "images/pb7.png",
    "images/pb8.png",
    "images/pb9.png",
    "images/pb10.png",
    "images/pb11.png",
    "images/pb12.png"
]

const bootSuppliesImages = [
    "images/0supplies.png",
    "images/1supplies.png",
    "images/2supplies.png",
    "images/3supplies.png",
    "images/4supplies.png"
];

// naamveld
let userName;

// progress bar monster
let monsterHealth = 7;

// progress bar boot
let bootSupplies = 4;

let gameBegonnen = false;
let nameIngevuld = false;

let knoppenAan = true;

// naamveld
function naamIngevuld(){
    userName = nameInput.value;
    uitlegElement.textContent = userName;
    pElement.textContent = "Succes, " + userName
    nameIngevuld = true;
}

function startGame(){
    if(nameIngevuld == false){
        pElement.textContent = "Vul je naam in voordat je het spel begint!";
    } else {
        gameBegonnen = true; 

        monsterHealth = 7;
        bootSupplies = 4;

        updateMonsterProgressBar();
        updateBootProgressBar();
    }
}

function monsterHealthGrens(){
    if(monsterHealth > 12){
        monsterHealth = 12;
    } else if(monsterHealth < 0){
        monsterHealth = 0;
    }
}

function bootSuppliesGrens(){
    if(bootSupplies > 4){
        bootSupplies = 4;
    } else if(bootSupplies < 0){
        bootSupplies = 0;
    }
}

// progress bar monster
function verhoogProgressBarMonster(){
    if(gameBegonnen == true){
        monsterHealth++;
        monsterHealthGrens();

        if(monsterHealth == 12){
            pElement.textContent = "Game over...";
            gameBegonnen = false;
            gameOverAudio.play();
        }

        updateMonsterProgressBar();
    }
}

function verlaagProgressBarMonster(){
    if(gameBegonnen == true){
        monsterHealth--;
        monsterHealthGrens();

        if(monsterHealth == 0){
            pElement.textContent = "Je hebt gewonnen " + userName + "!";
            gameBegonnen = false;
        }

        updateMonsterProgressBar();
    }
}

function kanonSchot(){
    verlaagProgressBarMonster();
    verlaagProgressBarMonster();
}

function updateMonsterProgressBar(){
    progressBar.src = progressBarImages[monsterHealth];
}

function verlaagSupplies(){
    if(gameBegonnen == true && knoppenAan == true){
        bootSupplies--;
        bootSuppliesGrens();

        if(bootSupplies == 0){
            knoppenAan = false;
            // geschreven door bestieeeeeeee
            // set alle knoppen uit
            koekjeKnop.classList.add("disabled-image");
            kanonKnop.classList.add("disabled-image");
            catapultKnop.classList.add("disabled-image");
            emmerWater.classList.add("disabled-image");

            setTimeout(() => {
                knoppenAan = true;
                // set alle knoppen aan
                koekjeKnop.classList.remove("disabled-image");
                kanonKnop.classList.remove("disabled-image");
                catapultKnop.classList.remove("disabled-image");
                emmerWater.classList.remove("disabled-image");

            }, 5 * 1000);
        }
    }
}

function updateBootProgressBar(){
    getalVeld2.src = bootSuppliesImages[bootSupplies];
}

// verandering in de progressbar boot
setInterval(function(){
    if(gameBegonnen == true){
        bootSupplies++;
        bootSuppliesGrens();
        updateBootProgressBar();
    }
}, 3500);

// buttonNaam
buttonNaam.addEventListener('click', naamIngevuld);

startKnop.addEventListener('click', startGame);

// knoppen zorgen ervoor dat de progressbar monster werkt
koekjeKnop.addEventListener('click', verhoogProgressBarMonster);

catapultKnop.addEventListener('click', verlaagProgressBarMonster);
catapultKnop.addEventListener('click', verlaagSupplies);

// knoppen zorgen ervoor dat de progressbar bootsupplies werkt
emmerWater.addEventListener('click', verlaagSupplies);

kanonKnop.addEventListener('click', kanonSchot);
kanonKnop.addEventListener('click', verlaagSupplies);

// verhoog health van monster elke 2 seconden
setInterval(verhoogProgressBarMonster, 2000);