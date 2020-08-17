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

function muteBackgroundMusic() {
    backgroundMusic.muted = true;
    timeOverSound.muted = true;
}

function unmuteBackgroundMusic() {
    backgroundMusic.muted = false;
    timeOverSound.muted = false;
}

function startTimer() {
    let minutes = Math.floor(countDownTime / 60);
    let seconds = countDownTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    countDownTime !== 0 ? countDownTime-- : countDownTime;
    document.title = "Pomodoro Timer - " + minutes + ":" + seconds;

    if (minutes === "00" && seconds === "00") {
        if (!backgroundMusic.muted) {
            ringBell();
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } else {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

}

function timerClicked() {
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

}

function main() {
    minutesEl.textContent = startingMinutes < 10 ? "0" + startingMinutes : startingMinutes;
    secondsEl.textContent = "00";

    timerToggleEl.addEventListener("click", timerClicked);

    audioOffEl.addEventListener("click", function (e) {
        this.classList.toggle("play");
        muteBackgroundMusic();
        audioOnEl.classList.toggle("play");
    });

    audioOnEl.addEventListener("click", function (e) {
        this.classList.toggle("play");
        unmuteBackgroundMusic();
        audioOffEl.classList.toggle("play");
    });

}

main();