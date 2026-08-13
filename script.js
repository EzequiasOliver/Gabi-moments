/* =========================================================
   GABI MOMENTS — VERSÃO CORRIGIDA
   SCRIPT.JS — PARTE 1/3

   MECÂNICA:

   Girassol principal
        ↓
   clique
        ↓
   nasce UM girassol
        ↓
   abre a memória correspondente

   IMPORTANTE:
   Nenhum girassol de memória existe
   antes do clique.
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
       GRAMAS:
       somente imagens de grama.

       FLORES:
       somente flores decorativas.

       Assim uma grama nunca vira uma tulipa
       por acidente.
    */

    grassImages: [
        "imagem/grama1.png",
        "imagem/grama2.png"
    ],

    flowerImages: [
        "imagem/margarida.png",
        "imagem/tulipa.png"
    ],

    sunflowerImage:
        "imagem/girassol.png",

    ladybugImage:
        "imagem/joaninha.png",

    funnyLadybugImage:
        "imagem/joaninha-engracada.jpg"

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
            document.getElementById("vegetation-far"),

        memory:
            null
    },

    back: {
        element:
            document.getElementById("hill-back"),

        vegetation:
            document.getElementById("vegetation-back"),

        memory:
            null
    },

    middle: {
        element:
            document.getElementById("hill-middle"),

        vegetation:
            document.getElementById("vegetation-middle"),

        memory:
            document.getElementById("memory-middle")
    },

    front: {
        element:
            document.getElementById("hill-front"),

        vegetation:
            document.getElementById("vegetation-front"),

        memory:
            document.getElementById("memory-front")
    }

};


/* =========================================================
   ESTADO DO JARDIM
========================================================= */

const gardenState = {

    /*
       Quantas memórias foram descobertas.
    */

    memoriesFound: 0,

    /*
       Impede múltiplos cliques rápidos
       de criarem várias flores.
    */

    creatingFlower: false,

    /*
       Guarda as flores já criadas.
    */

    memoryFlowers: [],

    /*
       Indica que todas as memórias foram
       descobertas.
    */

    completed: false

};


/* =========================================================
   POSIÇÕES DOS GIRASSÓIS
========================================================= */

/*
   Agora usamos SOMENTE os memory-layers.

   Os dois morros que possuem memory-layer
   são middle e front.

   Isso evita que o girassol seja enterrado
   atrás da vegetação ou apareça no céu.

   left = posição horizontal dentro do morro
   bottom = posição vertical dentro do morro
   size = tamanho do girassol
*/

