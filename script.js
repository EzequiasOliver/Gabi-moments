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
/*==================================================
    PLANTAR GIRASSOL
==================================================*/

function plantFlower(){

    const memory = memories[currentMemory];
    const place = positions[currentMemory];

    const flower = document.createElement("img");

    flower.src = "imagem/girassol.png";
    flower.className = "memoryFlower";

    flower.style.left = place.left + "%";
    flower.style.bottom = place.bottom + "px";
    flower.style.transform =
        `translateX(-50%) scale(${place.scale})`;

    flower.style.zIndex =
        Math.round(place.scale * 100);

    gardenField.appendChild(flower);

    createSpark(place.left, place.bottom);

    flower.onclick = () => {

        showMemory(memory);

    };

    setTimeout(() => {

        showMemory(memory);

        planting = false;

        currentMemory++;

        if(currentMemory === memories.length){

            startPetals();

        }

    },700);

}

/*==================================================
    POLAROID
==================================================*/

function showMemory(memory){

    modalImage.src = memory.photo;

    modalCaption.textContent = memory.text;

    modal.classList.add("show");

}

modal.addEventListener("click",()=>{

    modal.classList.remove("show");

});

memoryCard.addEventListener("click",(e)=>{

    e.stopPropagation();

});

/*==================================================
    BRILHO
==================================================*/

function createSpark(left,bottom){

    const spark=document.createElement("div");

    spark.className="spark";

    spark.style.left=left+"%";

    spark.style.bottom=(bottom+40)+"px";

    effects.appendChild(spark);

    setTimeout(()=>{

        spark.remove();

    },800);

}

/*==================================================
    FLORES DECORATIVAS
==================================================*/

function createDecorations(){

    for(let i=0;i<120;i++){

        const flower=document.createElement("div");

        flower.className=
            Math.random()<0.5
            ? "smallFlower"
            : "pinkFlower";

        flower.style.left=
            Math.random()*100+"%";

        flower.style.bottom=
            (25+Math.random()*210)+"px";

        flower.style.opacity=
            .4+Math.random()*.6;

        flower.style.transform=
            `scale(${.6+Math.random()})`;

        decorations.appendChild(flower);

    }

}

createDecorations();

/*==================================================
    JOANINHA
==================================================*/

ladybug.onclick=()=>{

    ladybugModal.classList.add("show");

};

ladybugModal.onclick=()=>{

    ladybugModal.classList.remove("show");

};

ladybugCard.onclick=(e)=>{

    e.stopPropagation();

};

/*==================================================
    PÉTALAS
==================================================*/

let petalsStarted=false;

function startPetals(){

    if(petalsStarted) return;

    petalsStarted=true;

    const container=
        document.getElementById("petals");

    setInterval(()=>{

        const petal=
            document.createElement("div");

        petal.className="petal";

        petal.style.left=
            Math.random()*100+"vw";

        petal.style.top="-20px";

        petal.style.background=
            Math.random()<0.5
            ? "#FFD84A"
            : "#FFE98A";

        petal.style.width="10px";
        petal.style.height="16px";
        petal.style.borderRadius="50% 50% 50% 0";

        container.appendChild(petal);

        petal.animate(

        [

            {

                transform:
                "translateY(0) rotate(0deg)",

                opacity:1

            },

            {

                transform:
                `translate(${(Math.random()-0.5)*180}px,110vh)
                rotate(${720+Math.random()*360}deg)`,

                opacity:.2

            }

        ],

        {

            duration:
            7000+Math.random()*3000,

            easing:"linear"

        });

        setTimeout(()=>{

            petal.remove();

        },10000);

    },350);

}