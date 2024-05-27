let naamVeld = document.querySelector("#naamveld");
let naam = "demi"

let zeeMonster = document.querySelector("#monster");
let wapens = document.querySelector("#wapens");

let roar = new Audio("sounds/rawr.mp3")
let kanon = new Audio("sounds/cannon.mp3")

let getal = 0
let mysteryNumber = Math.random() * 5
let barStatus = true
mysteryNumber = Math.round(mysteryNumber)

console.log(mysteryNumber)

const pElement = document.querySelector("#pElement")
const getalVeld = document.querySelector("#leeg")
const plusKnop1 = document.querySelector("#plus1")
const minKnop1 = document.querySelector("#wapen1")
const minKnop2 = document.querySelector("#wapen2")
const gameOver = document.querySelector("#gameOver")

function groet(naam){
    console.log("groet persoon");
    naamVeld.textContent = naam;
}

function verhoogGetal(){
    getal += 1
    updateGetal();
}

function verlaagGetal(){
    getal -= 1
    updateGetal();
}

function kanonSchot(){
    getal -=2
    kanon.play()
    updateGetal();
}

function updateGetal() {
    console.log("getal: " + getal);
    getalVeld.textContent = getal;
}

function controleerGetal(){
    if(getal == 5){
        getalVeld.src = "images/vol.png";
        gameOver.src = "images/vol.png";
        barStatus = true
        console.log("Goed geraden!")
    } else if(getal == 4){
        getalVeld.src = "images/minvol.png";
        barStatus = true
        console.log("Helaas dat is te hoog")
        pElement.textContent = "Lekker bezig!"
    } else if(getal == 3){
        getalVeld.src = "images/halfvol.png";
        barStatus = true
        console.log("helaas, dat is te laag")
        pElement.textContent = "Je hebt hem bijna, nog even doorzetten!"
    } else if(getal == 2){
        roar.play()
       getalVeld.src = "images/minleeg.png";
       barStatus = true
       console.log("helaas, dat is te laag")
    } else if(getal == 1){
        getalVeld.src = "images/minleeg2.png";
        barStatus = true
        console.log("helaas, dat is te laag")
        pElement.textContent = "Je hebt hem bijna, nog even doorzetten!"
    } else if(getal == 0){
        getalVeld.src = "images/leeg.png";
        barStatus = true

        console.log("helaas, dat is te laag")
    }
}

setInterval(controleerGetal, 200)
setInterval(function(){if (barStatus == true){
    getal--;
    updateGetal();
}}, 2000 )

groet("demi");
verhoogGetal()
verlaagGetal()

plusKnop1.addEventListener('click', verhoogGetal)
minKnop1.addEventListener('click', verlaagGetal)
minKnop2.addEventListener('click', kanonSchot)
