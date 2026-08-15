/* =========================================================
   GABI MOMENTS
   SCRIPT.JS — VERSÃO FINAL

   MECÂNICA:

   GIRASSOL GRANDE
        ↓
   clique
        ↓
   nasce um girassol no jardim
        ↓
   memória correspondente abre automaticamente

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
    ],

    sunflowerImage:
        "imagem/girassol.png",

    ladybugImage:
        "imagem/joaninha.png",

    ladybugMemoryImage:
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
   REFERÊNCIAS DOS MORROS
========================================================= */

const hills = {

    far: {
        element:
            document.getElementById("hill-far"),

        vegetation:
            document.getElementById("vegetation-far"),

        memory:
            document.getElementById("memory-middle")
    },

    back: {
        element:
            document.getElementById("hill-back"),

        vegetation:
            document.getElementById("vegetation-back"),

        memory:
            document.getElementById("memory-middle")
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

    memoriesFound: 0,

    creatingFlower: false,

    completed: false

};


/* =========================================================
   POSIÇÕES DOS GIRASSÓIS
========================================================= */

/*
   Cada girassol possui:

   hill   = morro onde nasce
   left   = posição horizontal
   bottom = altura dentro do morro
   size   = tamanho

   As posições NÃO são criadas no carregamento.

   Só são utilizadas quando uma memória
   é descoberta.
*/

const flowerSpawnPositions = [

    {
        hill: "far",
        left: 32,
        bottom: 38,
        size: 48
    },

    {
        hill: "back",
        left: 68,
        bottom: 44,
        size: 52
    },

    {
        hill: "middle",
        left: 25,
        bottom: 48,
        size: 58
    },

    {
        hill: "middle",
        left: 73,
        bottom: 44,
        size: 56
    },

    {
        hill: "front",
        left: 29,
        bottom: 48,
        size: 64
    },

    {
        hill: "front",
        left: 72,
        bottom: 42,
        size: 61
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

    if (!array || array.length === 0) {

        return null;

    }

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   ESCOLHER POSIÇÃO DO GIRASSOL
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions.filter(
            (_, index) =>
                !usedFlowerPositions.has(index)
        );


    if (available.length === 0) {

        return null;

    }


    const selected =
        choose(available);


    const index =
        flowerSpawnPositions.indexOf(
            selected
        );


    usedFlowerPositions.add(index);


    return selected;

}


/* =========================================================
   VEGETAÇÃO
========================================================= */

const vegetationAmount = {

    far: 6,

    back: 9,

    middle: 13,

    front: 17

};


/* =========================================================
   CRIAR PLANTA DECORATIVA
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


    const source =
        choose(
            CONFIG.decorationImages
        );


    if (!source) {

        return;

    }


    plant.src =
        source;


    plant.alt =
        "";


    plant.draggable =
        false;


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
   POPULAR MORRO
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
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    memoryIndex,
    spawn
) {

    if (!spawn) {

        return null;

    }


    /*
       IMPORTANTE:

       O girassol de memória deve ficar
       dentro da camada de memória,
       NÃO dentro da vegetação.

       Assim a vegetação normal nunca
       apaga os girassóis descobertos.
    */

    let memoryContainer;


    if (
        spawn.hill === "front"
    ) {

        memoryContainer =
            document.getElementById(
                "memory-front"
            );

    } else {

        memoryContainer =
            document.getElementById(
                "memory-middle"
            );

    }


    if (!memoryContainer) {

        console.error(
            "Camada de memória não encontrada."
        );

        return null;

    }


    const flower =
        document.createElement("img");


    flower.className =
        "memory-flower";


    flower.src =
        CONFIG.sunflowerImage;


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
       Estado inicial.
    */

    flower.style.opacity =
        "0";


    flower.style.transform =
        "translateX(-50%) scale(0)";


    memoryContainer.appendChild(
        flower
    );


    /*
       Força o navegador a reconhecer
       o estado inicial antes da animação.
    */

    requestAnimationFrame(
        () => {

            flower.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            "translateX(-50%) scale(0) rotate(-12deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(-50%) scale(1.15) rotate(5deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(-50%) scale(1) rotate(0deg)"
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
       Clicar posteriormente na flor
       abre novamente a mesma memória.
    */

    flower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const index =
                Number(
                    flower.dataset.memoryIndex
                );


            openMemory(index);

        }
    );


    return flower;

}


/* =========================================================
   DESCOBRIR PRÓXIMA MEMÓRIA
========================================================= */

function discoverNextMemory() {

    /*
       Não existe memória para criar.
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
       Evita duplo clique.
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


    if (!spawn) {

        console.error(
            "Não existem posições disponíveis para o girassol."
        );


        gardenState.creatingFlower =
            false;

        return;

    }


    const flower =
        createMemoryFlower(
            memoryIndex,
            spawn
        );


    if (!flower) {

        gardenState.creatingFlower =
            false;

        return;

    }


    /*
       Agora a memória realmente foi
       descoberta.
    */

    gardenState.memoriesFound++;


    /*
       Abre a memória depois que a flor
       terminou de nascer.
    */

    setTimeout(
        () => {

            openMemory(
                memoryIndex
            );


            gardenState.creatingFlower =
                false;


            if (
                gardenState.memoriesFound >=
                CONFIG.photos.length
            ) {

                gardenState.completed =
                    true;

            }

        },

        850
    );

}


/* =========================================================
   ABRIR MEMÓRIA
========================================================= */

function openMemory(index) {

    if (
        !elements.memoryModal ||
        !elements.memoryImage
    ) {

        return;

    }


    if (
        index < 0 ||
        index >= CONFIG.photos.length
    ) {

        console.error(
            "Índice de memória inválido:",
            index
        );

        return;

    }


    const image =
        elements.memoryImage;


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


    elements.memoryModal.classList.add(
        "show"
    );


    elements.memoryModal.setAttribute(
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

    if (
        !elements.memoryModal
    ) {

        return;

    }


    elements.memoryModal.classList.remove(
        "show"
    );


    elements.memoryModal.setAttribute(
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
   ABRIR JOANINHA
========================================================= */

function openLadybugModal() {

    if (
        !elements.ladybugModal
    ) {

        return;

    }


    elements.ladybugModal.classList.add(
        "show"
    );


    elements.ladybugModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR JOANINHA
========================================================= */

function closeLadybugModal() {

    if (
        !elements.ladybugModal
    ) {

        return;

    }


    elements.ladybugModal.classList.remove(
        "show"
    );


    elements.ladybugModal.setAttribute(
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
   BOTÃO FECHAR MEMÓRIA
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
   BOTÃO FECHAR JOANINHA
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
   CLICAR FORA DO CARTÃO
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
   ESC
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

    if (
        !elements.petalLayer
    ) {

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


    elements.petalLayer.appendChild(
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
                        "translate3d(0,-35px,0) rotate(0deg)"
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
            () => petal.remove()
        )
        .catch(
            () => petal.remove()
        );

}


/* =========================================================
   RAJADA DE PÉTALAS
========================================================= */

function createPetalBurst() {

    const amount =
        randomInt(12, 18);


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
   CLIQUE DO GIRASSOL PRINCIPAL
========================================================= */

if (
    elements.mainFlower
) {

    elements.mainFlower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
               Ainda existem memórias?
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
               As três memórias já foram
               descobertas.

               Não nasce uma quarta flor.
               Apenas fazemos o efeito das pétalas.
            */

            createPetalBurst();

        }
    );

}


/* =========================================================
   JOANINHA
========================================================= */

const ladybugState = {

    x: 12,

    direction: 1,

    walking: true,

    pauseUntil: 0,

    nextPause: 0,

    speed: 0.026

};


const ladybugLimits = {

    minX: 7,

    maxX: 88

};


/* =========================================================
   VISUAL DA JOANINHA
========================================================= */

function updateLadybugVisual() {

    if (
        !elements.ladybug
    ) {

        return;

    }


    elements.ladybug.style.left =
        `${ladybugState.x}%`;


    elements.ladybug.style.transform =
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
   ATUALIZAR JOANINHA
========================================================= */

function updateLadybug(
    currentTime
) {

    if (
        !elements.ladybug
    ) {

        return;

    }


    if (
        !ladybugState.walking
    ) {

        if (
            currentTime >=
            ladybugState.pauseUntil
        ) {

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


    ladybugState.x +=
        ladybugState.speed *
        ladybugState.direction;


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

        CONFIG.sunflowerImage,

        CONFIG.ladybugImage,

        CONFIG.ladybugMemoryImage

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
   VERIFICAR HTML
========================================================= */

function verifyPageStructure() {

    const required = [

        "garden",

        "mainFlower",

        "ladybug",

        "petalLayer",

        "memoryModal",

        "memoryImage",

        "memoryCaption",

        "memoryCounter",

        "memoryClose",

        "ladybugModal",

        "ladybugClose"

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

        console.error(
            "Gabi Moments — elementos ausentes:",
            missing
        );

    }


    return (
        missing.length === 0
    );

}


/* =========================================================
   LIMPAR SOMENTE ELEMENTOS DINÂMICOS
========================================================= */

function cleanDynamicElements() {

    /*
       NÃO usamos replaceChildren()
       nos containers de vegetação.

       Isso poderia apagar elementos
       que deveriam permanecer.

       Em vez disso, removemos somente:

       .memory-flower
       .petal
    */

    document
        .querySelectorAll(
            ".memory-flower"
        )
        .forEach(
            flower => flower.remove()
        );


    if (
        elements.petalLayer
    ) {

        elements.petalLayer
            .replaceChildren();

    }


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
       Verifica estrutura.
    */

    verifyPageStructure();


    /*
       Limpa apenas elementos realmente
       dinâmicos.
    */

    cleanDynamicElements();


    /*
       Pré-carrega imagens.
    */

    preloadImages();


    /*
       Cria a vegetação.
    */

    populateAllHills();


    /*
       MUITO IMPORTANTE:

       Nenhum girassol de memória
       é criado aqui.

       Eles só aparecem após o clique
       no girassol principal.
    */

    startLadybug();

}


/* =========================================================
   IMPEDIR ARRASTAR IMAGENS
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