const flowerSpawnPositions = [

    {
        layer: "middle",

        left: 27,

        bottom: 42,

        size: 62
    },

    {
        layer: "middle",

        left: 72,

        bottom: 38,

        size: 58
    },

    {
        layer: "front",

        left: 30,

        bottom: 46,

        size: 68
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

function random(
    min,
    max
) {

    return Math.random() *
        (max - min) +
        min;

}


function randomInt(
    min,
    max
) {

    return Math.floor(
        random(
            min,
            max + 1
        )
    );

}


function choose(
    array
) {

    if (
        !Array.isArray(array) ||
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
        choose(
            available
        );


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
   QUANTIDADE DE VEGETAÇÃO
========================================================= */

const vegetationAmount = {

    far: 7,

    back: 9,

    middle: 12,

    front: 15

};


/* =========================================================
   CRIAR GRAMA
========================================================= */

function createGrass(
    container
) {

    if (!container) {

        return;

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
        `${random(4, 96)}%`;


    grass.style.bottom =
        `${random(2, 40)}px`;


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


    grass.style.scale =
        random(.78, 1.08);


    container.appendChild(
        grass
    );

}


/* =========================================================
   CRIAR FLOR DECORATIVA
========================================================= */

function createDecorativeFlower(
    container
) {

    if (!container) {

        return;

    }


    const flower =
        document.createElement("img");


    flower.className =
        "flower";


    flower.src =
        choose(
            CONFIG.flowerImages
        );


    flower.alt =
        "";


    flower.draggable =
        false;


    flower.style.left =
        `${random(5, 95)}%`;


    flower.style.bottom =
        `${random(4, 44)}px`;


    flower.style.setProperty(
        "--rotation",
        `${random(-7, 7)}deg`
    );


    flower.style.setProperty(
        "--wind-speed",
        `${random(4, 6.5)}s`
    );


    flower.style.animationDelay =
        `${random(-5, 0)}s`;


    flower.style.scale =
        random(.75, 1.05);


    container.appendChild(
        flower
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
       Limpa somente a vegetação normal.

       O memory-layer NÃO é tocado aqui.
    */

    hill.vegetation
        .replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        /*
           Maioria é grama.
        */

        if (
            Math.random() < .78
        ) {

            createGrass(
                hill.vegetation
            );

        } else {

            createDecorativeFlower(
                hill.vegetation
            );

        }

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
   LIMPAR GIRASSÓIS DE MEMÓRIA
========================================================= */

function clearMemoryFlowers() {

    [
        hills.middle.memory,
        hills.front.memory
    ]
    .forEach(
        layer => {

            if (layer) {

                layer.replaceChildren();

            }

        }
    );


    gardenState.memoryFlowers =
        [];


    usedFlowerPositions.clear();


    gardenState.memoriesFound =
        0;


    gardenState.creatingFlower =
        false;


    gardenState.completed =
        false;

}


/* =========================================================
   FIM DA PARTE 1/3
========================================================= */
/* =========================================================
   FIM DA PARTE 1/3
========================================================= */
/* =========================================================
   GABI MOMENTS — NOVA MECÂNICA
   SCRIPT.JS — PARTE 2/3

   Nascimento dos girassóis
   + abertura automática das memórias
   + joaninha
   + pétalas
========================================================= */


/* =========================================================
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    memoryIndex,
    spawn
) {

    /*
       Descobre em qual morro o girassol
       deve nascer.
    */

    const hill =
        hills[spawn.hill];


    if (
        !hill ||
        !hill.vegetation
    ) {

        return null;
    }


    /*
       Criamos o girassol dentro do
       container do morro.

       Assim ele nunca fica solto no céu
       ou em outro morro.
    */

    const flower =
        document.createElement("img");


    flower.className =
        "memory-flower";


    flower.src =
        "imagem/girassol.png";


    flower.alt =
        `Girassol da lembrança ${memoryIndex + 1}`;


    flower.draggable =
        false;


    flower.dataset.memoryIndex =
        memoryIndex;


    flower.style.left =
        `${spawn.left}%`;


    flower.style.bottom =
        `${spawn.bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${spawn.size}px`
    );


    /*
       Começa pequeno e invisível.
       Depois fazemos a flor nascer.
    */

    flower.style.opacity =
        "0";


    flower.style.transform =
        "translateX(-50%) scale(0)";


    /*
       O container de vegetação é usado
       apenas para manter a flor dentro
       do morro.
    */

    hill.vegetation.appendChild(
        flower
    );


    /*
       Animação de nascimento.
    */

    requestAnimationFrame(
        () => {

            flower.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            `
                            translateX(-50%)
                            scale(0)
                            rotate(-8deg)
                            `
                    },

                    {
                        opacity: 1,

                        transform:
                            `
                            translateX(-50%)
                            scale(1.12)
                            rotate(3deg)
                            `
                    },

                    {
                        opacity: 1,

                        transform:
                            `
                            translateX(-50%)
                            scale(1)
                            rotate(0deg)
                            `
                    }

                ],

                {
                    duration: 900,

                    easing:
                        "cubic-bezier(.2,.9,.2,1)",

                    fill:
                        "forwards"
                }

            );

        }
    );


    /*
       O clique no girassol que já nasceu
       também abre a mesma memória.
    */

    flower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openMemory(
                memoryIndex
            );

        }
    );


    return flower;

}


/* =========================================================
   DESCOBRIR PRÓXIMA MEMÓRIA
========================================================= */

