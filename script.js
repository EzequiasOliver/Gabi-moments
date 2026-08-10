/* =========================================================
   GABI MOMENTS — V11
   SCRIPT.JS
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const CONFIG = {

    memoryPhotos: [
        "imagem/foto1.jpg",
        "imagem/foto2.jpg",
        "imagem/foto3.jpg"
    ],

    memoryCaptions: [
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
   ELEMENTOS
========================================================= */

const garden =
    document.getElementById("garden");

const memoryFlowers =
    document.getElementById("memoryFlowers");

const mainFlower =
    document.getElementById("mainFlower");

const ladybug =
    document.getElementById("ladybug");

const petalLayer =
    document.getElementById("petalLayer");


const memoryModal =
    document.getElementById("memoryModal");

const memoryImage =
    document.getElementById("memoryImage");

const memoryCaption =
    document.getElementById("memoryCaption");

const memoryCounter =
    document.getElementById("memoryCounter");

const closeMemory =
    document.getElementById("closeMemory");


const ladybugModal =
    document.getElementById("ladybugModal");

const closeLadybug =
    document.getElementById("closeLadybug");


/* =========================================================
   MORROS
========================================================= */

const hills = [

    {
        element: document.getElementById("hillFar"),
        decoration: document.getElementById("decorFar")
    },

    {
        element: document.getElementById("hillBack"),
        decoration: document.getElementById("decorBack")
    },

    {
        element: document.getElementById("hillMiddle"),
        decoration: document.getElementById("decorMiddle")
    },

    {
        element: document.getElementById("hillFront"),
        decoration: document.getElementById("decorFront")
    }

];


/* =========================================================
   UTILIDADES
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
   PRECARREGAR IMAGENS
========================================================= */

function preloadImages() {

    const images = [

        ...CONFIG.memoryPhotos,

        ...CONFIG.decorationImages,

        "imagem/girassol.png",

        "imagem/joaninha.png",

        "imagem/joaninha-engracada.jpg"

    ];


    images.forEach(src => {

        const img =
            new Image();

        img.src = src;

    });

}


/* =========================================================
   VEGETAÇÃO
========================================================= */

function createDecoration(hillData) {

    if (
        !hillData ||
        !hillData.decoration
    ) {
        return;
    }


    const amount =
        hillData.element === hills[0].element
            ? 7
            : hillData.element === hills[1].element
                ? 10
                : hillData.element === hills[2].element
                    ? 14
                    : 18;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const img =
            document.createElement("img");


        const isFlower =
            Math.random() < .28;


        img.className =
            isFlower
                ? "flower"
                : "grass";


        img.src =
            choose(
                CONFIG.decorationImages
            );


        img.alt = "";


        /*
         * Nunca colocamos a decoração
         * no topo do morro.
         *
         * Ela fica dentro do elemento
         * do próprio morro.
         */

        const x =
            random(5, 95);


        /*
         * Quanto mais perto do fundo,
         * maior a chance de ficar na
         * parte visível do morro.
         */

        const y =
            random(45, 96);


        img.style.left =
            `${x}%`;


        img.style.bottom =
            `${100 - y}%`;


        img.style.setProperty(
            "--rotation",
            `${random(-12, 12)}deg`
        );


        img.style.setProperty(
            "--wind-speed",
            `${random(3.5, 6)}s`
        );


        img.draggable = false;


        hillData.decoration.appendChild(
            img
        );

    }

}


/* =========================================================
   GERAR TODA VEGETAÇÃO
========================================================= */

function createAllDecorations() {

    hills.forEach(
        createDecoration
    );

}


/* =========================================================
   GIRASSÓIS DE MEMÓRIA
========================================================= */

const memoryPositions = [

    {
        hill: 1,
        x: 24,
        bottom: 56,
        size: 58
    },

    {
        hill: 1,
        x: 76,
        bottom: 52,
        size: 53
    },

    {
        hill: 2,
        x: 18,
        bottom: 43,
        size: 62
    },

    {
        hill: 2,
        x: 82,
        bottom: 39,
        size: 58
    },

    {
        hill: 3,
        x: 30,
        bottom: 30,
        size: 65
    },

    {
        hill: 3,
        x: 70,
        bottom: 27,
        size: 61
    }

];


function createMemoryFlowers() {

    memoryFlowers.innerHTML = "";


    memoryPositions.forEach(
        (position, index) => {

            const flower =
                document.createElement("img");


            flower.src =
                "imagem/girassol.png";


            flower.alt =
                `Lembrança ${index + 1}`;


            flower.className =
                "memory-flower";


            flower.dataset.memory =
                index %
                CONFIG.memoryPhotos.length;


            /*
             * O girassol pertence visualmente
             * ao morro indicado.
             */

            const hill =
                hills[position.hill];


            if (
                !hill ||
                !hill.element
            ) {
                return;
            }


            hill.element.appendChild(
                flower
            );


            flower.style.left =
                `${position.x}%`;


            flower.style.bottom =
                `${position.bottom}px`;


            flower.style.setProperty(
                "--size",
                `${position.size}px`
            );


            flower.style.animationDelay =
                `${random(-3, 0)}s`;


            flower.addEventListener(
                "click",
                () => {

                    openMemory(
                        Number(
                            flower.dataset.memory
                        )
                    );

                }
            );

        }
    );

}


/* =========================================================
   ABRIR MEMÓRIA
========================================================= */

function openMemory(index) {

    if (
        index < 0 ||
        index >=
        CONFIG.memoryPhotos.length
    ) {
        return;
    }


    memoryImage.src =
        CONFIG.memoryPhotos[index];


    memoryImage.alt =
        `Foto da lembrança ${index + 1}`;


    memoryCaption.textContent =
        CONFIG.memoryCaptions[index];


    memoryCounter.textContent =
        `${index + 1} / ${CONFIG.memoryPhotos.length}`;


    showModal(
        memoryModal
    );

}


