let squares = document.querySelectorAll(".grid div");
let positionPlayerIndex = 107;
let fallTime = 700;
let score = 0;
const showScore = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

let stopButton = document.getElementById("stop");
let startButton = document.getElementById("start");

let meteroiden = [];

let positionBadAsteroidIndex = Math.round(Math.random() * 7);

//draw player
squares[positionPlayerIndex].classList.add("player");

// draw meteroid
meteroiden.forEach(meteroid => {
    squares[meteroid.positionMeteroidIndex].classList.add("meteroid");
});

function pushMeteroid() {
    meteroiden.push({ positionMeteroidIndex: Math.round(Math.random() * 7) });
}

// draw bad asteroid
setTimeout(function() {
    squares[positionBadAsteroidIndex].classList.add("badAsteroid");
}, 5000);


//stop button
stopButton.addEventListener("click", stopMeteroid);

// start button
startButton.addEventListener("click", startGame);

function startGame() {
    pushMeteroidInterval = setInterval(pushMeteroid, 3000);
    meteroidsInterval = setInterval(moveMeteroid, fallTime);
    badAsteroidInterval = setTimeout(function() {
        setInterval(badAsteroid, 1000);
    }, 3000);
}

//move player
function movePlayer(e) {
    squares[positionPlayerIndex].classList.remove("player");
    switch (e.keyCode) {
        case 37:
            if (positionPlayerIndex >= 105) {
                positionPlayerIndex -= 1;
            }
            break
        case 39:
            if (positionPlayerIndex <= 110) {
                positionPlayerIndex += 1;
            }
            break
    }
    squares[positionPlayerIndex].classList.add("player");
}
document.addEventListener("keydown", movePlayer);

//move meteroid
function moveMeteroid() {
    itemsToDelete = [];
    meteroiden.forEach(meteroid => {
        squares[meteroid.positionMeteroidIndex].classList.remove("meteroid");
        meteroid.positionMeteroidIndex += 8;
        squares[meteroid.positionMeteroidIndex].classList.add("meteroid");

        if (squares[meteroid.positionMeteroidIndex].classList.contains("player")) {
            score += 1;
            showScore.textContent = score;
            squares[meteroid.positionMeteroidIndex].classList.remove("meteroid");
            itemsToDelete.push(meteroid);

        } else if (squares[meteroid.positionMeteroidIndex].classList.contains("floor")) {
            stopMeteroid();
            showScore.textContent = score;
            gameOverText.textContent = "Game over!";
            squares[meteroid.positionMeteroidIndex].classList.remove("meteroid");
            meteroiden = [];
        }
    });

    itemsToDelete.forEach(item => {
        let index = meteroiden.indexOf(item);
        meteroiden.splice(index, 1);
    })

}

// bad Asteroid
function badAsteroid() {
    squares[positionBadAsteroidIndex].classList.remove("badAsteroid");
    positionBadAsteroidIndex += 8;
    squares[positionBadAsteroidIndex].classList.add("badAsteroid");

    if(squares[positionBadAsteroidIndex].classList.contains("floor")) {
        squares[positionBadAsteroidIndex].classList.remove("badAsteroid");
        positionBadAsteroidIndex = Math.round(Math.random() * 7);

    } else if (squares[positionBadAsteroidIndex].classList.contains("player")) {
        stopMeteroid();
        gameOverText.textContent = "Game over!";
        squares[positionBadAsteroidIndex].classList.remove("badAsteroid");
    }
}

function speed() {
    if (score > 0 && score % 3 == 0) {
        fallTime = fallTime - 100;
    }
}

// stop meteroids
function stopMeteroid() {
    clearInterval(meteroidsInterval);
    clearInterval(pushMeteroidInterval);
    clearInterval(badAsteroidInterval);
}

//collision with floor
let positionFloorIndexMin = 104;
let positionFloorIndexMax = 111;

for (let i = positionFloorIndexMin; i <= positionFloorIndexMax; i++) {
    squares[i].classList.add("floor");
}

speed();

// music
const music = new Audio('img/sound.ogg');
music.play();
music.loop = true;

