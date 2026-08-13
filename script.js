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
/* =========================================================
   GABI MOMENTS — NOVA VERSÃO
   SCRIPT.JS — PARTE 2/3
   Memórias + modais + pétalas
========================================================= */


/* =========================================================
   MODAL DE MEMÓRIA
========================================================= */

function openMemory(index) {

    const modal =
        elements.memoryModal;

    const image =
        elements.memoryImage;


    if (!modal || !image) {
        return;
    }


    /*
       Impede índices inexistentes.
    */

    if (
        index < 0 ||
        index >= CONFIG.photos.length
    ) {

        return;
    }


    /*
       Carrega a foto correspondente.
    */

    image.src =
        CONFIG.photos[index];


    image.alt =
        `Foto da lembrança ${index + 1}`;


    /*
       Texto correspondente.
    */

    if (elements.memoryCaption) {

        elements.memoryCaption.textContent =
            CONFIG.captions[index] || "";

    }


    /*
       Contador.
    */

    if (elements.memoryCounter) {

        elements.memoryCounter.textContent =
            `${index + 1} / ${CONFIG.photos.length}`;

    }


    /*
       Abre o modal.
    */

    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR MODAL DE MEMÓRIA
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


    /*
       Só devolve o scroll se não houver
       outro modal aberto.
    */

    if (
        !elements.ladybugModal ||
        !elements.ladybugModal.classList.contains("show")
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


/* =========================================================
   FECHAR MODAL DA JOANINHA
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


    if (
        !elements.memoryModal ||
        !elements.memoryModal.classList.contains("show")
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   BOTÃO DE FECHAR — MEMÓRIA
========================================================= */

if (elements.memoryClose) {

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

if (elements.ladybugClose) {

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

if (elements.memoryModal) {

    elements.memoryModal.addEventListener(
        "click",
        event => {

            /*
               Só fecha quando o clique acontece
               diretamente no fundo.

               Clicar na foto ou no cartão
               não fecha.
            */

            if (
                event.target ===
                elements.memoryModal
            ) {

                closeMemory();

            }

        }
    );

}


if (elements.ladybugModal) {

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
   TECLA ESC
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
   PÉTALA
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


    /*
       Tamanho.
    */

    const size =
        random(7, 14);


    petal.style.width =
        `${size}px`;


    petal.style.height =
        `${size * 1.45}px`;


    /*
       Começa em uma posição aleatória
       no topo da tela.
    */

    petal.style.left =
        `${random(0, 100)}vw`;


    /*
       Variação de cor.
    */

    petal.style.background =
        choose([

            "#fff9d1",
            "#fff0a4",
            "#ffe680",
            "#fffbe8"

        ]);


    petal.style.opacity =
        random(.65, .95);


    /*
       Movimento lateral.
    */

    const drift =
        random(-130, 130);


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
                        `
                        translate3d(
                            0,
                            -35px,
                            0
                        )
                        rotate(0deg)
                        `,

                    opacity:
                        petal.style.opacity
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

                    opacity:
                        0
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


    layer.appendChild(
        petal
    );


    /*
       Remove a pétala quando terminar.
    */

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

    /*
       Quantidade moderada para não
       pesar no celular.
    */

    const amount =
        randomInt(
            16,
            22
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
   GIRASSOL PRINCIPAL
========================================================= */

if (elements.mainFlower) {

    elements.mainFlower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
               O girassol principal não abre foto.

               Ele apenas cria a pequena
               chuva de pétalas.
            */

            createPetalBurst();

        }
    );

}


/* =========================================================
   BLOQUEAR ARRASTAR IMAGENS
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
   FIM DA PARTE 2/3
========================================================= */
/* =========================================================
   GABI MOMENTS — NOVA VERSÃO
   SCRIPT.JS — PARTE 3/3
   Joaninha + inicialização + segurança
========================================================= */


/* =========================================================
   ESTADO DA JOANINHA
========================================================= */

const ladybugState = {

    x: 12,

    direction: 1,

    walking: true,

    pauseUntil: 0,

    nextPause: 0,

    speed: 0.028

};


/* =========================================================
   LIMITES DA JOANINHA
========================================================= */

const ladybugLimits = {

    minX: 7,

    maxX: 88

};


/* =========================================================
   POSIÇÃO DA JOANINHA
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
       A joaninha fica no terreno frontal.
       O CSS controla a altura dela.
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
            3000,
            6500
        );

}


/* =========================================================
   FAZER JOANINHA PARAR
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
            2200
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
       Quando está parada,
       aguardamos o fim da pausa.
    */

    if (
        !ladybugState.walking
    ) {

        if (
            currentTime >=
            ladybugState.pauseUntil
        ) {

            /*
               Existe uma pequena chance
               de ela mudar de direção.
            */

            if (
                Math.random() < .45
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
       Movimento normal.
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
       Pausa espontânea no caminho.
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
   CLIQUE NA JOANINHA
========================================================= */

if (elements.ladybug) {

    elements.ladybug.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /*
               Para a joaninha durante
               a abertura da lembrança.
            */

            ladybugState.walking =
                false;


            ladybugState.pauseUntil =
                performance.now() +
                2800;


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
   VERIFICAÇÃO DOS ELEMENTOS
========================================================= */

function verifyPageStructure() {

    const requiredElements = [

        "garden",

        "mainFlower",

        "ladybug",

        "petalLayer",

        "memoryMiddle",

        "memoryFront",

        "memoryModal",

        "memoryImage",

        "ladybugModal"

    ];


    const missing = [];


    requiredElements.forEach(
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
            "Gabi Moments: elementos ausentes:",
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
       Isso evita duplicação caso o script
       seja executado novamente.
    */

    const containers = [

        hills.far.vegetation,

        hills.back.vegetation,

        hills.middle.vegetation,

        hills.front.vegetation,

        elements.memoryMiddle,

        elements.memoryFront

    ];


    containers.forEach(
        container => {

            if (container) {

                container.replaceChildren();

            }

        }
    );


    /*
       Remove pétalas antigas.
    */

    if (
        elements.petalLayer
    ) {

        elements.petalLayer
            .replaceChildren();

    }

}


/* =========================================================
   INICIALIZAR JARDIM
========================================================= */

function initializeGarden() {

    /*
       Verificação primeiro.
    */

    verifyPageStructure();


    /*
       Limpa elementos dinâmicos.
    */

    cleanDynamicElements();


    /*
       Carrega imagens antes de
       criar o cenário.
    */

    preloadImages();


    /*
       Cria a vegetação.
    */

    populateAllHills();


    /*
       Cria os três girassóis.
    */

    createMemoryFlowers();


    /*
       Inicia a joaninha por último.
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
   FIM DO SCRIPT.JS — NOVA VERSÃO
========================================================= */