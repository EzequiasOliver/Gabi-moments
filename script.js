/*==================================================
    JARDIM DAS LEMBRANÇAS - V4
==================================================*/

/*========================
ELEMENTOS
========================*/
const effects = document.getElementById("effects");
const touchText = document.querySelector(".touch");
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

const positions = [

    // Morro esquerdo
    { x: 12, y: 70, scale: 0.65 },
    { x: 20, y: 64, scale: 0.75 },
    { x: 28, y: 68, scale: 0.68 },

    // Morro central
    { x: 38, y: 60, scale: 0.85 },
    { x: 50, y: 54, scale: 1.00 },
    { x: 62, y: 60, scale: 0.85 },

    // Morro direito
    { x: 72, y: 68, scale: 0.72 },
    { x: 82, y: 62, scale: 0.82 },
    { x: 92, y: 70, scale: 0.68 }

    
];

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

    const memory = memories[currentMemory];

plantFlower(memory);

currentMemory++;

});
/*========================
PLANTAR GIRASSOL
========================*/

function plantFlower(memory){

    const place = positions[currentMemory];
if (!place) {
    planting = false;
    return;
}

    const flower = document.createElement("img");

    flower.src = "imagem/girassol.png";

    flower.className = "memoryFlower";

    flower.style.left = place.x + "%";
flower.style.top = place.y + "%";

flower.style.transform =
    `translate(-50%, -100%) scale(${place.scale})`;

flower.style.zIndex = Math.round(place.scale * 100);
    gardenField.appendChild(flower);
createSpark(place);

    flower.animate(

        [
            {
                opacity:0,
                transform:`translate(-50%,0%) scale(0)`
            },
            {
                opacity:1,
                transform:`translate(-50%,-100%) scale(${place.scale})`
            }
        ],

        {
            duration:700,
            easing:"ease-out",
fill:"forwards"
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
/*========================
ABRIR LEMBRANÇA
========================*/

function showMemory(memory){

    modalImage.src = memory.photo;

    modalCaption.textContent = memory.text;

    modal.classList.add("show");

}

/*========================
FECHAR MODAL
========================*/

modal.addEventListener("click", () => {

    modal.classList.remove("show");

});

memoryCard.addEventListener("click", (event) => {

    event.stopPropagation();

});
/*========================
BRILHO
========================*/

function createSpark(place){

    const effects = document.getElementById("effects");

    const spark = document.createElement("div");

    spark.className = "spark";

    spark.style.left = place.x + "%";
    spark.style.top = place.y + "%";

    effects.appendChild(spark);

    setTimeout(() => {

        spark.remove();

    },800);

}