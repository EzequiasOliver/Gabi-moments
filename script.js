const sunflower = document.getElementById("sunflower");
const music = document.getElementById("bgMusic");
const gardenField = document.getElementById("gardenField");

const modal = document.getElementById("memoryModal");
const modalImage = document.getElementById("memoryImage");
const modalCaption = document.getElementById("memoryCaption");
const memoryCard = document.getElementById("memoryCard");

const memories = [
    {
        foto: "imagem/foto1.jpg",
        texto: "uma imagem,várias memórias 🌻"
    },
    {
        foto: "imagem/foto2.jpg",
        texto: "Aquele dia foi especial ☀️"
    },
    {
        foto: "imagem/foto3.jpg",
        texto: "Ainda lembro dessa risada 💛"
    }
];

const positions = [
    { x: 70,  y: 235, scale: 0.55 },
    { x: 150, y: 205, scale: 0.70 },
    { x: 240, y: 225, scale: 0.60 },
    { x: 340, y: 185, scale: 0.90 },
    { x: 450, y: 215, scale: 0.75 },
    { x: 560, y: 170, scale: 1.00 },
    { x: 670, y: 205, scale: 0.82 },
    { x: 790, y: 190, scale: 0.95 },
    { x: 900, y: 225, scale: 0.70 },
    { x: 1020, y: 205, scale: 0.80 },
    { x: 1130, y: 235, scale: 0.60 }

];

let current = 0;
let planting = false;

sunflower.addEventListener("click", () => {

    if (planting) return;

    if (current >= memories.length) return;

    planting = true;

    if (music.paused) {
        music.play().catch(() => {});
    }

    sunflower.animate([
        { transform: "translateX(-50%) scale(1)" },
        { transform: "translateX(-50%) scale(1.15) rotate(6deg)" },
        { transform: "translateX(-50%) scale(1)" }
    ], {
        duration: 500
    });

    plantFlower(current);

    current++;

});

function plantFlower(index) {

    const flower = document.createElement("img");

    flower.src = "imagem/girassol.png";
    flower.className = "memoryFlower";

    const pos = positions[index];

flower.style.left = pos.x + "px";
flower.style.top = pos.y + "px";
flower.style.bottom = "auto";
flower.style.transform = `scale(${positions[index].scale})`;
flower.style.zIndex = Math.floor(positions[index].scale * 100);
flower.style.zIndex = Math.floor(pos.scale * 100);

    gardenField.appendChild(flower);

    // Cresce
    setTimeout(() => {

        flower.style.transition = "transform .5s ease";
        flower.style.transform = "translateX(-50%) scale(1)";

    }, 50);

    // Vai para o jardim
    setTimeout(() => {

        flower.style.transition =
            "left 1s ease, top 1s ease, transform 1s ease";

        flower.style.left = positions[index].x + "px";
        flower.style.top = positions[index].y + "px";
        flower.style.bottom = "auto";

        flower.style.transform =
            `scale(${positions[index].scale})`;

        flower.style.zIndex =
            Math.floor(positions[index].scale * 100);

        flower.dataset.photo = memories[index].foto;
flower.dataset.text = memories[index].texto;

// Abre automaticamente a lembrança
setTimeout(() => {

    showMemory(
        flower.dataset.photo,
        flower.dataset.text
    );

}, 1000);

// Permite rever a lembrança depois
flower.onclick = () => {

    showMemory(
        flower.dataset.photo,
        flower.dataset.text
    );

};

planting = false;
    }, 700);

}

function showMemory(photo, text) {

    modalImage.src = photo;
    modalCaption.textContent = text;

    modal.classList.add("show");

}

modal.addEventListener("click", () => {

    modal.classList.remove("show");

});

memoryCard.addEventListener("click", (e) => {

    e.stopPropagation();

});
const sparkle = document.createElement("div");
sparkle.className = "sparkle";

sparkle.style.left = (positions[index].x + 50) + "px";
sparkle.style.top = (positions[index].y + 40) + "px";

gardenField.appendChild(sparkle);

setTimeout(()=>{
    sparkle.remove();
},800);