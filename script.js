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