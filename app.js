const minutesEl = document.querySelector(".timer__minutes");
const secondsEl = document.querySelector(".timer__seconds");
const audioOnEl = document.querySelector(".fas.fa-volume-up");
const audioOffEl = document.querySelector(".fas.fa-volume-mute");
const timerToggleEl = document.getElementById("timer__toggle");

const startingMinutes = 25;
let countDownTime = startingMinutes * 60;
let timer = null;
let timeOverSound = new Audio("audio/bell.mp3");
let backgroundMusic = new Audio("audio/background-music.mp3");



function ringBell() {
    pauseBackgroundMusic();
    timeOverSound.play();
}

function playBackgroundMusic() {
    backgroundMusic.play();
    backgroundMusic.loop = true;
}

function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

function startTimer() {
    let minutes = Math.floor(countDownTime / 60);
    let seconds = countDownTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (minutes === "00" && seconds === "00") {
        ringBell();
        setTimeout(() => {
            window.location.reload(); 
        }, 3000);
    }

    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    countDownTime !== 0 ? countDownTime-- : countDownTime;
}

function main() {
    minutesEl.textContent = startingMinutes < 10 ? "0" + startingMinutes : startingMinutes;
    secondsEl.textContent = "00";

    timerToggleEl.addEventListener("click", function () {

        timerToggleEl.classList.toggle("running");
        if (timer !== null) {
            clearInterval(timer);
            pauseBackgroundMusic();
            timer = null;
        } else {
            timer = setInterval(startTimer, 1000);
            playBackgroundMusic();
        }

        timerToggleEl.innerHTML === "start" ?
        timerToggleEl.innerHTML = "stop":
        timerToggleEl.innerHTML = "start";
    });

    audioOnEl.addEventListener("click", function (e) {
        this.classList.toggle("play");
        audioOffEl.classList.toggle("play");
    });

    audioOffEl.addEventListener("click", function (e) {
        this.classList.toggle("play");
        audioOnEl.classList.toggle("play");
    });
}

main();