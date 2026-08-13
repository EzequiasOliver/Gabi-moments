/* =========================================================
   GABI MOMENTS — NOVA VERSÃO
   SCRIPT.JS — PARTE 1/3
   Configuração + vegetação + girassóis
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
   REFERÊNCIAS DOS ELEMENTOS
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
   VEGETAÇÃO
========================================================= */

/*
   Quantidade diferente para cada morro.

   Os morros distantes recebem menos detalhes.
   Os da frente recebem mais.

   Isso cria profundidade sem transformar
   a tela numa salada de PNG.
*/

const vegetationAmount = {

    far: 7,

    back: 10,

    middle: 14,

    front: 18

};


/* =========================================================
   CRIAR UMA PLANTA
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


    const isFlower =
        type === "flower";


    plant.className =
        isFlower
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
       Mantemos as plantas dentro do
       próprio morro.
    */

    plant.style.left =
        `${random(3, 97)}%`;


    /*
       Quanto menor o bottom,
       mais perto da base do morro.
    */

    plant.style.bottom =
        `${random(4, 46)}px`;


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


    /*
       Pequena diferença de escala.
    */

    const scale =
        random(.78, 1.12);


    plant.style.scale =
        scale;


    container.appendChild(
        plant
    );

}


/* =========================================================
   CRIAR VEGETAÇÃO DE UM MORRO
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


    const container =
        hill.vegetation;


    /*
       Segurança:
       nunca duplicar vegetação.
    */

    container.replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        /*
           A maioria é grama.
           Uma parte menor recebe flores.
        */

        const type =
            Math.random() < .27
                ? "flower"
                : "grass";


        createPlant(
            container,
            type
        );

    }

}


/* =========================================================
   POPULAR OS QUATRO MORROS
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
   GIRASSÓIS DE MEMÓRIA
========================================================= */

/*
   Cada girassol pertence a um morro.

   Portanto:

   morro central
       └── girassol

   morro frontal
       └── girassol

   Eles não são colocados diretamente
   no #garden.
*/


const memoryPositions = [

    {
        container:
            "middle",

        index:
            0,

        left:
            24,

        bottom:
            56,

        size:
            60
    },

    {
        container:
            "middle",

        index:
            1,

        left:
            76,

        bottom:
            50,

        size:
            54
    },

    {
        container:
            "front",

        index:
            2,

        left:
            28,

        bottom:
            52,

        size:
            66
    }

];


/* =========================================================
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    data
) {

    const container =
        data.container === "middle"
            ? elements.memoryMiddle
            : elements.memoryFront;


    if (!container) {
        return;
    }


    const flower =
        document.createElement("img");


    flower.className =
        "memory-flower";


    flower.src =
        "imagem/girassol.png";


    flower.alt =
        `Lembrança ${data.index + 1}`;


    flower.draggable =
        false;


    flower.dataset.memoryIndex =
        data.index;


    flower.style.left =
        `${data.left}%`;


    flower.style.bottom =
        `${data.bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${data.size}px`
    );


    /*
       Pequeno atraso aleatório na animação.
    */

    flower.style.animationDelay =
        `${random(-3, 0)}s`;


    container.appendChild(
        flower
    );


    /*
       Só o próprio girassol recebe
       o evento de clique.
    */

    flower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openMemory(
                data.index
            );

        }
    );

}


/* =========================================================
   CRIAR TODAS AS MEMÓRIAS
========================================================= */

function createMemoryFlowers() {

    /*
       Segurança contra duplicação.
    */

    if (elements.memoryMiddle) {

        elements.memoryMiddle.replaceChildren();

    }


    if (elements.memoryFront) {

        elements.memoryFront.replaceChildren();

    }


    memoryPositions.forEach(
        createMemoryFlower
    );

}


/* =========================================================
   PRÉ-CARREGAR IMAGENS
========================================================= */

function preloadImages() {

    const sources = [

        ...CONFIG.photos,

        ...CONFIG.decorationImages,

        "imagem/girassol.png",

        "imagem/joaninha.png",

        "imagem/joaninha-engracada.jpg"

    ];


    sources.forEach(
        source => {

            const image =
                new Image();

            image.src =
                source;

        }
    );

}


/* =========================================================
   FIM DA PARTE 1/3
========================================================= */