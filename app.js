const minutesEl = document.querySelector(".timer__minutes");
const secondsEl = document.querySelector(".timer__seconds");
const timerToggleEl = document.getElementById("timer__toggle");
const startingMinutes = 25;
let countDownTime = startingMinutes * 60;
let timer = null;


minutesEl.textContent = startingMinutes < 10 ? "0" + startingMinutes : startingMinutes;
secondsEl.textContent = "00";



function startTimer() {
    let minutes = Math.floor(countDownTime / 60);
    let seconds = countDownTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (minutes === "00" && seconds === "00") {
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);
    }

    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    countDownTime !== 0 ? countDownTime-- : countDownTime;
}

function main() {
    timerToggleEl.addEventListener("click", function () {
        timerToggleEl.classList.toggle("running");
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        } else {
            timer = setInterval(startTimer, 1000);
        }

        timerToggleEl.innerHTML === "start" ?
        timerToggleEl.innerHTML = "stop":
        timerToggleEl.innerHTML = "start";
    });
}

main();