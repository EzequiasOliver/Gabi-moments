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