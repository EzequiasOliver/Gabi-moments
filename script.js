/* =========================================================
   GABI MOMENTS — V12
   SCRIPT.JS — PARTE 1/3
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

    decorations: [
        "imagem/grama1.png",
        "imagem/grama2.png",
        "imagem/margarida.png",
        "imagem/tulipa.png"
    ]

};


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const garden =
    document.getElementById("garden");

const mainFlower =
    document.getElementById("main-flower");

const ladybug =
    document.getElementById("ladybug");

const petalLayer =
    document.getElementById("petal-layer");

const memoryMiddle =
    document.getElementById("memory-middle");

const memoryFront =
    document.getElementById("memory-front");


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
   UTILITÁRIOS
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


function pick(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   VERIFICAR IMAGEM
========================================================= */

function imageExists(src) {

    return new Promise(
        resolve => {

            const image =
                new Image();


            image.onload = () => {

                resolve(true);

            };


            image.onerror = () => {

                resolve(false);

            };


            image.src = src;

        }
    );

}


/* =========================================================
   PRÉ-CARREGAMENTO
========================================================= */

function preloadImages() {

    const sources = [

        ...CONFIG.photos,

        ...CONFIG.decorations,

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
   CRIAR VEGETAÇÃO
========================================================= */

/*
   IMPORTANTE:

   A vegetação é criada DENTRO do
   elemento do próprio morro.

   Portanto:
   
   morro
      └── vegetação

   Nunca:
   
   página
      └── flor aleatória
*/


function createVegetation(
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


    container.innerHTML =
        "";


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const image =
            document.createElement("img");


        const isFlower =
            Math.random() < .28;


        image.className =
            isFlower
                ? "flower"
                : "grass";


        image.src =
            pick(
                CONFIG.decorations
            );


        image.alt =
            "";


        image.draggable =
            false;


        /*
         * Margem horizontal.
         */

        const x =
            random(4, 96);


        /*
         * A vegetação fica na parte
         * inferior do morro.
         *
         * Como ela está dentro do morro,
         * nunca poderá aparecer no céu.
         */

        const bottom =
            random(
                8,
                48
            );


        image.style.left =
            `${x}%`;


        image.style.bottom =
            `${bottom}px`;


        image.style.setProperty(
            "--rotation",
            `${random(-10, 10)}deg`
        );


        image.style.setProperty(
            "--wind-speed",
            `${random(3.5, 6)}s`
        );


        /*
         * Pequeno atraso para não ficarem
         * todas balançando juntas.
         */

        image.style.animationDelay =
            `${random(-4, 0)}s`;


        container.appendChild(
            image
        );

    }

}


/* =========================================================
   VEGETAÇÃO DOS QUATRO MORROS
========================================================= */

function createAllVegetation() {

    createVegetation(
        hills.far,
        8
    );


    createVegetation(
        hills.back,
        12
    );


    createVegetation(
        hills.middle,
        16
    );


    createVegetation(
        hills.front,
        20
    );

}


/* =========================================================
   CRIAR UM GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    container,
    index,
    left,
    bottom,
    size
) {

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
        `Lembrança ${index + 1}`;


    flower.draggable =
        false;


    flower.dataset.memory =
        index;


    flower.style.left =
        `${left}%`;


    flower.style.bottom =
        `${bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${size}px`
    );


    flower.style.animationDelay =
        `${random(-3, 0)}s`;


    container.appendChild(
        flower
    );


    flower.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            openMemory(
                index
            );

        }
    );

}


/* =========================================================
   GIRASSÓIS DE MEMÓRIA
========================================================= */

function createMemoryFlowers() {

    if (memoryMiddle) {

        memoryMiddle.innerHTML =
            "";

    }


    if (memoryFront) {

        memoryFront.innerHTML =
            "";

    }


    /*
     * Morro central
     */

    createMemoryFlower(
        memoryMiddle,
        0,
        23,
        58,
        58
    );


    createMemoryFlower(
        memoryMiddle,
        1,
        77,
        53,
        54
    );


    /*
     * Morro frontal
     */

    createMemoryFlower(
        memoryFront,
        2,
        28,
        54,
        66
    );


    createMemoryFlower(
        memoryFront,
        0,
        73,
        47,
        62
    );

}


/* =========================================================
   FIM DA PARTE 1/3
========================================================= */