const sunflower = document.getElementById("sunflower");
const music = document.getElementById("bgMusic");

sunflower.addEventListener("click", () => {

    if (music.paused) {
        music.play().catch(() => {});
    }

    sunflower.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.18) rotate(8deg)" },
        { transform: "scale(1)" }
    ], {
        duration: 500
    });

});