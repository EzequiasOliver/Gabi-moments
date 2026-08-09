/* ==================================================
   GABI MOMENTS — V10
   SCRIPT.JS
================================================== */


/* ==================================================
   CONFIGURAÇÕES
================================================== */

const CONFIG = {

    /* quantidade de vegetação */
    grassFar: 18,
    grassBack: 24,
    grassMiddle: 30,
    grassFront: 38,

    /* quantidade de flores */
    flowersFar: 3,
    flowersBack: 5,
    flowersMiddle: 7,
    flowersFront: 9,

    /* quantidade de flores de memória */
    memoryFlowers: 3,

    /* pétalas */
    petalInterval: 2200

};


/* ==================================================
   IMAGENS
================================================== */

const ASSETS = {

    grass: [
        "imagem/grama1.png",
        "imagem/grama2.png"
    ],

    flowers: [
        "imagem/margarida.png",
        "imagem/tulipa.png"
    ]

};


/* ==================================================
   MEMÓRIAS
================================================== */

const memories = [

    {
        image: "imagem/foto1.jpg",
        caption:
            "Uma lembrança que merece um cantinho especial no jardim. 🌻"
    },

    {
        image: "imagem/foto2.jpg",
        caption:
            "Alguns momentos ficam guardados de um jeito diferente. ☀️"
    },

    {
        image: "imagem/foto3.jpg",
        caption:
            "Porque certas lembranças merecem florescer. 🌼"
    }

];


/* ==================================================
   ELEMENTOS
================================================== */

const sunflower =
    document.getElementById("sunflower");

const memoryFlowers =
    document.getElementById("memoryFlowers");

const ladybug =
    document.getElementById("ladybug");

const ladybugModal =
    document.getElementById("ladybugModal");

const closeLadybug =
    document.getElementById("closeLadybug");

const memoryModal =
    document.getElementById("memoryModal");

const closeMemory =
    document.getElementById("closeMemory");

const memoryImage =
    document.getElementById("memoryImage");

const memoryCaption =
    document.getElementById("memoryCaption");

const memoryCounter =
    document.getElementById("memoryCounter");

const petalLayer =
    document.getElementById("petalLayer");


/* ==================================================
   CAMADAS DOS MORROS
================================================== */

const terrainLayers = [

    {
        element:
            document.getElementById("natureFar"),

        grass:
            CONFIG.grassFar,

        flowers:
            CONFIG.flowersFar,

        seed:
            11
    },

    {
        element:
            document.getElementById("natureBack"),

        grass:
            CONFIG.grassBack,

        flowers:
            CONFIG.flowersBack,

        seed:
            29
    },

    {
        element:
            document.getElementById("natureMiddle"),

        grass:
            CONFIG.grassMiddle,

        flowers:
            CONFIG.flowersMiddle,

        seed:
            47
    },

    {
        element:
            document.getElementById("natureFront"),

        grass:
            CONFIG.grassFront,

        flowers:
            CONFIG.flowersFront,

        seed:
            73
    }

];


/* ==================================================
   VERIFICAÇÃO DE ELEMENTOS
================================================== */

function elementExists(element) {

    return element !== null &&
           element !== undefined;

}


/* ==================================================
   NÚMERO ALEATÓRIO
================================================== */

function random(min, max) {

    return Math.random() *
        (max - min) +
        min;

}


/* ==================================================
   INTEIRO ALEATÓRIO
================================================== */

function randomInt(min, max) {

    return Math.floor(
        random(min, max + 1)
    );

}


/* ==================================================
   ESCOLHER ITEM ALEATÓRIO
================================================== */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* ==================================================
   CRIAR GRAMA
================================================== */

function createGrass(layer, index) {

    if (!elementExists(layer.element)) {
        return;
    }


    const img =
        document.createElement("img");


    img.className =
        "grassDecoration";


    img.src =
        randomItem(ASSETS.grass);


    img.alt = "";


    img.draggable =
        false;


    /*
       Evita que a grama fique
       colada nas bordas.
    */

    const left =
        random(4, 96);


    /*
       Cada camada recebe uma
       faixa vertical diferente.
    */

    let bottom;


    if (
        layer.element.id ===
        "natureFar"
    ) {

        bottom =
            random(45, 66);

    }

    else if (
        layer.element.id ===
        "natureBack"
    ) {

        bottom =
            random(42, 62);

    }

    else if (
        layer.element.id ===
        "natureMiddle"
    ) {

        bottom =
            random(38, 58);

    }

    else {

        bottom =
            random(30, 55);

    }


    img.style.left =
        `${left}%`;


    img.style.bottom =
        `${bottom}%`;


    img.style.setProperty(
        "--grass-rotation",
        `${random(-8, 8)}deg`
    );


    img.style.setProperty(
        "--grass-speed",
        `${random(3.2, 5.5)}s`
    );


    img.style.animationDelay =
        `${random(-4, 0)}s`;


    layer.element.appendChild(img);

}


