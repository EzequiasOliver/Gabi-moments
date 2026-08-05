const sunflower = document.getElementById("sunflower");
const music = document.getElementById("bgMusic");
const gardenField = document.getElementById("gardenField");

const memories = [
{
    foto: "imagem/foto1.jpg",
    texto: "Nossa primeira lembrança 🌻"
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

    {x:40,  y:250, scale:0.65},

    {x:150, y:200, scale:0.78},

    {x:280, y:255, scale:0.62},

    {x:420, y:180, scale:0.92},

    {x:560, y:245, scale:0.70},

    {x:700, y:170, scale:1},

    {x:840, y:235, scale:0.80},

    {x:980, y:260, scale:0.60}

];
];

let current = 0;

sunflower.addEventListener("click", ()=>{

    if(music.paused){
        music.play().catch(()=>{});
    }

    sunflower.animate([
        {transform:"translateX(-50%) scale(1)"},
        {transform:"translateX(-50%) scale(1.15) rotate(6deg)"},
        {transform:"translateX(-50%) scale(1)"}
    ],{
        duration:500
    });

    if(current >= memories.length){
        return;
    }

    plantFlower(current);

    current++;

});
function plantFlower(index){

    const flower = document.createElement("img");

    flower.src = "imagem/girassol.png";
    flower.className = "memoryFlower";

    // Começa no centro
    flower.style.left = "50%";
    flower.style.bottom = "20px";
    flower.style.top = "auto";
    flower.style.transform = "translateX(-50%) scale(0)";

    gardenField.appendChild(flower);

    // Cresce
    setTimeout(() => {

        flower.style.transition = "transform .5s";
        flower.style.transform = "translateX(-50%) scale(1)";

    }, 50);

    // Vai para o jardim
    setTimeout(() => {

        flower.style.transition =
            "left 1s ease, top 1s ease, transform 1s ease";

        flower.style.left = positions[index].x + "px";
        flower.style.top = positions[index].y + "px";
        flower.style.bottom = "auto";
        flower.style.transform = "scale(.8)";

    }, 700);

    // Guarda a lembrança
    flower.dataset.photo = memories[index].foto;
    flower.dataset.text = memories[index].texto;

    flower.onclick = () => {

        showMemory(
            flower.dataset.photo,
            flower.dataset.text
        );

    };

}
}

}
const modal = document.getElementById("memoryModal");
const modalImage = document.getElementById("memoryImage");
const modalCaption = document.getElementById("memoryCaption");

function showMemory(photo,text){

    modalImage.src = photo;
    modalCaption.textContent = text;

    modal.classList.add("show");

}

modal.addEventListener("click",()=>{

    modal.classList.remove("show");

});