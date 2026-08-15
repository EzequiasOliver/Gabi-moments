/* =========================================================
   GABI MOMENTS
   SCRIPT.JS — VERSÃO ESTÁVEL

   MECÂNICA:

   Girassol grande
        ↓
      clique
        ↓
   nasce 1 girassol
        ↓
   memória abre automaticamente

   IMPORTANTE:
   Nenhum girassol de memória existe ao carregar
   a página.
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

    /* Plantas realmente usadas como vegetação */
    grassImages: [
        "imagem/grama1.png",
        "imagem/grama2.png"
    ],

    /* Flores decorativas */
    flowerImages: [
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
            document.getElementById("memory-far")
    },

    back: {
        element:
            document.getElementById("hill-back"),

        vegetation:
            document.getElementById("vegetation-back"),

        memory:
            document.getElementById("memory-back")
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
   POSIÇÕES DOS GIRASSÓIS DE MEMÓRIA
========================================================= */

/*
   Cada posição é usada somente uma vez.

   left:
   posição horizontal dentro do morro.

   bottom:
   distância do fundo do morro.

   size:
   tamanho do girassol.
*/

const flowerSpawnPositions = [

    {
        hill: "far",
        left: 34,
        bottom: 32,
        size: 48
    },

    {
        hill: "back",
        left: 67,
        bottom: 38,
        size: 52
    },

    {
        hill: "middle",
        left: 27,
        bottom: 45,
        size: 60
    },

    {
        hill: "middle",
        left: 73,
        bottom: 40,
        size: 56
    },

    {
        hill: "front",
        left: 29,
        bottom: 48,
        size: 66
    },

    {
        hill: "front",
        left: 72,
        bottom: 43,
        size: 62
    }

];


const usedFlowerPositions =
    new Set();


/* =========================================================
   QUANTIDADE DE VEGETAÇÃO
========================================================= */

const vegetationAmount = {

    far: 7,

    back: 10,

    middle: 14,

    front: 18

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
            (_, index) =>
                !usedFlowerPositions.has(index)
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


    if (
        index >= 0
    ) {

        usedFlowerPositions.add(index);

    }


    return selected;

}


/* =========================================================
   CRIAR VEGETAÇÃO
========================================================= */

function createPlant(
    container,
    type
) {

    if (!container) {

        return null;

    }


    const image =
        document.createElement("img");


    image.classList.add(
        type === "flower"
            ? "flower"
            : "grass"
    );


    /*
       GRAMA E FLORES AGORA POSSUEM
       LISTAS SEPARADAS.

       Isso evita que uma "grama"
       receba acidentalmente a imagem
       de um girassol, tulipa etc.
    */

    const source =
        type === "flower"
            ? choose(CONFIG.flowerImages)
            : choose(CONFIG.grassImages);


    if (!source) {

        return null;

    }


    image.src =
        source;


    image.alt =
        "";


    image.draggable =
        false;


    image.style.left =
        `${random(4, 96)}%`;


    image.style.bottom =
        `${random(4, 46)}px`;


    image.style.setProperty(
        "--rotation",
        `${random(-8, 8)}deg`
    );


    image.style.setProperty(
        "--wind-speed",
        `${random(3.8, 6.5)}s`
    );


    image.style.animationDelay =
        `${random(-5, 0)}s`;


    /*
       Usamos transform para a escala,
       porque o CSS já trabalha com transform.
       O scale separado poderia causar
       conflitos dependendo do navegador.
    */

    const scale =
        random(.78, 1.08);


    image.style.transform =
        `
        translateX(-50%)
        rotate(
            ${image.style.getPropertyValue(
                "--rotation"
            )}
        )
        scale(${scale})
        `;


    container.appendChild(
        image
    );


    return image;

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


    hill.vegetation.replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        /*
           Maioria será grama.
           Algumas serão flores decorativas.
        */

        const type =
            Math.random() < .22
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

    if (
        !spawn
    ) {

        return null;

    }


    const hill =
        hills[spawn.hill];


    if (
        !hill ||
        !hill.memory
    ) {

        console.error(
            "Gabi Moments: morro inválido para memória.",
            spawn.hill
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
        `Abrir lembrança ${memoryIndex + 1}`;


    flower.draggable =
        false;


    flower.dataset.memoryIndex =
        String(memoryIndex);


    flower.style.left =
        `${spawn.left}%`;


    flower.style.bottom =
        `${spawn.bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${spawn.size}px`
    );


    /*
       A flor começa invisível.
    */

    flower.style.opacity =
        "0";


    /*
       Não usamos transform inline
       permanentemente.

       Isso evita conflito com
       a animação CSS da flor.
    */

    flower.style.transform =
        "translateX(-50%) scale(0)";


    hill.memory.appendChild(
        flower
    );


    /*
       Animação de nascimento.

       Depois da animação, removemos o
       transform inline para deixar o CSS
       assumir a animação normal.
    */

    const animation =
        flower.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) scale(0) rotate(-8deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) scale(1.12) rotate(3deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) scale(1) rotate(0deg)"
                }
            ],

            {
                duration: 850,

                easing:
                    "cubic-bezier(.2,.9,.2,1)"
            }

        );


    animation.finished
        .then(
            () => {

                /*
                   Entregamos o controle
                   novamente ao CSS.
                */

                flower.style.opacity =
                    "1";

                flower.style.transform =
                    "translateX(-50%)";

            }
        )
        .catch(
            () => {

                /*
                   Caso a animação seja
                   interrompida, a flor
                   continua visível.
                */

                flower.style.opacity =
                    "1";

                flower.style.transform =
                    "translateX(-50%)";

            }
        );


    /*
       Clique na flor descoberta
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
       Todas as memórias já foram
       descobertas.
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
       Impede duplo clique rápido.
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
            "Gabi Moments: não há posição disponível para o girassol."
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
       Agora sim contamos a memória.
    */

    gardenState.memoriesFound++;


    /*
       Espera a flor nascer um pouco
       antes de abrir a foto.
    */

    window.setTimeout(
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

        650
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


    if (
        !Number.isInteger(index) ||
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


    restoreBodyScroll();

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


    restoreBodyScroll();

}


/* =========================================================
   RESTAURAR ROLAGEM
========================================================= */

function restoreBodyScroll() {

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
        !memoryOpen &&
        !ladybugOpen
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   BOTÕES DOS MODAIS
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
   ESC FECHA MODAIS
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
        String(
            random(.65, .95)
        );


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
   EXPLOSÃO DE PÉTALAS
========================================================= */

function createPetalBurst() {

    const amount =
        randomInt(12, 18);


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
               Então cria a próxima.
            */

            if (
                gardenState.memoriesFound <
                CONFIG.photos.length
            ) {

                discoverNextMemory();

            }


            /*
               As pétalas acontecem em
               todos os cliques.
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

    lastTime: 0,

    speed:
        0.025

};


/* =========================================================
   LIMITES DA JOANINHA
========================================================= */

const ladybugLimits = {

    minX: 7,

    maxX: 88

};


/* =========================================================
   VISUAL DA JOANINHA
========================================================= */

function updateLadybugVisual() {

    const bug =
        elements.ladybug;


    if (!bug) {

        return;

    }


    bug.style.left =
        `${ladybugState.x}%`;


    bug.style.transform =
        `scaleX(${ladybugState.direction})`;

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

    const bug =
        elements.ladybug;


    if (!bug) {

        return;

    }


    /*
       Primeiro frame.
    */

    if (
        ladybugState.lastTime === 0
    ) {

        ladybugState.lastTime =
            currentTime;

    }


    /*
       Tempo real desde o último frame.
    */

    const delta =
        Math.min(
            currentTime -
            ladybugState.lastTime,

            50
        );


    ladybugState.lastTime =
        currentTime;


    /*
       Está parada?
    */

    if (
        !ladybugState.walking
    ) {

        if (
            currentTime >=
            ladybugState.pauseUntil
        ) {

            /*
               Pode trocar de direção
               quando volta a andar.
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
       Movimento baseado no tempo,
       não no número de frames.

       Isso deixa a velocidade muito
       mais consistente no celular.
    */

    ladybugState.x +=
        ladybugState.speed *
        ladybugState.direction *
        delta;


    /*
       Limite direito.
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
       Limite esquerdo.
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


    window.requestAnimationFrame(
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


    ladybugState.lastTime =
        now;


    scheduleLadybugPause(
        now
    );


    updateLadybugVisual();


    window.requestAnimationFrame(
        ladybugAnimationLoop
    );

}


/* =========================================================
   PRÉ-CARREGAR IMAGENS
========================================================= */

function preloadImages() {

    const sources = [

        ...CONFIG.photos,

        ...CONFIG.grassImages,

        ...CONFIG.flowerImages,

        CONFIG.sunflowerImage,

        CONFIG.ladybugImage,

        CONFIG.ladybugMemoryImage

    ];


    sources.forEach(
        source => {

            if (!source) {

                return;

            }


            const image =
                new Image();


            image.src =
                source;

        }
    );

}


/* =========================================================
   LIMPAR ELEMENTOS DINÂMICOS
========================================================= */

function cleanDynamicElements() {

    /*
       Vegetação.
    */

    Object.values(hills)
        .forEach(
            hill => {

                if (
                    hill.vegetation
                ) {

                    hill.vegetation
                        .replaceChildren();

                }

            }
        );


    /*
       Girassóis de memória.

       Isto é importante:

       ao recarregar a página,
       nenhum girassol antigo pode permanecer
       no HTML dinâmico.
    */

    Object.values(hills)
        .forEach(
            hill => {

                if (
                    hill.memory
                ) {

                    hill.memory
                        .replaceChildren();

                }

            }
        );


    /*
       Reinicia o estado.
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
   VERIFICAR ELEMENTOS IMPORTANTES
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

        "ladybugModal"

    ];


    const missing =
        required.filter(
            name =>
                !elements[name]
        );


    if (
        missing.length > 0
    ) {

        console.error(
            "Gabi Moments — elementos ausentes:",
            missing
        );

        return false;

    }


    const missingHills =
        Object.entries(hills)
            .filter(
                ([name, hill]) =>
                    !hill.element ||
                    !hill.vegetation ||
                    !hill.memory
            )
            .map(
                ([name]) => name
            );


    if (
        missingHills.length > 0
    ) {

        console.error(
            "Gabi Moments — estrutura dos morros incompleta:",
            missingHills
        );

        return false;

    }


    return true;

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
   INICIALIZAÇÃO
========================================================= */

function initializeGarden() {

    const valid =
        verifyPageStructure();


    if (!valid) {

        return;

    }


    /*
       Limpa qualquer coisa antiga.
    */

    cleanDynamicElements();


    /*
       Pré-carrega imagens.
    */

    preloadImages();


    /*
       Cria somente vegetação.
    */

    populateAllHills();


    /*
       IMPORTANTE:

       NÃO criamos nenhum girassol
       de memória aqui.

       Eles só aparecem depois
       do clique no girassol grande.
    */

    startLadybug();

}


/* =========================================================
   INICIAR QUANDO O HTML ESTIVER PRONTO
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