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
/* =========================================================
   GABI MOMENTS — V12
   SCRIPT.JS — PARTE 2/3
========================================================= */


/* =========================================================
   ELEMENTOS DOS MODAIS
========================================================= */

const memoryModal =
    document.getElementById("memory-modal");

const memoryImage =
    document.getElementById("memory-image");

const memoryCaption =
    document.getElementById("memory-caption");

const memoryCounter =
    document.getElementById("memory-counter");

const memoryClose =
    document.getElementById("memory-close");


const ladybugModal =
    document.getElementById("ladybug-modal");

const ladybugClose =
    document.getElementById("ladybug-close");


/* =========================================================
   ABRIR MODAL
========================================================= */

function showModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function hideModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    const memoryOpen =
        memoryModal &&
        memoryModal.classList.contains("show");


    const ladybugOpen =
        ladybugModal &&
        ladybugModal.classList.contains("show");


    if (
        !memoryOpen &&
        !ladybugOpen
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   ABRIR MEMÓRIA
========================================================= */

function openMemory(index) {

    if (
        !memoryModal ||
        !memoryImage
    ) {

        return;

    }


    /*
     * Segurança contra índices inválidos.
     */

    if (
        index < 0 ||
        index >= CONFIG.photos.length
    ) {

        return;

    }


    memoryImage.src =
        CONFIG.photos[index];


    memoryImage.alt =
        `Foto da lembrança ${index + 1}`;


    if (memoryCaption) {

        memoryCaption.textContent =
            CONFIG.captions[index] ||
            "";

    }


    if (memoryCounter) {

        memoryCounter.textContent =
            `${index + 1} / ${CONFIG.photos.length}`;

    }


    showModal(
        memoryModal
    );

}


/* =========================================================
   FECHAR MEMÓRIA
========================================================= */

function closeMemory() {

    hideModal(
        memoryModal
    );

}


/* =========================================================
   ABRIR JOANINHA
========================================================= */

function openLadybugModal() {

    showModal(
        ladybugModal
    );

}


/* =========================================================
   FECHAR JOANINHA
========================================================= */

function closeLadybugModal() {

    hideModal(
        ladybugModal
    );

}


/* =========================================================
   EVENTOS DOS BOTÕES
========================================================= */

if (memoryClose) {

    memoryClose.addEventListener(
        "click",
        closeMemory
    );

}


if (ladybugClose) {

    ladybugClose.addEventListener(
        "click",
        closeLadybugModal
    );

}


/* =========================================================
   CLICAR FORA DO CARTÃO
========================================================= */

if (memoryModal) {

    memoryModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                memoryModal
            ) {

                closeMemory();

            }

        }
    );

}


if (ladybugModal) {

    ladybugModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                ladybugModal
            ) {

                closeLadybugModal();

            }

        }
    );

}


/* =========================================================
   ESC FECHA QUALQUER MODAL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeMemory();

        closeLadybugModal();

    }
);


/* =========================================================
   PÉTALA INDIVIDUAL
========================================================= */

function createPetal() {

    if (!petalLayer) {

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
        pick([

            "#fff7c7",
            "#fff0a1",
            "#ffe47a",
            "#fffbe0"

        ]);


    petal.style.opacity =
        random(.6, .95);


    petalLayer.appendChild(
        petal
    );


    const duration =
        random(3.5, 6);


    const drift =
        random(-140, 140);


    const rotation =
        random(
            260,
            720
        );


    const animation =
        petal.animate(

            [

                {
                    transform:
                        `
                        translate3d(
                            0,
                            -30px,
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

function flowerBurst() {

    /*
     * Pequena explosão inicial.
     */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 45
        );

    }


    /*
     * Depois algumas pétalas continuam
     * caindo por alguns segundos.
     */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            createPetal,
            900 + i * 230
        );

    }

}


/* =========================================================
   GIRASSOL PRINCIPAL
========================================================= */

if (mainFlower) {

    mainFlower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            flowerBurst();

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
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   FIM DA PARTE 2/3
========================================================= */