function discoverNextMemory() {

    /*
       Não há mais memórias.
    */

    if (
        gardenState.memoriesFound >=
        CONFIG.photos.length
    ) {

        gardenState.completed =
            true;

        return;

    }


    /*
       Evita dois girassóis nascerem
       simultaneamente.
    */

    if (
        gardenState.creatingFlower
    ) {

        return;

    }


    gardenState.creatingFlower =
        true;


    const memoryIndex =
        gardenState.memoriesFound;


    const spawn =
        chooseFlowerSpawn();


    const flower =
        createMemoryFlower(
            memoryIndex,
            spawn
        );


    /*
       Se houve algum problema na criação,
       não avançamos o contador.
    */

    if (!flower) {

        gardenState.creatingFlower =
            false;

        return;

    }


    /*
       A memória foi descoberta.
    */

    gardenState.memoriesFound++;


    /*
       Pequena espera para o girassol
       terminar de nascer antes da foto
       aparecer.

       Isso deixa a interação mais bonita.
    */

    setTimeout(
        () => {

            openMemory(
                memoryIndex
            );


            gardenState.creatingFlower =
                false;


            /*
               Depois da terceira memória,
               marcamos o jardim como completo.
            */

            if (
                gardenState.memoriesFound >=
                CONFIG.photos.length
            ) {

                gardenState.completed =
                    true;

            }

        },

        700
    );

}


/* =========================================================
   MODAL DE MEMÓRIA
========================================================= */

function openMemory(index) {

    const modal =
        elements.memoryModal;


    const image =
        elements.memoryImage;


    if (
        !modal ||
        !image
    ) {

        return;

    }


    if (
        index < 0 ||
        index >= CONFIG.photos.length
    ) {

        return;

    }


    image.src =
        CONFIG.photos[index];


    image.alt =
        `Foto da lembrança ${index + 1}`;


    if (
        elements.memoryCaption
    ) {

        elements.memoryCaption.textContent =
            CONFIG.captions[index] || "";

    }


    if (
        elements.memoryCounter
    ) {

        elements.memoryCounter.textContent =
            `${index + 1} / ${CONFIG.photos.length}`;

    }


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR MEMÓRIA
========================================================= */

function closeMemory() {

    const modal =
        elements.memoryModal;


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        !elements.ladybugModal ||
        !elements.ladybugModal.classList.contains(
            "show"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   MODAL DA JOANINHA
========================================================= */

function openLadybugModal() {

    const modal =
        elements.ladybugModal;


    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeLadybugModal() {

    const modal =
        elements.ladybugModal;


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        !elements.memoryModal ||
        !elements.memoryModal.classList.contains(
            "show"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   BOTÃO DE FECHAR — MEMÓRIA
========================================================= */

if (
    elements.memoryClose
) {

    elements.memoryClose.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            closeMemory();

        }
    );

}


/* =========================================================
   BOTÃO DE FECHAR — JOANINHA
========================================================= */

if (
    elements.ladybugClose
) {

    elements.ladybugClose.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            closeLadybugModal();

        }
    );

}


/* =========================================================
   FECHAR CLICANDO NO FUNDO
========================================================= */

if (
    elements.memoryModal
) {

    elements.memoryModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elements.memoryModal
            ) {

                closeMemory();

            }

        }
    );

}


if (
    elements.ladybugModal
) {

    elements.ladybugModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elements.ladybugModal
            ) {

                closeLadybugModal();

            }

        }
    );

}


/* =========================================================
   ESC FECHA OS MODAIS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeMemory();

        closeLadybugModal();

    }
);


/* =========================================================
   PÉTALAS
========================================================= */

function createPetal() {

    const layer =
        elements.petalLayer;


    if (!layer) {
        return;
    }


    const petal =
        document.createElement("div");


    petal.className =
        "petal";


    const size =
        random(7, 14);


    petal.style.width =
        `${size}px`;


    petal.style.height =
        `${size * 1.45}px`;


    petal.style.left =
        `${random(0, 100)}vw`;


    petal.style.background =
        choose([
            "#fff9d1",
            "#fff0a4",
            "#ffe680",
            "#fffbe8"
        ]);


    petal.style.opacity =
        random(.65, .95);


    layer.appendChild(
        petal
    );


    const drift =
        random(-130, 130);


    const rotation =
        random(260, 720);


    const duration =
        random(3.8, 6.2);


    const animation =
        petal.animate(

            [
                {
                    transform:
                        `
                        translate3d(
                            0,
                            -35px,
                            0
                        )
                        rotate(0deg)
                        `
                },

                {
                    transform:
                        `
                        translate3d(
                            ${drift}px,
                            110vh,
                            0
                        )
                        rotate(
                            ${rotation}deg
                        )
                        `,

                    opacity: 0
                }

            ],

            {
                duration:
                    duration * 1000,

                easing:
                    "ease-in",

                fill:
                    "forwards"
            }

        );


    animation.finished
        .then(
            () => {

                petal.remove();

            }
        )
        .catch(
            () => {

                petal.remove();

            }
        );

}


