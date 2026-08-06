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
flower.style.opacity = "1";

flower.style.transform =
    `translate(-50%,-100%) scale(${place.scale})`;

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

});/*==================================================
    CRIAR FLOR
==================================================*/

function createFlower(){

    const memory = memories[currentMemory];
    const place = positions[currentMemory];

    const flower = document.createElement("img");

    flower.src = "imagem/girassol.png";
    flower.className = "memoryFlower";

    flower.style.left = place.x + "%";
    flower.style.top = place.y + "%";

    flower.style.transform =
        `translate(-50%,-100%) scale(0)`;

    flower.style.opacity = "0";

    flower.style.zIndex =
        Math.round(place.scale * 100);

    gardenField.appendChild(flower);

    flower.animate(

        [

            {
                transform:`translate(-50%,0%) scale(0)`,
                opacity:0
            },

            {
                transform:`translate(-50%,-110%) scale(${place.scale*1.08})`,
                opacity:1
            },

            {
                transform:`translate(-50%,-100%) scale(${place.scale})`,
                opacity:1
            }

        ],

        {
            duration:800,
            easing:"ease-out",
            fill:"forwards"
        }

    );

    setTimeout(()=>{

        createSpark(place.x,place.y);

        showMemory(memory);

        flower.onclick=()=>{

            showMemory(memory);

        };

        currentMemory++;

        planting=false;

        if(currentMemory===memories.length){

            setTimeout(startPetals,1500);

        }

    },850);

}

/*==================================================
    BRILHO
==================================================*/

function createSpark(x,y){

    const spark=document.createElement("div");

    spark.className="spark";

    spark.style.left=x+"%";
    spark.style.top=y+"%";

    effects.appendChild(spark);

    setTimeout(()=>{

        spark.remove();

    },800);

}

/*==================================================
    MODAL
==================================================*/

function showMemory(memory){

    modalImage.src=memory.photo;

    modalCaption.textContent=memory.text;

    modal.classList.add("show");

}

modal.addEventListener("click",()=>{

    modal.classList.remove("show");

});

memoryCard.addEventListener("click",(e)=>{

    e.stopPropagation();

});

/*==================================================
    FADE DA MÚSICA
==================================================*/

function fadeMusic(){

    const fade=setInterval(()=>{

        if(music.volume>=0.95){

            music.volume=1;

            clearInterval(fade);

        }else{

            music.volume+=0.05;

        }

    },120);

}

/*==================================================
    PÉTALAS
==================================================*/

function startPetals(){

    const container=document.getElementById("petals");

    setInterval(()=>{

        const petal=document.createElement("div");

        petal.className="petal";

        petal.style.left=Math.random()*100+"vw";

        petal.style.top="-20px";

        petal.style.transform=
            `rotate(${Math.random()*360}deg)`;

        container.appendChild(petal);

        petal.animate(

            [

                {
                    transform:`translateY(0px) rotate(0deg)`
                },

                {
                    transform:`translate(${(Math.random()-0.5)*150}px,110vh) rotate(${720+Math.random()*360}deg)`
                }

            ],

            {

                duration:7000+Math.random()*3000,

                easing:"linear"

            }

        );

        setTimeout(()=>{

            petal.remove();

        },10000);

    },350);

}