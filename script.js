/*==================================================
        JARDIM DAS LEMBRANÇAS V7
==================================================*/

/*========================
ELEMENTOS
========================*/

const sunflower = document.getElementById("sunflower");
const gardenField = document.getElementById("gardenField");
const decorations = document.getElementById("decorations");
const effects = document.getElementById("effects");

const music = document.getElementById("bgMusic");

const modal = document.getElementById("memoryModal");
const modalImage = document.getElementById("memoryImage");
const modalCaption = document.getElementById("memoryCaption");
const memoryCard = document.getElementById("memoryCard");

const ladybug = document.getElementById("ladybug");
const ladybugModal = document.getElementById("ladybugModal");
const ladybugCard = document.getElementById("ladybugCard");

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
POSIÇÕES DAS FLORES
========================*/

/*
Estas posições foram escolhidas para:

✔ ficar sobre os morros
✔ não cobrir o girassol principal
✔ não cobrir a frase "Toque no girassol"
*/

const positions=[

{left:14,bottom:145,scale:.60},
{left:26,bottom:175,scale:.72},
{left:38,bottom:160,scale:.68},

{left:50,bottom:205,scale:.92},
{left:62,bottom:220,scale:1},
{left:74,bottom:195,scale:.86},

{left:84,bottom:165,scale:.70},
{left:93,bottom:150,scale:.62}

];

/*========================
CONTROLE
========================*/

let currentMemory=0;

let planting=false;

/*========================
MÚSICA
========================*/

function startMusic(){

    if(!music.paused) return;

    music.volume=0;

    music.play().catch(()=>{});

    const fade=setInterval(()=>{

        music.volume+=0.05;

        if(music.volume>=1){

            music.volume=1;

            clearInterval(fade);

        }

    },120);

}

/*========================
CLIQUE NO GIRASSOL
========================*/

sunflower.addEventListener("click",()=>{

    if(planting) return;

    if(currentMemory>=memories.length) return;

    planting=true;

    startMusic();

    sunflower.animate([

        {
            transform:"translateX(-50%) scale(1)"
        },

        {
            transform:"translateX(-50%) scale(1.12) rotate(4deg)"
        },

        {
            transform:"translateX(-50%) scale(1)"
        }

    ],{

        duration:500,

        easing:"ease-out"

    });

    plantFlower();

});