/* =========================================================
   RAJADA DE PÉTALAS
========================================================= */

function createPetalBurst() {

    const amount =
        randomInt(
            12,
            18
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 45
        );

    }

}


/* =========================================================
   FIM DA PARTE 2/3
========================================================= */
/* =========================================================
   GABI MOMENTS — NOVA MECÂNICA
   SCRIPT.JS — PARTE 3/3

   Girassol principal
   + joaninha andando
   + inicialização
   + proteção contra duplicação
========================================================= */


/* =========================================================
   GIRASSOL PRINCIPAL
========================================================= */

if (elements.mainFlower) {

    elements.mainFlower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
               A cada clique:

               1. nasce um girassol;
               2. a memória correspondente abre;
               3. pétalas aparecem.

               Depois da terceira memória,
               não criamos uma quarta.
            */

            if (
                gardenState.memoriesFound <
                CONFIG.photos.length
            ) {

                discoverNextMemory();

                createPetalBurst();

                return;

            }


            /*
               Todas as três memórias já foram
               descobertas.

               O girassol principal continua
               interagindo, mas não cria flores
               inexistentes.
            */

            createPetalBurst();

        }
    );

}


/* =========================================================
   ESTADO DA JOANINHA
========================================================= */

const ladybugState = {

    x: 12,

    direction: 1,

    walking: true,

    pauseUntil: 0,

    nextPause: 0,

    speed: 0.026

};


/* =========================================================
   LIMITES DA JOANINHA
========================================================= */

const ladybugLimits = {

    minX: 7,

    maxX: 88

};


/* =========================================================
   ATUALIZAR VISUAL DA JOANINHA
========================================================= */

function updateLadybugVisual() {

    const bug =
        elements.ladybug;


    if (!bug) {
        return;
    }


    bug.style.left =
        `${ladybugState.x}%`;


    /*
       Vira horizontalmente conforme
       muda de direção.
    */

    bug.style.transform =
        `
        scaleX(
            ${ladybugState.direction}
        )
        `;

}


/* =========================================================
   AGENDAR PAUSA
========================================================= */

function scheduleLadybugPause(
    currentTime
) {

    ladybugState.nextPause =
        currentTime +
        random(
            3500,
            7000
        );

}


/* =========================================================
   PAUSAR JOANINHA
========================================================= */

function pauseLadybug(
    currentTime
) {

    ladybugState.walking =
        false;


    ladybugState.pauseUntil =
        currentTime +
        random(
            900,
            2300
        );

}


/* =========================================================
   ATUALIZAR MOVIMENTO
========================================================= */

function updateLadybug(
    currentTime
) {

    const bug =
        elements.ladybug;


    if (!bug) {
        return;
    }


    /*
       Quando está parada.
    */

    if (
        !ladybugState.walking
    ) {

        if (
            currentTime >=
            ladybugState.pauseUntil
        ) {

            /*
               Às vezes muda de direção
               antes de continuar.
            */

            if (
                Math.random() < .5
            ) {

                ladybugState.direction *=
                    -1;

            }


            ladybugState.walking =
                true;


            scheduleLadybugPause(
                currentTime
            );

        }


        updateLadybugVisual();

        return;

    }


    /*
       Movimento.
    */

    ladybugState.x +=
        ladybugState.speed *
        ladybugState.direction;


    /*
       Chegou ao lado direito.
    */

    if (
        ladybugState.x >=
        ladybugLimits.maxX
    ) {

        ladybugState.x =
            ladybugLimits.maxX;


        ladybugState.direction =
            -1;


        pauseLadybug(
            currentTime
        );

    }


    /*
       Chegou ao lado esquerdo.
    */

    if (
        ladybugState.x <=
        ladybugLimits.minX
    ) {

        ladybugState.x =
            ladybugLimits.minX;


        ladybugState.direction =
            1;


        pauseLadybug(
            currentTime
        );

    }


    /*
       Pausa aleatória.
    */

    if (
        currentTime >=
        ladybugState.nextPause
    ) {

        pauseLadybug(
            currentTime
        );

    }


    updateLadybugVisual();

}