/* ==================================================
   CRIAR FLOR
================================================== */

function createDecorativeFlower(
    layer,
    index
) {

    if (!elementExists(layer.element)) {
        return;
    }


    const img =
        document.createElement("img");


    img.className =
        "decorFlower";


    img.src =
        randomItem(ASSETS.flowers);


    img.alt = "";


    img.draggable =
        false;


    const left =
        random(5, 95);


    let bottom;


    if (
        layer.element.id ===
        "natureFar"
    ) {

        bottom =
            random(48, 69);

    }

    else if (
        layer.element.id ===
        "natureBack"
    ) {

        bottom =
            random(45, 64);

    }

    else if (
        layer.element.id ===
        "natureMiddle"
    ) {

        bottom =
            random(40, 59);

    }

    else {

        bottom =
            random(33, 56);

    }


    img.style.left =
        `${left}%`;


    img.style.bottom =
        `${bottom}%`;


    img.style.setProperty(
        "--flower-rotation",
        `${random(-5, 5)}deg`
    );


    img.style.setProperty(
        "--flower-speed",
        `${random(4, 6)}s`
    );


    img.style.animationDelay =
        `${random(-5, 0)}s`;


    layer.element.appendChild(img);

}


/* ==================================================
   GERAR VEGETAÇÃO
================================================== */

function generateTerrainVegetation() {

    terrainLayers.forEach(
        layer => {

            if (!elementExists(
                layer.element
            )) {
                return;
            }


            /*
               Limpa qualquer vegetação
               antiga antes de criar.
            */

            layer.element.innerHTML = "";


            /*
               GRAMA
            */

            for (
                let i = 0;
                i < layer.grass;
                i++
            ) {

                createGrass(
                    layer,
                    i
                );

            }


            /*
               FLORES
            */

            for (
                let i = 0;
                i < layer.flowers;
                i++
            ) {

                createDecorativeFlower(
                    layer,
                    i
                );

            }

        }
    );

}


/* ==================================================
   CRIAR GIRASSÓIS DE MEMÓRIA
================================================== */

function createMemoryFlowers() {

    if (
        !elementExists(memoryFlowers)
    ) {
        return;
    }


    memoryFlowers.innerHTML = "";


    memories.forEach(
        (memory, index) => {

            const flower =
                document.createElement("img");


            flower.className =
                "memoryFlower";


            flower.src =
                "imagem/girassol.png";


            flower.alt =
                `Lembrança ${index + 1}`;


            flower.draggable =
                false;


            /*
               Posições propositalmente
               diferentes.

               Elas ficam nos morros,
               não em cima do girassol principal.
            */

            const positions = [

                {
                    left: 27,
                    bottom: 205,
                    size: 62
                },

                {
                    left: 73,
                    bottom: 175,
                    size: 58
                },

                {
                    left: 51,
                    bottom: 245,
                    size: 54
                }

            ];


            const position =
                positions[
                    index %
                    positions.length
                ];


            flower.style.left =
                `${position.left}%`;


            flower.style.bottom =
                `${position.bottom}px`;


            flower.style.width =
                `${position.size}px`;


            flower.style.animationDelay =
                `${index * -1.4}s`;


            flower.dataset.memory =
                index;


            flower.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openMemory(index);

                }
            );


            memoryFlowers.appendChild(
                flower
            );

        }
    );

}


/* ==================================================
   ABRIR MEMÓRIA
================================================== */

