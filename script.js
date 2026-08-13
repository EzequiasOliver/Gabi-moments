/* =========================================================
   GABI MOMENTS — NOVA MECÂNICA
   SCRIPT.JS — PARTE 1/3

   MECÂNICA PRINCIPAL:

   Girassol grande
        ↓ clique
   nasce um girassol
        ↓
   memória abre automaticamente

   Os girassóis de memória NÃO existem
   antes da interação.
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

    decorationImages: [
        "imagem/grama1.png",
        "imagem/grama2.png",
        "imagem/margarida.png",
        "imagem/tulipa.png"
    ]

};


/* =========================================================
   REFERÊNCIAS DO HTML
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
   ESTADO DO JARDIM
========================================================= */

const gardenState = {

    /*
       Quantas memórias já foram descobertas.
    */

    memoriesFound: 0,

    /*
       Evita dois cliques rápidos criarem
       duas flores para a mesma memória.
    */

    creatingFlower: false,

    /*
       Depois que as três memórias forem
       descobertas, o jardim entra no estado
       completo.
    */

    completed: false

};


/* =========================================================
   POSIÇÕES POSSÍVEIS DOS GIRASSÓIS
========================================================= */

/*
   Os girassóis são distribuídos pelos
   quatro morros.

   Cada posição pertence a um morro.

   Não usamos posições fixas todas de uma vez.
   O JavaScript escolhe uma delas somente
   quando o jogador descobre uma memória.
*/

const flowerSpawnPositions = [

    {
        hill:
            "far",

        left:
            34,

        bottom:
            42,

        size:
            48
    },

    {
        hill:
            "back",

        left:
            68,

        bottom:
            48,

        size:
            52
    },

    {
        hill:
            "middle",

        left:
            24,

        bottom:
            55,

        size:
            60
    },

    {
        hill:
            "middle",

        left:
            73,

        bottom:
            50,

        size:
            56
    },

    {
        hill:
            "front",

        left:
            28,

        bottom:
            54,

        size:
            66
    },

    {
        hill:
            "front",

        left:
            72,

        bottom:
            47,

        size:
            62
    }

];


/* =========================================================
   POSIÇÕES JÁ UTILIZADAS
========================================================= */

const usedFlowerPositions = new Set();


/* =========================================================
   FUNÇÕES AUXILIARES
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

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================================================
   ESCOLHER POSIÇÃO PARA NOVO GIRASSOL
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions.filter(
            (_, index) =>
                !usedFlowerPositions.has(index)
        );


    /*
       Se ainda existem posições livres,
       escolhemos uma delas.
    */

    if (available.length > 0) {

        const selected =
            choose(available);


        const originalIndex =
            flowerSpawnPositions.indexOf(
                selected
            );


        usedFlowerPositions.add(
            originalIndex
        );


        return selected;

    }


    /*
       Este caso praticamente nunca será
       necessário porque temos seis posições
       para apenas três memórias.

       Ainda assim, existe uma proteção.
    */

    return flowerSpawnPositions[
        gardenState.memoriesFound %
        flowerSpawnPositions.length
    ];

}


/* =========================================================
   CRIAR VEGETAÇÃO
========================================================= */

const vegetationAmount = {

    far: 6,

    back: 9,

    middle: 13,

    front: 17

};


/* =========================================================
   CRIAR PLANTA
========================================================= */

function createPlant(
    container,
    type
) {

    if (!container) {
        return;
    }


    const plant =
        document.createElement("img");


    plant.className =
        type === "flower"
            ? "flower"
            : "grass";


    plant.src =
        choose(
            CONFIG.decorationImages
        );


    plant.alt =
        "";


    plant.draggable =
        false;


    /*
       A planta pertence exclusivamente
       ao container do próprio morro.
    */

    plant.style.left =
        `${random(4, 96)}%`;


    plant.style.bottom =
        `${random(3, 44)}px`;


    plant.style.setProperty(
        "--rotation",
        `${random(-8, 8)}deg`
    );


    plant.style.setProperty(
        "--wind-speed",
        `${random(3.8, 6.5)}s`
    );


    plant.style.animationDelay =
        `${random(-5, 0)}s`;


    const scale =
        random(.78, 1.08);


    plant.style.scale =
        scale;


    container.appendChild(
        plant
    );

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
       Vegetação normal pode ser recriada
       sem problemas.
    */

    hill.vegetation
        .replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const type =
            Math.random() < .24
                ? "flower"
                : "grass";


        createPlant(
            hill.vegetation,
            type
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