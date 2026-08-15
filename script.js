/* =========================================================
   GABI MOMENTS
   SCRIPT.JS — VERSÃO ESTÁVEL

   MECÂNICA:

   1. Nenhum girassol de memória nasce ao carregar.
   2. Clique no girassol principal.
   3. Um novo girassol nasce no jardim.
   4. A memória correspondente abre automaticamente.
   5. O girassol permanece no jardim.
   6. O próximo clique cria o próximo.
   7. Depois da última memória, não cria flores extras.

   JOANINHA:
   - anda pelo jardim;
   - para aleatoriamente;
   - muda de direção;
   - pode ser clicada;
   - para enquanto o modal está aberto.
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
   REFERÊNCIAS
========================================================= */

const $ = id =>
    document.getElementById(id);


const elements = {

    garden:
        $("garden"),

    mainFlower:
        $("main-flower"),

    ladybug:
        $("ladybug"),

    petalLayer:
        $("petal-layer"),

    memoryMiddle:
        $("memory-middle"),

    memoryFront:
        $("memory-front"),

    memoryModal:
        $("memory-modal"),

    memoryImage:
        $("memory-image"),

    memoryCaption:
        $("memory-caption"),

    memoryCounter:
        $("memory-counter"),

    memoryClose:
        $("memory-close"),

    ladybugModal:
        $("ladybug-modal"),

    ladybugClose:
        $("ladybug-close")

};


/* =========================================================
   MORROS
========================================================= */

const hills = {

    far: {
        element:
            $("hill-far"),

        vegetation:
            $("vegetation-far")
    },

    back: {
        element:
            $("hill-back"),

        vegetation:
            $("vegetation-back")
    },

    middle: {
        element:
            $("hill-middle"),

        vegetation:
            $("vegetation-middle")
    },

    front: {
        element:
            $("hill-front"),

        vegetation:
            $("vegetation-front")
    }

};


/* =========================================================
   ESTADO
========================================================= */

const gardenState = {

    memoriesFound: 0,

    creatingFlower: false,

    initialized: false

};


/* =========================================================
   POSIÇÕES DOS GIRASSÓIS
========================================================= */

/*
   IMPORTANTE:

   As posições são relativas AO MORRO.

   O girassol é criado dentro da camada
   de memória do respectivo morro.

   Isso impede que ele apareça no céu
   ou fique preso no lugar errado.
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


const usedFlowerPositions =
    new Set();


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
   FUNÇÕES UTILITÁRIAS
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
   ESCOLHER POSIÇÃO
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions
            .map(
                (position, index) => ({
                    position,
                    index
                })
            )
            .filter(
                item =>
                    !usedFlowerPositions
                        .has(item.index)
            );


    if (
        available.length === 0
    ) {

        return null;

    }


    const selected =
        choose(available);


    usedFlowerPositions.add(
        selected.index
    );


    return selected.position;

}


/* =========================================================
   VEGETAÇÃO
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


    plant.alt = "";

    plant.draggable = false;

    plant.setAttribute(
        "aria-hidden",
        "true"
    );


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
   ENCONTRAR CAMADA DE MEMÓRIA
========================================================= */

function getMemoryLayer(
    hillName
) {

    /*
       O HTML possui memory-middle e
       memory-front.

       Para os morros distante/traseiro,
       usamos diretamente a vegetação,
       pois eles não possuem memory-layer
       no HTML enviado.

       Assim não precisamos alterar o HTML.
    */

    if (
        hillName === "middle"
    ) {

        return elements.memoryMiddle;

    }


    if (
        hillName === "front"
    ) {

        return elements.memoryFront;

    }


    if (
        hills[hillName] &&
        hills[hillName].vegetation
    ) {

        return hills[hillName].vegetation;

    }


    return null;

}


/* =========================================================
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    memoryIndex,
    spawn
) {

    if (!spawn) {

        console.error(
            "Não foi possível encontrar posição para o girassol."
        );

        return null;

    }


    const layer =
        getMemoryLayer(
            spawn.hill
        );


    if (!layer) {

        console.error(
            "Camada do girassol não encontrada:",
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


    flower.draggable = false;


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
       Começa invisível.
    */

    flower.style.opacity =
        "0";


    /*
       Adicionamos primeiro ao DOM.
    */

    layer.appendChild(
        flower
    );


    /*
       Animação de nascimento.

       Usamos WAAPI somente aqui.
       Depois da animação, retiramos
       o transform inline para não
       brigar com o CSS.
    */

    const animation =
        flower.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) scale(.05) rotate(-8deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) scale(1.15) rotate(4deg)"
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
                    "cubic-bezier(.2,.85,.2,1)",

                fill:
                    "forwards"
            }

        );


    animation.finished
        .then(
            () => {

                /*
                   Deixamos o CSS assumir
                   novamente o controle da flor.
                */

                flower.style.opacity =
                    "1";

                flower.style.transform =
                    "";

            }
        )
        .catch(
            () => {

                flower.style.opacity =
                    "1";

                flower.style.transform =
                    "";

            }
        );


    /*
       Clique no girassol já descoberto.
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
   DESCOBRIR MEMÓRIA
========================================================= */

