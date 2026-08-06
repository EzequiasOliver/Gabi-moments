/*==================================================
    JARDIM DAS LEMBRANÇAS - V4
==================================================*/

/*========================
ELEMENTOS
========================*/

const sunflower = document.getElementById("sunflower");
const gardenField = document.getElementById("gardenField");

const music = document.getElementById("bgMusic");

const modal = document.getElementById("memoryModal");
const modalImage = document.getElementById("memoryImage");
const modalCaption = document.getElementById("memoryCaption");
const memoryCard = document.getElementById("memoryCard");

/*========================
MEMÓRIAS
========================*/

const memories = [

    {
        photo:"imagem/foto1.jpg",
        text:"Uma imagem, várias memórias. 🌻"
    },

    {
        photo:"imagem/foto2.jpg",
        text:"Aquele dia foi especial. ☀️"
    },

    {
        photo:"imagem/foto3.jpg",
        text:"Ainda lembro dessa risada. 💛"
    }

];

/*========================
CONTROLE
========================*/

let currentMemory = 0;

let planting = false;
/*========================
REGIÕES DOS MORROS
========================*/

const flowerAreas = [

    // Morro esquerdo
    {
        minX: 8,
        maxX: 28,
        minY: 62,
        maxY: 72,
        minScale: 0.65,
        maxScale: 0.80
    },

    // Morro central
    {
        minX: 32,
        maxX: 68,
        minY: 48,
        maxY: 63,
        minScale: 0.80,
        maxScale: 1.05
    },

    // Morro direito
    {
        minX: 72,
        maxX: 92,
        minY: 58,
        maxY: 72,
        minScale: 0.65,
        maxScale: 0.85
    }

];

/*========================
FUNÇÕES AUXILIARES
========================*/

function random(min, max){

    return Math.random() * (max - min) + min;

}

function randomArea(){

    const area = flowerAreas[
        Math.floor(Math.random() * flowerAreas.length)
    ];

    return{

        x: random(area.minX, area.maxX),

        y: random(area.minY, area.maxY),

        scale: random(area.minScale, area.maxScale)

    };

}
/*========================
CLIQUE NO GIRASSOL
========================*/

sunflower.addEventListener("click", () => {

    if (planting) return;

    if (currentMemory >= memories.length) return;

    planting = true;

    if (music.paused) {
        music.play().catch(() => {});
    }

    sunflower.animate(
        [
            { transform: "translateX(-50%) scale(1)" },
            { transform: "translateX(-50%) scale(1.12) rotate(5deg)" },
            { transform: "translateX(-50%) scale(1)" }
        ],
        {
            duration: 500,
            easing: "ease-out"
        }
    );

    plantFlower(memories[currentMemory]);

    currentMemory++;

});
/*========================
PLANTAR GIRASSOL
========================*/

function plantFlower(memory){

    const place = randomArea();

    const flower = document.createElement("img");

    flower.src = "imagem/girassol.png";

    flower.className = "memoryFlower";

    flower.style.left = place.x + "%";
    flower.style.top = place.y + "%";

    flower.style.transform =
        `translate(-50%,-100%) scale(${place.scale})`;

    flower.style.zIndex =
        Math.floor(place.scale * 100);

    gardenField.appendChild(flower);

    flower.animate(

        [
            {
                opacity:0,
                transform:`translate(-50%,-20%) scale(0)`
            },
            {
                opacity:1,
                transform:`translate(-50%,-100%) scale(${place.scale})`
            }
        ],

        {
            duration:700,
            easing:"ease-out"
        }

    );

    setTimeout(() => {

        showMemory(memory);

        planting = false;

    },700);

    flower.addEventListener("click", () => {

        showMemory(memory);

    });

}