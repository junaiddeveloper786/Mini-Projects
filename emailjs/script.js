// Initialize EmailJS
(function () {
  emailjs.init("7vOXpNpk5E8SaRhTF");
})();

// Select DOM elements
const contactForm = document.getElementById("contact-form");
const loader = document.querySelector(".loader");
const charCount = document.querySelector(".char-count");
const submitBtn = document.querySelector(".btn-submit");
const responseBox = document.getElementById("response-message");
const messageInput = contactForm.message;

// Character Counter with localStorage
messageInput.addEventListener("input", () => {
  const messageLength = messageInput.value.length;
  charCount.textContent = `Characters: ${messageLength}/500`;
  localStorage.setItem("message", messageInput.value);
});

// Start and Stop live timer
let liveTimerInterval;
function startLiveTimer() {
  let seconds = 0;
  liveTimerInterval = setInterval(() => {
    console.log(`⏳ ${++seconds} seconds passed...`);
  }, 1000);
}
function stopLiveTimer() {
  clearInterval(liveTimerInterval);
  console.log("✅ Live timer stopped.");
}

// Loader countdown and email send trigger
function showLoaderWithCountdown(callback) {
  let countdown = 3;
  loader.innerHTML = `<i class="lni lni-spinner-solid"></i><br/><span style="color: #fff; font-size: 18px;">Sending in ${countdown}...</span>`;
  loader.classList.add("show");
  submitBtn.style.display = "none";

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      loader.innerHTML = `<i class="lni lni-spinner-solid"></i><br/><span style="color: #fff; font-size: 18px;">Sending in ${countdown}...</span>`;
    } else if (countdown === 0) {
      clearInterval(countdownInterval);
      callback();
    }
  }, 1000);

  // Auto-hide fallback after 5s
  setTimeout(() => {
    loader.classList.remove("show");
    console.warn("⏳ Auto-hiding loader after 5 seconds.");
    submitBtn.style.display = "block";
  }, 5000);
}

// Hide loader utility
function hideLoader() {
  loader.classList.remove("show");
  loader.innerHTML = `<i class="lni lni-spinner-solid"></i>`;
}

// Form validation
function validateForm() {
  const email = contactForm.email.value.trim();
  const name = contactForm.name.value.trim();
  const message = contactForm.message.value.trim();

  if (!email || !name || !message) {
    alert("Please fill in all fields.");
    return false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (message.length < 10) {
    alert("Message should be at least 10 characters long.");
    return false;
  }

  return true;
}

// Confetti celebration
function celebrationEffect() {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.0/dist/confetti.browser.min.js";
  document.body.appendChild(script);
  script.onload = function () {
    confetti();
  };
}

// Digital clock interval
let digitalClockInterval;

// Start digital clock function
function startDigitalClock() {
  digitalClockInterval = setInterval(() => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    const timeString = `${hour12}:${minutes}:${seconds} ${ampm}`;
    const dateString = `${day}/${month}/${year}`;

    const clockDiv = document.getElementById("live-clock");
    if (clockDiv) {
      clockDiv.innerHTML = `<br/><strong>${dateString}</strong> | <strong>${timeString}</strong>`;
    }
  }, 1000);
}

// Stop digital clock function
function stopDigitalClock() {
  clearInterval(digitalClockInterval);
}

// Form Submit event
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const isConfirmed = confirm("Do you really want to send this message?");
  if (!isConfirmed) {
    alert("Submission canceled by user.");
    return;
  }

  // Random code generation and verify
  const chars =
    "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz!@#$%&*?";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const userInput = prompt(`Enter this code to proceed: ${code}`);
  if (userInput !== code) {
    alert("Code mismatch. Message not sent.");
    return;
  }

  // All set — start loader and send email
  showLoaderWithCountdown(() => {
    startLiveTimer();

    emailjs.sendForm("service_hmogkn6", "template_rrw8cnh", contactForm).then(
      function () {
        hideLoader();
        stopLiveTimer();

        const now = new Date();
        const day = now.getDate().toString().padStart(2, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const hour12 = hours % 12 || 12;

        const dateString = `${day}/${month}/${year}`;
        const timeString = `${hour12}:${minutes} ${ampm}`;

        let greeting = "";
        if (hours < 12) {
          greeting = "Good Morning";
        } else if (hours < 18) {
          greeting = "Good Afternoon";
        } else {
          greeting = "Good Evening";
        }

        const userName = contactForm.name.value || "User";

        // Hide form
        contactForm.style.display = "none";

        // Show message in #response-message
        responseBox.innerHTML = `
          <span class='success-msg' style="
            display: inline-block;
            background: #d4edda;
            color: #155724;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            max-width: 90%;
            margin: 0 auto;
          ">
            ✅ Email Sent Successfully!<br/>
            ${greeting} <strong>${userName}</strong>, thank you for contacting us.<br/>
            Date: <strong>${dateString}</strong><br/>
            Time: <strong>${timeString}</strong><br/>
            We will connect with you very soon! 😊<br/><br/>
            <div id="live-clock" style="margin:8px 0; font-size:16px;"></div>
            <button id="ok-btn" style="
              padding:8px 16px;
              background:#ff5252;
              color:#fff;
              border:none;
              border-radius:5px;
              cursor:pointer;
              margin-top:10px;
              font-size: 16px;
              letter-spacing: 0.5px;
            ">OK</button>
          </span>
        `;
        responseBox.style.display = "block";

        celebrationEffect();
        alert("Your message has been sent!");
        console.log("📧 SUCCESS!");
        contactForm.reset();

        startDigitalClock();

        document.getElementById("ok-btn").addEventListener("click", () => {
          responseBox.style.display = "none";
          contactForm.style.display = "block";
          stopDigitalClock();
        });
      },
      function (error) {
        hideLoader();
        stopLiveTimer();

        responseBox.innerHTML =
          "<span class='error-msg' style='color:red;'>❌ Failed to send Email!</span>";
        responseBox.style.display = "block";
        contactForm.style.display = "none";

        setTimeout(() => {
          responseBox.style.display = "none";
          contactForm.style.display = "block";
          submitBtn.style.display = "block";
        }, 3000);

        alert("Failed to send message.");
        console.error("❌ ERROR:", error);
      }
    );
  });
});