function openMemory(index) {

    if (
        !memories[index] ||
        !elementExists(memoryModal)
    ) {
        return;
    }


    const memory =
        memories[index];


    if (
        elementExists(memoryImage)
    ) {

        memoryImage.src =
            memory.image;

        memoryImage.alt =
            `Foto da lembrança ${index + 1}`;

    }


    if (
        elementExists(memoryCaption)
    ) {

        memoryCaption.textContent =
            memory.caption;

    }


    if (
        elementExists(memoryCounter)
    ) {

        memoryCounter.textContent =
            `${index + 1} / ${memories.length}`;

    }


    memoryModal.classList.add(
        "show"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   FECHAR MEMÓRIA
================================================== */

function closeMemoryModal() {

    if (
        !elementExists(memoryModal)
    ) {
        return;
    }


    memoryModal.classList.remove(
        "show"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* ==================================================
   ABRIR JOANINHA
================================================== */

function openLadybug() {

    if (
        !elementExists(ladybugModal)
    ) {
        return;
    }


    ladybugModal.classList.add(
        "show"
    );


    ladybugModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   FECHAR JOANINHA
================================================== */

function closeLadybugModal() {

    if (
        !elementExists(ladybugModal)
    ) {
        return;
    }


    ladybugModal.classList.remove(
        "show"
    );


    ladybugModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* ==================================================
   EVENTO — GIRASSOL
================================================== */

if (
    elementExists(sunflower)
) {

    sunflower.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            /*
               Pequeno efeito de clique.
            */

            sunflower.animate(

                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(.9)"
                    },

                    {
                        transform:
                            "scale(1.08)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }
                ],

                {
                    duration: 500,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }

            );


            createPetalBurst();

        }
    );

}


/* ==================================================
   EVENTO — JOANINHA
================================================== */

if (
    elementExists(ladybug)
) {

    ladybug.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            openLadybug();

        }
    );

}


/* ==================================================
   EVENTO — FECHAR MEMÓRIA
================================================== */

if (
    elementExists(closeMemory)
) {

    closeMemory.addEventListener(
        "click",
        closeMemoryModal
    );

}


/* ==================================================
   EVENTO — FECHAR JOANINHA
================================================== */

if (
    elementExists(closeLadybug)
) {

    closeLadybug.addEventListener(
        "click",
        closeLadybugModal
    );

}


/* ==================================================
   FECHAR CLICANDO FORA
================================================== */

if (
    elementExists(memoryModal)
) {

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


if (
    elementExists(ladybugModal)
) {

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


/* ==================================================
   TECLA ESC
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeMemoryModal();

            closeLadybugModal();

        }

    }
);


/* ==================================================
   CRIAR PÉTALA
================================================== */

function createPetal() {

    if (
        !elementExists(petalLayer)
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
        `${size * 1.35}px`;


    petal.style.left =
        `${random(0, 100)}vw`;


    petal.style.background =
        randomItem([

            "#ffe477",

            "#ffd45e",

            "#ffcb4c",

            "#fff0a0"

        ]);


    petal.style.opacity =
        random(.45, .85);


    const duration =
        random(7, 13);


    petal.animate(

        [

            {
                transform:
                    "translate3d(0, -20px, 0) rotate(0deg)",

                opacity:
                    0
            },

            {
                transform:
                    `translate3d(${random(-70,70)}px, 45vh, 0) rotate(${random(120,300)}deg)`,

                opacity:
                    random(.55,.9)
            },

            {
                transform:
                    `translate3d(${random(-120,120)}px, 110vh, 0) rotate(${random(300,720)}deg)`,

                opacity:
                    0
            }

        ],

        {
            duration:
                duration * 1000,

            easing:
                "linear",

            fill:
                "forwards"
        }

    );


    petalLayer.appendChild(
        petal
    );


    setTimeout(
        () => {

            petal.remove();

        },
        duration * 1000 + 300
    );

}


/* ==================================================
   EXPLOSÃO DE PÉTALAS
================================================== */

function createPetalBurst() {

    for (
        let i = 0;
        i < 9;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 80
        );

    }

}


/* ==================================================
   PÉTALAS AUTOMÁTICAS
================================================== */

function startPetalEffect() {

    setInterval(
        () => {

            /*
               Pequena chance de criar
               pétala automática.

               Assim não fica exagerado.
            */

            if (
                Math.random() < .55
            ) {

                createPetal();

            }

        },
        CONFIG.petalInterval
    );

}


/* ==================================================
   ANIMAÇÃO EXTRA DO GIRASSOL
================================================== */

function sunflowerIdleAnimation() {

    if (
        !elementExists(sunflower)
    ) {
        return;
    }


    sunflower.animate(

        [

            {
                transform:
                    "rotate(-1deg)"
            },

            {
                transform:
                    "rotate(1.2deg)"
            },

            {
                transform:
                    "rotate(-1deg)"
            }

        ],

        {

            duration:
                4200,

            iterations:
                Infinity,

            easing:
                "ease-in-out"

        }

    );

}


/* ==================================================
   INICIALIZAÇÃO
================================================== */

function init() {

    /*
       Vegetação dos quatro morros.
    */

    generateTerrainVegetation();


    /*
       Girassóis das lembranças.
    */

    createMemoryFlowers();


    /*
       Animação do girassol principal.
    */

    sunflowerIdleAnimation();


    /*
       Pétalas.
    */

    startPetalEffect();

}


/* ==================================================
   INICIAR QUANDO O DOM ESTIVER PRONTO
================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

}

else {

    init();

}


/* ==================================================
   FIM DO SCRIPT V10
================================================== */