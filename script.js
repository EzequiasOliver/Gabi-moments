const sunflower = document.getElementById("sunflower");
const music = document.getElementById("bgMusic");

const memory = document.getElementById("memory");

let opened = false;

sunflower.addEventListener("click", () => {

    // Inicia a música
    if (music.paused) {
        music.play().catch(() => {});
    }

    // Animação do girassol
    sunflower.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.18) rotate(8deg)" },
        { transform: "scale(1)" }
    ], {
        duration: 500
    });

    // Mostra a primeira lembrança
    if (!opened) {

        opened = true;

        setTimeout(() => {
            memory.classList.add("show");
        }, 300);

    }

});