/* =========================================================
   LOOP DA JOANINHA
========================================================= */

function ladybugAnimationLoop(
    currentTime
) {

    updateLadybug(
        currentTime
    );


    requestAnimationFrame(
        ladybugAnimationLoop
    );

}


/* =========================================================
   CLIQUE DA JOANINHA
========================================================= */

if (
    elements.ladybug
) {

    elements.ladybug.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
               Ela para enquanto a lembrança
               está aberta.
            */

            ladybugState.walking =
                false;


            ladybugState.pauseUntil =
                performance.now() +
                3000;


            openLadybugModal();

        }
    );

}


/* =========================================================
   INICIAR JOANINHA
========================================================= */

function startLadybug() {

    if (
        !elements.ladybug
    ) {

        return;
    }


    const now =
        performance.now();


    scheduleLadybugPause(
        now
    );


    updateLadybugVisual();


    requestAnimationFrame(
        ladybugAnimationLoop
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
   VERIFICAR ESTRUTURA
========================================================= */

function verifyPageStructure() {

    const required = [

        "garden",

        "mainFlower",

        "ladybug",

        "petalLayer",

        "memoryMiddle",

        "memoryFront",

        "memoryModal",

        "memoryImage",

        "memoryCaption",

        "memoryCounter",

        "ladybugModal"

    ];


    const missing = [];


    required.forEach(
        name => {

            if (
                !elements[name]
            ) {

                missing.push(
                    name
                );

            }

        }
    );


    if (
        missing.length > 0
    ) {

        console.warn(
            "Gabi Moments — elementos ausentes:",
            missing
        );

    }


    return (
        missing.length === 0
    );

}


/* =========================================================
   LIMPEZA INICIAL
========================================================= */

function cleanDynamicElements() {

    /*
       Remove qualquer elemento dinâmico
       que eventualmente tenha sobrado.

       IMPORTANTE:

       Não removemos o girassol principal.
       Não removemos a joaninha.

       Apenas a vegetação e memórias
       que são controladas pelo JavaScript.
    */

    const vegetationContainers = [

        hills.far.vegetation,

        hills.back.vegetation,

        hills.middle.vegetation,

        hills.front.vegetation

    ];


    vegetationContainers.forEach(
        container => {

            if (
                container
            ) {

                container.replaceChildren();

            }

        }
    );


    /*
       Também limpamos as camadas de memória
       caso exista alguma estrutura antiga.
    */

    if (
        elements.memoryMiddle
    ) {

        elements.memoryMiddle
            .replaceChildren();

    }


    if (
        elements.memoryFront
    ) {

        elements.memoryFront
            .replaceChildren();

    }


    /*
       Nenhuma memória foi descoberta
       no carregamento.
    */

    gardenState.memoriesFound =
        0;


    gardenState.creatingFlower =
        false;


    gardenState.completed =
        false;


    usedFlowerPositions.clear();

}


/* =========================================================
   INICIALIZAR JARDIM
========================================================= */

function initializeGarden() {

    /*
       Primeiro verificamos o HTML.
    */

    verifyPageStructure();


    /*
       Depois limpamos qualquer elemento
       dinâmico antigo.
    */

    cleanDynamicElements();


    /*
       Pré-carregamos as imagens.
    */

    preloadImages();


    /*
       Criamos somente a vegetação normal.
    */

    populateAllHills();


    /*
       NÃO criamos girassóis de memória aqui.

       Eles só nascerão quando o usuário
       clicar no girassol principal.
    */


    /*
       Iniciamos a joaninha.
    */

    startLadybug();

}


/* =========================================================
   EVITAR ARRASTAR IMAGENS
========================================================= */

document.addEventListener(
    "dragstart",
    event => {

        if (
            event.target instanceof
            HTMLImageElement
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO SEGURA
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeGarden,
        {
            once: true
        }
    );

} else {

    initializeGarden();

}


/* =========================================================
   FIM DO SCRIPT.JS
========================================================= */