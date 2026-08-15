/* =========================================================
   GABI MOMENTS
   SCRIPT.JS — VERSÃO NOVA E LIMPA

   MECÂNICA:

   1. O site começa com apenas o girassol principal.
   2. Clique no girassol grande.
   3. Nasce UM girassol novo.
   4. A memória correspondente abre automaticamente.
   5. O girassol permanece no jardim.
   6. Clicar nele depois abre a mesma memória.
   7. Após as 3 memórias, nenhum quarto girassol é criado.
   8. A joaninha anda pelo jardim.
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const CONFIG = {

    /* Fotos das memórias */

    photos: [
        "imagem/foto1.jpg",
        "imagem/foto2.jpg",
        "imagem/foto3.jpg"
    ],


    /* Textos das memórias */

    captions: [
        "Uma lembrança especial. 🌻",
        "Um momento que merece ficar guardado. 💛",
        "Mais uma memória bonita. ☀️"
    ],


    /* Imagens usadas apenas na decoração */

    decorationImages: [
        "imagem/grama1.png",
        "imagem/grama2.png",
        "imagem/margarida.png",
        "imagem/tulipa.png"
    ],


    /* Girassóis que podem nascer */

    flowerPositions: [

        {
            container: "memory-far",
            left: 38,
            bottom: 42,
            size: 52
        },

        {
            container: "memory-back",
            left: 68,
            bottom: 48,
            size: 56
        },

        {
            container: "memory-middle",
            left: 25,
            bottom: 55,
            size: 62
        },

        {
            container: "memory-middle",
            left: 72,
            bottom: 50,
            size: 58
        },

        {
            container: "memory-front",
            left: 28,
            bottom: 54,
            size: 68
        },

        {
            container: "memory-front",
            left: 72,
            bottom: 48,
            size: 64
        }

    ]

};


/* =========================================================
   REFERÊNCIAS DO HTML
========================================================= */

const elements = {

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
   ESTADO
========================================================= */

const state = {

    /*
       Número da próxima memória que será criada.

       0 = primeira
       1 = segunda
       2 = terceira
    */

    nextMemory: 0,


    /*
       Impede dois cliques muito rápidos
       no girassol principal.
    */

    creating: false,


    /*
       Guarda os girassóis que já nasceram.
    */

    flowers: [],


    /*
       Posições já utilizadas.
    */

    usedPositions: new Set()

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
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   ENCONTRAR CONTAINER DE MEMÓRIA
========================================================= */

function getMemoryContainer(id) {

    return document.getElementById(id);

}


/* =========================================================
   ESCOLHER POSIÇÃO
========================================================= */

function chooseFlowerPosition() {

    const available =
        CONFIG.flowerPositions.filter(
            (_, index) => {

                return !state.usedPositions.has(
                    index
                );

            }
        );


    /*
       Temos mais posições do que memórias.

       Portanto, normalmente sempre haverá
       uma posição livre.
    */

    if (available.length === 0) {

        return null;

    }


    const selected =
        choose(available);


    const index =
        CONFIG.flowerPositions.indexOf(
            selected
        );


    state.usedPositions.add(index);


    return selected;

}


/* =========================================================
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    memoryIndex
) {

    const position =
        chooseFlowerPosition();


    /*
       Proteção contra erro.
    */

    if (!position) {

        console.error(
            "Não foi possível encontrar uma posição para o girassol."
        );

        return null;

    }


    const container =
        getMemoryContainer(
            position.container
        );


    if (!container) {

        console.error(
            "Container de memória não encontrado:",
            position.container
        );

        return null;

    }


    /*
       Criamos a imagem.
    */

    const flower =
        document.createElement("img");


    flower.className =
        "memory-flower";


    flower.src =
        "imagem/girassol.png";


    flower.alt =
        `Girassol da memória ${memoryIndex + 1}`;


    flower.draggable =
        false;


    flower.dataset.memoryIndex =
        memoryIndex;


    /*
       Posição dentro do morro.
    */

    flower.style.left =
        `${position.left}%`;


    flower.style.bottom =
        `${position.bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${position.size}px`
    );


    /*
       Começa invisível.
    */

    flower.style.opacity =
        "0";


    flower.style.transform =
        "translateX(-50%) scale(0)";


    /*
       Colocamos SOMENTE dentro
       do container de memória.

       Nunca dentro da vegetação.
    */

    container.appendChild(
        flower
    );


    /*
       Clique no girassol já descoberto.
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


    /*
       Faz o girassol nascer.
    */

    requestAnimationFrame(
        () => {

            flower.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            "translateX(-50%) scale(0) rotate(-10deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(-50%) scale(1.18) rotate(4deg)"
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
       Guardamos referência.
    */

    state.flowers.push(
        flower
    );


    return flower;

}


/* =========================================================
   DESCOBRIR PRÓXIMA MEMÓRIA
========================================================= */

function discoverNextMemory() {

    /*
       Já descobriu todas?
       Então não fazemos absolutamente nada.
    */

    if (
        state.nextMemory >=
        CONFIG.photos.length
    ) {

        return;

    }


    /*
       Proteção contra duplo clique.
    */

    if (
        state.creating
    ) {

        return;

    }


    state.creating =
        true;


    const memoryIndex =
        state.nextMemory;


    /*
       Criamos o girassol.
    */

    const flower =
        createMemoryFlower(
            memoryIndex
        );


    /*
       Se algo deu errado,
       não avançamos a memória.
    */

    if (!flower) {

        state.creating =
            false;

        return;

    }


    /*
       Agora essa memória foi descoberta.
    */

    state.nextMemory++;


    /*
       Pequena espera para o nascimento
       da flor ficar visível antes da foto.
    */

    window.setTimeout(
        () => {

            openMemory(
                memoryIndex
            );


            state.creating =
                false;

        },

        700
    );

}


/* =========================================================
   ABRIR MEMÓRIA
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


    /*
       Proteção contra índice inválido.
    */

    if (
        index < 0 ||
        index >= CONFIG.photos.length
    ) {

        return;

    }


    /*
       Troca a imagem.
    */

    image.src =
        CONFIG.photos[index];


    image.alt =
        `Foto da memória ${index + 1}`;


    /*
       Texto.
    */

    if (
        elements.memoryCaption
    ) {

        elements.memoryCaption.textContent =
            CONFIG.captions[index] || "";

    }


    /*
       Contador.
    */

    if (
        elements.memoryCounter
    ) {

        elements.memoryCounter.textContent =
            `${index + 1} / ${CONFIG.photos.length}`;

    }


    /*
       Mostra o modal.
    */

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


    updateBodyScroll();

}


/* =========================================================
   ABRIR JOANINHA
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


/* =========================================================
   FECHAR JOANINHA
========================================================= */

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


    updateBodyScroll();

}


