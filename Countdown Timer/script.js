window.onload = () => {
  document.querySelector("#start").onclick = calculate;
  document.querySelector("#reset").onclick = reset;
};

let interval; // make interval accessible globally

function calculate() {
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;

  const stop = document.querySelector("#stop");

  const endTime = new Date(date + " " + time);

  // Clear any existing interval before starting new
  clearInterval(interval);

  // Hide the timeout message when starting a new countdown
  document.getElementById("timeout-message").style.display = "none";

  interval = setInterval(() => calculateTime(endTime), 1000);

  stop.addEventListener("click", () => {
    clearInterval(interval);
    document.getElementById("timeout-message").style.display = "none";
  });
}

function calculateTime(endTime) {
  const currentTime = new Date();

  const days = document.querySelector("#countdown-days");
  const hours = document.querySelector("#countdown-hours");
  const minutes = document.querySelector("#countdown-minutes");
  const seconds = document.querySelector("#countdown-seconds");

  if (endTime > currentTime) {
    const timeLeft = (endTime - currentTime) / 1000;

    days.innerText = Math.floor(timeLeft / (24 * 60 * 60));
    hours.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
    minutes.innerText = Math.floor((timeLeft / 60) % 60);
    seconds.innerText = Math.floor(timeLeft % 60);
  } else {
    // Countdown complete
    clearInterval(interval); // stop the timer once complete
    days.innerText = 0;
    hours.innerText = 0;
    minutes.innerText = 0;
    seconds.innerText = 0;

    // Show "Time is up" message
    document.getElementById("timeout-message").style.display = "block";
  }
}

function reset() {
  document.querySelector("#countdown-days").innerText = 0;
  document.querySelector("#countdown-hours").innerText = 0;
  document.querySelector("#countdown-minutes").innerText = 0;
  document.querySelector("#countdown-seconds").innerText = 0;

  clearInterval(interval); // Stop any running interval
  document.getElementById("timeout-message").style.display = "none"; // Hide message
}