function discoverNextMemory() {

    /*
       Já descobriu todas.
    */

    if (
        gardenState.memoriesFound >=
        CONFIG.photos.length
    ) {

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


    gardenState.memoriesFound++;


    /*
       A flor tem 850 ms para nascer.
       Abrimos a memória logo depois.
    */

    setTimeout(
        () => {

            openMemory(
                memoryIndex
            );


            gardenState.creatingFlower =
                false;

        },
        850
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


    updateBodyScroll();

}


/* =========================================================
   JOANINHA — ESTADO
========================================================= */

const ladybugState = {

    x: 12,

    direction: 1,

    walking: true,

    pauseUntil: 0,

    nextPause: 0,

    speed: .026

};


const ladybugLimits = {

    minX: 7,

    maxX: 88

};


/* =========================================================
   JOANINHA — VISUAL
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
   JOANINHA — PAUSA
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
   JOANINHA — ATUALIZAÇÃO
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
       Se algum modal estiver aberto,
       a joaninha fica parada.
    */

    const modalOpen =
        elements.memoryModal?.classList.contains("show") ||
        elements.ladybugModal?.classList.contains("show");


    if (modalOpen) {

        updateLadybugVisual();

        return;

    }


    /*
       Se estava parada, verifica
       se já pode continuar.
    */

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


    /*
       Movimento.
    */

    ladybugState.x +=
        ladybugState.speed *
        ladybugState.direction;


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


    requestAnimationFrame(
        ladybugAnimationLoop
    );

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


    ladybugState.walking =
        false;


    ladybugState.pauseUntil =
        performance.now() + 2500;


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


    ladybugState.pauseUntil =
        performance.now() + 1000;


    updateBodyScroll();

}


/* =========================================================
   CONTROLE DO SCROLL
========================================================= */

function updateBodyScroll() {

    const memoryOpen =
        elements.memoryModal?.classList.contains("show");


    const ladybugOpen =
        elements.ladybugModal?.classList.contains("show");


    document.body.style.overflow =
        memoryOpen || ladybugOpen
            ? "hidden"
            : "";

}


/* =========================================================
   BOTÃO — FECHAR MEMÓRIA
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
   BOTÃO — FECHAR JOANINHA
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
   CLICAR NO FUNDO DO MODAL
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

    if (
        !elements.petalLayer
    ) {

        return;

    }


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
               Ainda existem memórias.
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
               Todas já foram descobertas.

               Não criamos mais girassóis.
               Apenas fazemos as pétalas.
            */

            createPetalBurst();

        }
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

            openLadybugModal();

        }
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
   LIMPAR APENAS ELEMENTOS DINÂMICOS
========================================================= */

function cleanDynamicElements() {

    /*
       Vegetação inicial.
    */

    Object.values(hills)
        .forEach(
            hill => {

                if (
                    hill?.vegetation
                ) {

                    hill.vegetation
                        .replaceChildren();

                }

            }
        );


    /*
       Camadas de memória.

       Aqui está uma diferença importante:

       Não apagamos o girassol principal.
       Não apagamos a joaninha.
       Não apagamos o HTML dos modais.
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


    gardenState.memoriesFound =
        0;


    gardenState.creatingFlower =
        false;


    usedFlowerPositions.clear();

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

        "memoryModal",

        "memoryImage",

        "memoryClose",

        "ladybugModal",

        "ladybugClose"

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


    return true;

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function initializeGarden() {

    if (
        gardenState.initialized
    ) {

        return;

    }


    gardenState.initialized =
        true;


    if (
        !verifyPageStructure()
    ) {

        return;

    }


    /*
       Primeiro limpamos tudo
       que for dinâmico.
    */

    cleanDynamicElements();


    /*
       Depois criamos somente
       a vegetação decorativa.
    */

    populateAllHills();


    /*
       Pré-carregamos as imagens.
    */

    preloadImages();


    /*
       Posicionamos a joaninha.
    */

    ladybugState.x =
        12;

    ladybugState.direction =
        1;

    ladybugState.walking =
        true;


    const now =
        performance.now();


    scheduleLadybugPause(
        now
    );


    updateLadybugVisual();


    /*
       Começamos o movimento.
    */

    requestAnimationFrame(
        ladybugAnimationLoop
    );

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
   INICIAR
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
   FIM DO SCRIPT
========================================================= */