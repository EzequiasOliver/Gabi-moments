/* =========================================================
   GABI MOMENTS 🌻
   SCRIPT.JS — VERSÃO NOVA E ESTÁVEL
   PARTE 1/3

   MECÂNICA:

   1. O girassol grande começa sozinho.
   2. Ao clicar nele:
      - nasce UM novo girassol no jardim;
      - a memória correspondente abre automaticamente.
   3. O girassol criado permanece no jardim.
   4. Clicar nele novamente abre a mesma memória.
   5. Depois da última memória, o girassol grande
      não cria flores extras.
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const CONFIG = {

    /* -----------------------------------------------------
       FOTOS DAS MEMÓRIAS
       -----------------------------------------------------

       A ordem precisa corresponder às legendas.
    */

    photos: [
        "imagem/foto1.jpg",
        "imagem/foto2.jpg",
        "imagem/foto3.jpg"
    ],


    /* -----------------------------------------------------
       LEGENDAS
    ----------------------------------------------------- */

    captions: [
        "Uma lembrança especial. 🌻",
        "Um momento que merece ficar guardado. 💛",
        "Mais uma memória bonita. ☀️"
    ],


    /* -----------------------------------------------------
       IMAGENS DECORATIVAS DO JARDIM
    ----------------------------------------------------- */

    decorationImages: [
        "imagem/grama1.png",
        "imagem/grama2.png",
        "imagem/margarida.png",
        "imagem/tulipa.png"
    ],


    /* -----------------------------------------------------
       IMAGENS PRINCIPAIS
    ----------------------------------------------------- */

    sunflower:
        "imagem/girassol.png",

    ladybug:
        "imagem/joaninha.png",

    funnyLadybug:
        "imagem/joaninha-engracada.jpg"

};


/* =========================================================
   REFERÊNCIAS DOS ELEMENTOS HTML
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


    /* -----------------------------------------------------
       MORROS
    ----------------------------------------------------- */

    hillFar:
        document.getElementById("hill-far"),

    hillBack:
        document.getElementById("hill-back"),

    hillMiddle:
        document.getElementById("hill-middle"),

    hillFront:
        document.getElementById("hill-front"),


    vegetationFar:
        document.getElementById("vegetation-far"),

    vegetationBack:
        document.getElementById("vegetation-back"),

    vegetationMiddle:
        document.getElementById("vegetation-middle"),

    vegetationFront:
        document.getElementById("vegetation-front"),


    /* -----------------------------------------------------
       CAMADAS DE MEMÓRIA
    ----------------------------------------------------- */

    memoryMiddle:
        document.getElementById("memory-middle"),

    memoryFront:
        document.getElementById("memory-front"),


    /* -----------------------------------------------------
       MODAL DE MEMÓRIA
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       MODAL DA JOANINHA
    ----------------------------------------------------- */

    ladybugModal:
        document.getElementById("ladybug-modal"),

    ladybugClose:
        document.getElementById("ladybug-close")

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
       Impede cliques extremamente rápidos
       de criarem duas flores para a mesma memória.
    */

    creatingFlower: false,


    /*
       Indica que todas as memórias já foram
       descobertas.
    */

    completed: false,


    /*
       Guarda as flores já criadas.

       Exemplo:

       [
           {
               element: HTMLImageElement,
               memoryIndex: 0
           },
           {
               element: HTMLImageElement,
               memoryIndex: 1
           }
       ]
    */

    memoryFlowers: []

};


/* =========================================================
   CONFIGURAÇÃO DOS MORROS
========================================================= */

const hills = {

    far: {
        element:
            elements.hillFar,

        vegetation:
            elements.vegetationFar
    },

    back: {
        element:
            elements.hillBack,

        vegetation:
            elements.vegetationBack
    },

    middle: {
        element:
            elements.hillMiddle,

        vegetation:
            elements.vegetationMiddle
    },

    front: {
        element:
            elements.hillFront,

        vegetation:
            elements.vegetationFront
    }

};


/* =========================================================
   POSIÇÕES POSSÍVEIS PARA OS GIRASSÓIS
========================================================= */

/*
   IMPORTANTE:

   Essas posições NÃO são criadas no carregamento.

   Elas são apenas lugares possíveis.

   Uma posição só é utilizada quando o usuário
   descobre uma memória.
*/

const flowerSpawnPositions = [

    {
        hill: "far",
        left: 34,
        bottom: 42,
        size: 48
    },

    {
        hill: "back",
        left: 68,
        bottom: 48,
        size: 52
    },

    {
        hill: "middle",
        left: 24,
        bottom: 55,
        size: 60
    },

    {
        hill: "middle",
        left: 73,
        bottom: 50,
        size: 56
    },

    {
        hill: "front",
        left: 28,
        bottom: 54,
        size: 66
    },

    {
        hill: "front",
        left: 72,
        bottom: 47,
        size: 62
    }

];


/* =========================================================
   POSIÇÕES UTILIZADAS
========================================================= */

const usedFlowerPositions =
    new Set();


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

    if (
        !Array.isArray(array) ||
        array.length === 0
    ) {

        return null;

    }


    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   ESCOLHER POSIÇÃO DE NOVO GIRASSOL
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions.filter(
            (_, index) => {

                return !usedFlowerPositions
                    .has(index);

            }
        );


    /*
       Normalmente teremos várias posições
       disponíveis.
    */

    if (
        available.length > 0
    ) {

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


    /*
       Proteção caso alguém adicione mais
       memórias do que posições disponíveis.
    */

    const fallbackIndex =
        gardenState.memoriesFound %
        flowerSpawnPositions.length;


    return flowerSpawnPositions[
        fallbackIndex
    ];

}


/* =========================================================
   CRIAR VEGETAÇÃO NORMAL
========================================================= */

const vegetationAmount = {

    far: 6,

    back: 9,

    middle: 13,

    front: 17

};


/* =========================================================
   CRIAR UMA PLANTA DECORATIVA
========================================================= */

function createPlant(
    container,
    type
) {

    if (!container) {

        return null;

    }


    const plant =
        document.createElement("img");


    /*
       Define a classe visual.
    */

    plant.className =
        type === "flower"
            ? "flower"
            : "grass";


    /*
       Escolhe uma imagem decorativa.
    */

    const source =
        choose(
            CONFIG.decorationImages
        );


    if (!source) {

        return null;

    }


    plant.src =
        source;


    plant.alt =
        "";


    plant.draggable =
        false;


    /*
       Posicionamento aleatório.
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


    plant.style.scale =
        random(.78, 1.08);


    container.appendChild(
        plant
    );


    return plant;

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
       A vegetação decorativa é criada
       somente durante a inicialização.
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