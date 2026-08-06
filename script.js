/*==================================================
    JARDIM DAS LEMBRANÇAS - V6
==================================================*/

/*==================================================
    ELEMENTOS
==================================================*/

const sunflower = document.getElementById("sunflower");
const gardenField = document.getElementById("gardenField");
const effects = document.getElementById("effects");

const music = document.getElementById("bgMusic");

const modal = document.getElementById("memoryModal");
const modalImage = document.getElementById("memoryImage");
const modalCaption = document.getElementById("memoryCaption");
const memoryCard = document.getElementById("memoryCard");

/*==================================================
    MEMÓRIAS
==================================================*/

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

/*==================================================
    POSIÇÕES DAS FLORES
==================================================*/

const positions = [

    {x:12,y:78,scale:.60},
    {x:22,y:70,scale:.72},
    {x:34,y:75,scale:.65},

    {x:46,y:64,scale:.90},
    {x:58,y:60,scale:1},
    {x:70,y:66,scale:.88},

    {x:80,y:73,scale:.70},
    {x:90,y:69,scale:.76},
    {x:97,y:78,scale:.60}

];

/*==================================================
    CONTROLE
==================================================*/

let currentMemory = 0;
let planting = false;

/*==================================================
    CLIQUE
==================================================*/

sunflower.addEventListener("click", () => {

    if(planting) return;

    if(currentMemory >= memories.length) return;

    planting = true;

    if(music.paused){

        music.volume = 0;

        music.play().catch(()=>{});

        fadeMusic();

    }

    sunflower.animate(

        [

            {
                transform:"translateX(-50%) scale(1)"
            },

            {
                transform:"translateX(-50%) scale(1.12) rotate(5deg)"
            },

            {
                transform:"translateX(-50%) scale(1)"
            }

        ],

        {

            duration:500,
            easing:"ease-out"

        }

    );

    createFlower();

});