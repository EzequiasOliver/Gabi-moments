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
    {x:15,y:240},
    {x:110,y:190},
    {x:220,y:250},
    {x:330,y:180},
    {x:430,y:235},
    {x:540,y:170},
    {x:650,y:245},
    {x:760,y:190}
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