/* =========================================================
   CONTROLE DO SCROLL
========================================================= */

function updateBodyScroll() {

    const memoryOpen =
        elements.memoryModal &&
        elements.memoryModal.classList.contains(
            "show"
        );


    const ladybugOpen =
        elements.ladybugModal &&
        elements.ladybugModal.classList.contains(
            "show"
        );


    if (
        memoryOpen ||
        ladybugOpen
    ) {

        document.body.style.overflow =
            "hidden";

    } else {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   FECHAR BOTÃO — MEMÓRIA
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
   FECHAR BOTÃO — JOANINHA
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
   CLICAR FORA DA MEMÓRIA
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


/* =========================================================
   CLICAR FORA DA JOANINHA
========================================================= */

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
   GIRASSOL PRINCIPAL
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
                state.nextMemory <
                CONFIG.photos.length
            ) {

                discoverNextMemory();

                createPetalBurst();

            } else {

                /*
                   Acabaram as memórias.

                   Não criamos mais girassóis.
                   Apenas fazemos a animação
                   das pétalas.
                */

                createPetalBurst();

            }

        }
    );

}


/* =========================================================
   JOANINHA
========================================================= */

const ladybugState = {

    x: 12,

    direction: 1,

    speed: .024,

    walking: true,

    pauseUntil: 0,

    nextPause: 0

};


const ladybugLimits = {

    min: 7,

    max: 88

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
        `scaleX(${ladybugState.direction})`;

}


/* =========================================================
   AGENDAR PAUSA
========================================================= */

function scheduleLadybugPause(
    time
) {

    ladybugState.nextPause =
        time +
        random(
            3500,
            7000
        );

}


/* =========================================================
   PAUSAR JOANINHA
========================================================= */

function pauseLadybug(
    time
) {

    ladybugState.walking =
        false;

    ladybugState.pauseUntil =
        time +
        random(
            900,
            2200
        );

}


/* =========================================================
   ATUALIZAR JOANINHA
========================================================= */

