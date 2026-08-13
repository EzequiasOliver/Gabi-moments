/* =========================================================
   GABI MOMENTS — VERSÃO CORRIGIDA
   SCRIPT.JS — PARTE 1/3

   MECÂNICA:

   Girassol grande
        ↓
   clique
        ↓
   nasce UM girassol no jardim
        ↓
   memória abre automaticamente

   IMPORTANTE:
   - Nenhum girassol de memória nasce ao carregar a página.
   - Margaridas/tulipas NÃO serão usadas como flores de memória.
   - Cada memória possui apenas um girassol.
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const CONFIG = {

    photos: [
        "imagem/foto1.jpg",
        "imagem/foto2.jpg",
        "imagem/foto3.jpg"
    ],

    captions: [
        "Uma lembrança especial. 🌻",
        "Um momento que merece ficar guardado. 💛",
        "Mais uma memória bonita. ☀️"
    ],

    /*
       Somente imagens de vegetação.

       NÃO colocamos margarida ou tulipa aqui,
       porque elas estavam fazendo flores aparecerem
       antes das memórias serem descobertas.
    */

    grassImages: [
        "imagem/grama1.png",
        "imagem/grama2.png"
    ],

    memoryFlower:
        "imagem/girassol.png",

    ladybug:
        "imagem/joaninha.png",

    funnyLadybug:
        "imagem/joaninha-engracada.jpg"

};


/* =========================================================
   REFERÊNCIAS
========================================================= */

const elements = {

    garden:
        document.getElementById("garden"),

    mainFlower:
        document.getElementById("main-flower"),

    ladybug:
        document.getElementById("ladybug"),

    petalLayer:
        document.getElementById("petal-layer"),

    memoryMiddle:
        document.getElementById("memory-middle"),

    memoryFront:
        document.getElementById("memory-front"),

    memoryModal:
        document.getElementById("memory-modal"),

    memoryImage:
        document.getElementById("memory-image"),

    memoryCaption:
        document.getElementById("memory-caption"),

    memoryCounter:
        document.getElementById("memory-counter"),

    memoryClose:
        document.getElementById("memory-close"),

    ladybugModal:
        document.getElementById("ladybug-modal"),

    ladybugClose:
        document.getElementById("ladybug-close")

};


/* =========================================================
   MORROS
========================================================= */

const hills = {

    far: {
        element:
            document.getElementById("hill-far"),

        vegetation:
            document.getElementById("vegetation-far")
    },

    back: {
        element:
            document.getElementById("hill-back"),

        vegetation:
            document.getElementById("vegetation-back")
    },

    middle: {
        element:
            document.getElementById("hill-middle"),

        vegetation:
            document.getElementById("vegetation-middle")
    },

    front: {
        element:
            document.getElementById("hill-front"),

        vegetation:
            document.getElementById("vegetation-front")
    }

};


/* =========================================================
   ESTADO
========================================================= */

const gardenState = {

    memoriesFound:
        0,

    creatingFlower:
        false,

    completed:
        false

};


/* =========================================================
   POSIÇÕES DOS GIRASSÓIS
========================================================= */

/*
   Cada memória terá uma posição própria.

   As posições foram escolhidas para evitar:

   - ficar atrás do girassol principal;
   - nascer fora do morro;
   - nascer escondida atrás de outra flor;
   - nascer no céu.

   A posição é relativa AO MORRO.
*/

const flowerSpawnPositions = [

    {
        hill: "far",
        left: 32,
        bottom: 42,
        size: 48
    },

    {
        hill: "back",
        left: 68,
        bottom: 46,
        size: 52
    },

    {
        hill: "middle",
        left: 25,
        bottom: 52,
        size: 58
    },

    {
        hill: "middle",
        left: 74,
        bottom: 48,
        size: 56
    },

    {
        hill: "front",
        left: 25,
        bottom: 50,
        size: 62
    },

    {
        hill: "front",
        left: 75,
        bottom: 44,
        size: 60
    }

];


/* =========================================================
   POSIÇÕES UTILIZADAS
========================================================= */

const usedFlowerPositions =
    new Set();


/* =========================================================
   FUNÇÕES ALEATÓRIAS
========================================================= */

function random(min, max) {

    return Math.random() *
        (max - min) +
        min;

}


function randomInt(min, max) {

    return Math.floor(
        random(min, max + 1)
    );

}


function choose(array) {

    if (
        !array ||
        array.length === 0
    ) {

        return null;

    }


    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================================================
   ESCOLHER POSIÇÃO DO GIRASSOL
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions.filter(
            (_, index) => {

                return !usedFlowerPositions
                    .has(index);

            }
        );


    if (
        available.length === 0
    ) {

        return null;

    }


    const selected =
        choose(available);


    const index =
        flowerSpawnPositions.indexOf(
            selected
        );


    usedFlowerPositions.add(
        index
    );


    return selected;

}


/* =========================================================
   VEGETAÇÃO
========================================================= */

/*
   Quantidade de GRAMA por morro.

   Perceba que não existe mais
   "flower" aqui.

   Isso elimina as flores aleatórias
   que estavam aparecendo sozinhas.
*/

const vegetationAmount = {

    far: 7,

    back: 10,

    middle: 14,

    front: 18

};


/* =========================================================
   CRIAR GRAMA
========================================================= */

function createGrass(container) {

    if (!container) {

        return null;

    }


    const grass =
        document.createElement("img");


    grass.className =
        "grass";


    grass.src =
        choose(
            CONFIG.grassImages
        );


    grass.alt =
        "";


    grass.draggable =
        false;


    grass.style.left =
        `${random(5, 95)}%`;


    grass.style.bottom =
        `${random(2, 42)}px`;


    grass.style.setProperty(
        "--rotation",
        `${random(-8, 8)}deg`
    );


    grass.style.setProperty(
        "--wind-speed",
        `${random(3.8, 6.5)}s`
    );


    grass.style.animationDelay =
        `${random(-5, 0)}s`;


    const scale =
        random(.75, 1.08);


    grass.style.scale =
        scale;


    container.appendChild(
        grass
    );


    return grass;

}


/* =========================================================
   POPULAR UM MORRO
========================================================= */

function populateHill(
    hill,
    amount
) {

    if (
        !hill ||
        !hill.vegetation
    ) {

        return;

    }


    /*
       Limpa somente a vegetação
       antes de criar novamente.
    */

    hill.vegetation
        .replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        createGrass(
            hill.vegetation
        );

    }

}


/* =========================================================
   POPULAR TODOS OS MORROS
========================================================= */

function populateAllHills() {

    populateHill(
        hills.far,
        vegetationAmount.far
    );


    populateHill(
        hills.back,
        vegetationAmount.back
    );


    populateHill(
        hills.middle,
        vegetationAmount.middle
    );


    populateHill(
        hills.front,
        vegetationAmount.front
    );

}


/* =========================================================
   FIM DA PARTE 1/3
========================================================= */