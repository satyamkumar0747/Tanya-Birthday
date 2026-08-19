// ===============================
// GET ELEMENTS
// ===============================

const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const birthdaySong = document.getElementById("birthdaySong");
const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");


// ==============================
// OPEN SURPRISE
// ==============================

openBtn.addEventListener("click", async () => {

    // 🎵 Start background music
    try {
        birthdaySong.currentTime = 70;
        birthdaySong.volume = 0.7;
        await birthdaySong.play();
        console.log("🎵 Birthday song started!");
    } catch (error) {
        console.error("❌ Music error:", error);
    }

    // 🎁 Open surprise
    document.getElementById("opening").classList.remove("active");
    document.getElementById("birthday").classList.add("active");

    // ❤️ Existing effects
    createConfetti();
    startHearts();
});


// ===============================
// MUSIC BUTTON
// ===============================

musicBtn.addEventListener("click", async () => {

    const song = document.getElementById("birthdaySong");

    if (song.paused) {

        try {
            await song.play();

            musicBtn.textContent = "🎵";
            musicBtn.classList.add("playing");

        } catch (error) {
            console.error("Music error:", error);
        }

    } else {

        song.pause();

        musicBtn.textContent = "🔇";
        musicBtn.classList.remove("playing");
    }
});


// ===============================
// GO TO SECTION
// ===============================

function goToSection(sectionId) {

    const section = document.getElementById(sectionId);

    section.scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// FINAL SURPRISE
// ===============================

finalBtn.addEventListener("click", () => {

    finalBtn.style.display = "none";

    finalMessage.classList.add("show");

    createConfetti();

    createHeartBurst();

});


// ===============================
// FLOATING HEARTS
// ===============================

function startHearts() {

    setInterval(() => {

        createHeart();

    }, 900);

}


function createHeart() {

    const container = document.querySelector(".hearts-container");

    const heart = document.createElement("div");

    heart.classList.add("heart");

    const hearts = ["❤️", "💕", "💗", "💖", "💓", "🌸"];

    heart.innerHTML =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 15 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 4 + 5 + "s";

    container.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 9000);

}


// ===============================
// CONFETTI
// ===============================

function createConfetti() {

    const colors = [
        "#ff6f9c",
        "#ffb3c6",
        "#ffd166",
        "#cdb4db",
        "#a2d2ff"
    ];


    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-10px";

        confetti.style.zIndex = "9999";

        confetti.style.borderRadius =
            Math.random() > 0.5 ? "50%" : "0";

        confetti.style.pointerEvents = "none";


        const duration =
            Math.random() * 3 + 3;


        confetti.animate(
            [
                {
                    transform:
                        `translateY(0) rotate(0deg)`
                },

                {
                    transform:
                        `translateY(110vh) rotate(720deg)`
                }
            ],
            {
                duration: duration * 1000,
                easing: "linear"
            }
        );


        document.body.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }

}


// ===============================
// HEART BURST
// ===============================

function createHeartBurst() {

    const container =
        document.querySelector(".hearts-container");


    for (let i = 0; i < 30; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";

        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.fontSize =
            Math.random() * 20 + 15 + "px";

        heart.style.zIndex = "9999";

        heart.style.pointerEvents = "none";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 300 + 100;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px, ${y}px) scale(1.5)`,
                    opacity: 0
                }
            ],
            {
                duration: 1800,
                easing: "cubic-bezier(.17,.67,.83,.67)"
            }
        );


        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1800);

    }

}


// ===============================
// PHOTO REVEAL ANIMATION
// ===============================

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


document.querySelectorAll(
    ".photo-card, .wish-card"
).forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "all 0.8s ease";

    observer.observe(card);

});