/* =========================================================
   FECHAR MEMÓRIA
========================================================= */

function closeMemoryModal() {

    hideModal(
        memoryModal
    );

}


/* =========================================================
   MODAL DA JOANINHA
========================================================= */

function openLadybug() {

    showModal(
        ladybugModal
    );

}


function closeLadybugModal() {

    hideModal(
        ladybugModal
    );

}


/* =========================================================
   MODAIS
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


function hideModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        !memoryModal.classList.contains("show") &&
        !ladybugModal.classList.contains("show")
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   PÉTALAS
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
        random(7, 15);


    petal.style.width =
        `${size}px`;


    petal.style.height =
        `${size * 1.45}px`;


    petal.style.left =
        `${random(0, 100)}vw`;


    petal.style.background =
        choose([

            "#fff2a8",
            "#ffe680",
            "#ffd85e",
            "#fff7c7"

        ]);


    petal.style.opacity =
        random(.65, 1);


    petal.style.transform =
        `rotate(${random(0, 360)}deg)`;


    petalLayer.appendChild(
        petal
    );


    const duration =
        random(3, 6);


    const horizontal =
        random(-120, 120);


    const rotation =
        random(240, 700);


    const animation =
        petal.animate(

            [

                {
                    transform:
                        `translate3d(0, -20px, 0)
                         rotate(0deg)`,

                    opacity:
                        petal.style.opacity

                },

                {
                    transform:
                        `translate3d(
                            ${horizontal}px,
                            105vh,
                            0
                        )
                        rotate(
                            ${rotation}deg
                        )`,

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
        .then(() => {

            petal.remove();

        })
        .catch(() => {

            petal.remove();

        });

}


/* =========================================================
   EXPLOSÃO DE PÉTALAS
========================================================= */

function flowerBurst() {

    for (
        let i = 0;
        i < 22;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 55
        );

    }

}


/* =========================================================
   JOANINHA — MOVIMENTO
========================================================= */

/*
 * A joaninha agora é um pequeno
 * personagem do jardim.
 *
 * Ela:
 *
 * - anda;
 * - para;
 * - muda de direção;
 * - nunca sai do jardim;
 * - não passa por cima do girassol
 *   principal.
 */


const ladybugState = {

    x: 12,

    y: 62,

    direction: 1,

    walking: true,

    timer: null

};


function setLadybugPosition() {

    if (!ladybug) {
        return;
    }


    ladybug.style.left =
        `${ladybugState.x}%`;


    ladybug.style.bottom =
        `${ladybugState.y}px`;


    ladybug.style.transform =
        `scaleX(
            ${ladybugState.direction}
        )`;

}


function moveLadybug() {

    if (!ladybug) {
        return;
    }


    if (
        !ladybugState.walking
    ) {

        return;

    }


    /*
     * Movimento pequeno e natural.
     */

    ladybugState.x +=
        .16 *
        ladybugState.direction;


    /*
     * Limites.
     */

    if (
        ladybugState.x >= 87
    ) {

        ladybugState.x =
            87;

        ladybugState.direction =
            -1;

    }


    if (
        ladybugState.x <= 7
    ) {

        ladybugState.x =
            7;

        ladybugState.direction =
            1;

    }


    /*
     * Pequenas variações de altura.
     */

    ladybugState.y +=
        Math.sin(
            Date.now() / 700
        ) * .04;


    setLadybugPosition();

}


function ladybugPause() {

    ladybugState.walking =
        false;


    clearTimeout(
        ladybugState.timer
    );


    ladybugState.timer =
        setTimeout(

            () => {

                /*
                 * Às vezes muda de direção
                 * enquanto está parada.
                 */

                if (
                    Math.random() < .35
                ) {

                    ladybugState.direction *=
                        -1;

                }


                ladybugState.walking =
                    true;

            },

            random(
                1200,
                3000
            )

        );

}


function ladybugLoop() {

    moveLadybug();


    /*
     * Pequenas pausas aleatórias.
     */

    if (
        ladybugState.walking &&
        Math.random() < .003
    ) {

        ladybugPause();

    }


    requestAnimationFrame(
        ladybugLoop
    );

}


/* =========================================================
   JOANINHA — CLIQUE
========================================================= */

if (ladybug) {

    ladybug.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            openLadybug();

        }
    );

}


/* =========================================================
   GIRASSOL PRINCIPAL
========================================================= */

if (mainFlower) {

    mainFlower.addEventListener(
        "click",
        () => {

            flowerBurst();

        }
    );

}


/* =========================================================
   BOTÕES DOS MODAIS
========================================================= */

if (closeMemory) {

    closeMemory.addEventListener(
        "click",
        closeMemoryModal
    );

}


if (closeLadybug) {

    closeLadybug.addEventListener(
        "click",
        closeLadybugModal
    );

}


/* =========================================================
   CLIQUE FORA DO CARTÃO
========================================================= */

if (memoryModal) {

    memoryModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                memoryModal
            ) {

                closeMemoryModal();

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


        closeMemoryModal();

        closeLadybugModal();

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function init() {

    preloadImages();


    /*
     * Vegetação.
     */

    createAllDecorations();


    /*
     * Girassóis das memórias.
     */

    createMemoryFlowers();


    /*
     * Joaninha.
     */

    setLadybugPosition();

    ladybugLoop();

}


/* =========================================================
   INICIAR
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();

}


/* =========================================================
   FIM — V11
========================================================= */