function updateLadybug(
    time
) {

    if (
        !elements.ladybug
    ) {

        return;

    }


    /*
       Está parada?
    */

    if (
        !ladybugState.walking
    ) {

        if (
            time >=
            ladybugState.pauseUntil
        ) {

            /*
               Às vezes muda de direção.
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
                time
            );

        }


        updateLadybugVisual();

        return;

    }


    /*
       Caminha.
    */

    ladybugState.x +=
        ladybugState.speed *
        ladybugState.direction;


    /*
       Limite direito.
    */

    if (
        ladybugState.x >=
        ladybugLimits.max
    ) {

        ladybugState.x =
            ladybugLimits.max;

        ladybugState.direction =
            -1;

        pauseLadybug(
            time
        );

    }


    /*
       Limite esquerdo.
    */

    if (
        ladybugState.x <=
        ladybugLimits.min
    ) {

        ladybugState.x =
            ladybugLimits.min;

        ladybugState.direction =
            1;

        pauseLadybug(
            time
        );

    }


    /*
       Pausa aleatória.
    */

    if (
        time >=
        ladybugState.nextPause
    ) {

        pauseLadybug(
            time
        );

    }


    updateLadybugVisual();

}


/* =========================================================
   LOOP DA JOANINHA
========================================================= */

function ladybugLoop(
    time
) {

    updateLadybug(
        time
    );


    requestAnimationFrame(
        ladybugLoop
    );

}


/* =========================================================
   CLIQUE NA JOANINHA
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
               Para temporariamente.
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
        ladybugLoop
    );

}


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
        random(
            7,
            14
        );


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
        random(
            .65,
            .95
        );


    elements.petalLayer.appendChild(
        petal
    );


    const drift =
        random(
            -130,
            130
        );


    const rotation =
        random(
            260,
            720
        );


    const duration =
        random(
            3.8,
            6.2
        );


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
                        rotate(${rotation}deg)
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
   EXPLOSÃO DE PÉTALAS
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

        window.setTimeout(
            createPetal,
            i * 45
        );

    }

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
   VEGETAÇÃO
========================================================= */

const vegetationAmount = {

    "vegetation-far": 6,

    "vegetation-back": 9,

    "vegetation-middle": 13,

    "vegetation-front": 17

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
        type;


    plant.src =
        choose(
            CONFIG.decorationImages
        );


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


    plant.style.setProperty(
        "--scale",
        random(.78, 1.08)
    );


    plant.style.animationDelay =
        `${random(-5, 0)}s`;


    container.appendChild(
        plant
    );

}


/* =========================================================
   CRIAR VEGETAÇÃO DE UM MORRO
========================================================= */

function populateVegetation(
    id,
    amount
) {

    const container =
        document.getElementById(id);


    if (!container) {

        return;

    }


    container.replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        /*
           Algumas plantas são flores
           decorativas.

           Nenhuma delas é girassol.
        */

        const type =
            Math.random() < .24
                ? "flower"
                : "grass";


        createPlant(
            container,
            type
        );

    }

}


/* =========================================================
   CRIAR TODA VEGETAÇÃO
========================================================= */

function populateGarden() {

    Object.entries(
        vegetationAmount
    ).forEach(
        ([id, amount]) => {

            populateVegetation(
                id,
                amount
            );

        }
    );

}


/* =========================================================
   LIMPAR GIRASSÓIS ANTIGOS
========================================================= */

function cleanMemoryContainers() {

    const containers = [

        "memory-far",

        "memory-back",

        "memory-middle",

        "memory-front"

    ];


    containers.forEach(
        id => {

            const container =
                document.getElementById(id);


            if (container) {

                container.replaceChildren();

            }

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function initialize() {

    /*
       Primeiro garantimos que não exista
       nenhum girassol de memória antigo.
    */

    cleanMemoryContainers();


    /*
       Resetamos o estado.
    */

    state.nextMemory =
        0;

    state.creating =
        false;

    state.flowers =
        [];

    state.usedPositions.clear();


    /*
       Criamos apenas a vegetação.
    */

    populateGarden();


    /*
       Pré-carregamos as imagens.
    */

    preloadImages();


    /*
       Iniciamos a joaninha.
    */

    startLadybug();


    console.log(
        "Gabi Moments iniciado corretamente."
    );

}


/* =========================================================
   BLOQUEAR ARRASTAMENTO DE IMAGENS
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
        initialize,
        {
            once: true
        }
    );

} else {

    initialize();

}