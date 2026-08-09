/* ==================================================
   JARDIM DAS LEMBRANÇAS — V9
   SCRIPT.JS — CORRIGIDO
================================================== */


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
   MEMÓRIAS
================================================== */

const memories = [

    {
        photo: "imagem/foto1.jpg",
        text: "Uma imagem, várias memórias. 🌻"
    },

    {
        photo: "imagem/foto2.jpg",
        text: "Aquele dia foi especial. ☀️"
    },

    {
        photo: "imagem/foto3.jpg",
        text: "Ainda lembro dessa risada. 💛"
    }

];


/* ==================================================
   ESTADO
================================================== */

let currentMemory = 0;

let planting = false;


/* ==================================================
   CONFIGURAÇÃO DOS MORROS
================================================== */

/*
   Cada morro possui sua própria área.

   A vegetação agora é posicionada
   relativamente à superfície daquele morro.
*/

const terrainConfig = [

    {
        id: "natureFar",

        grass: 5,
        flowers: 3,

        leftMin: 10,
        leftMax: 90,

        bottomMin: 145,
        bottomMax: 190,

        grassSizeMin: 17,
        grassSizeMax: 25,

        flowerClass: "tiny"
    },


    {
        id: "natureBack",

        grass: 8,
        flowers: 5,

        leftMin: 7,
        leftMax: 93,

        bottomMin: 90,
        bottomMax: 145,

        grassSizeMin: 21,
        grassSizeMax: 29,

        flowerClass: "small"
    },


    {
        id: "natureMiddle",

        grass: 11,
        flowers: 7,

        leftMin: 5,
        leftMax: 95,

        bottomMin: 45,
        bottomMax: 105,

        grassSizeMin: 25,
        grassSizeMax: 35,

        flowerClass: "small"
    },


    {
        id: "natureFront",

        grass: 15,
        flowers: 9,

        leftMin: 4,
        leftMax: 96,

        bottomMin: 15,
        bottomMax: 80,

        grassSizeMin: 29,
        grassSizeMax: 40,

        flowerClass: "medium"
    }

];


/* ==================================================
   INICIALIZAÇÃO
================================================== */

createNature();


/* ==================================================
   CRIAR VEGETAÇÃO
================================================== */

function createNature() {

    terrainConfig.forEach(
        function(config) {

            const container =
                document.getElementById(
                    config.id
                );


            if (!container) {
                return;
            }


            /* ------------------------------
               GRAMA
            ------------------------------ */

            for (
                let i = 0;
                i < config.grass;
                i++
            ) {

                createGrass(
                    container,
                    config
                );

            }


            /* ------------------------------
               FLORES
            ------------------------------ */

            for (
                let i = 0;
                i < config.flowers;
                i++
            ) {

                createFlower(
                    container,
                    config
                );

            }

        }
    );

}


/* ==================================================
   CRIAR GRAMA
================================================== */

function createGrass(
    container,
    config
) {

    const grass =
        document.createElement("img");


    grass.src =
        Math.random() < .5
            ? "imagem/grama1.png"
            : "imagem/grama2.png";


    grass.className =
        "grassDecoration";


    grass.style.left =
        random(
            config.leftMin,
            config.leftMax
        ) + "%";


    grass.style.bottom =
        random(
            config.bottomMin,
            config.bottomMax
        ) + "px";


    grass.style.width =
        random(
            config.grassSizeMin,
            config.grassSizeMax
        ) + "px";


    grass.style.setProperty(
        "--grass-speed",
        (
            3 +
            Math.random() * 4
        ) + "s"
    );


    grass.style.setProperty(
        "--grass-rotation",
        (
            -5 +
            Math.random() * 10
        ) + "deg"
    );


    container.appendChild(
        grass
    );

}


/* ==================================================
   CRIAR FLOR
================================================== */

function createFlower(
    container,
    config
) {

    const flower =
        document.createElement("img");


    flower.src =
        Math.random() < .5
            ? "imagem/margarida.png"
            : "imagem/tulipa.png";


    flower.className =
        "decorFlower " +
        config.flowerClass;


    flower.style.left =
        random(
            config.leftMin,
            config.leftMax
        ) + "%";


    flower.style.bottom =
        random(
            config.bottomMin,
            config.bottomMax
        ) + "px";


    flower.style.setProperty(
        "--flower-speed",
        (
            4 +
            Math.random() * 3
        ) + "s"
    );


    flower.style.setProperty(
        "--flower-rotation",
        (
            -5 +
            Math.random() * 10
        ) + "deg"
    );


    container.appendChild(
        flower
    );

}


/* ==================================================
   RANDOM
================================================== */

function random(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* ==================================================
   GIRASSOL PRINCIPAL
================================================== */

if (sunflower) {

    sunflower.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            handleSunflower();

        }
    );

}


/* ==================================================
   CLIQUE NO GIRASSOL
================================================== */

function handleSunflower() {

    if (planting) {
        return;
    }


    animateSunflower();


    if (
        currentMemory >=
        memories.length
    ) {

        completeGarden();

        return;

    }


    planting = true;


    const memory =
        memories[currentMemory];


    const position =
        getMemoryPosition(
            currentMemory
        );


    plantMemoryFlower(
        memory,
        position
    );


    currentMemory++;


    setTimeout(
        function() {

            showMemory(
                memory
            );

            planting = false;

        },
        650
    );

}


/* ==================================================
   POSIÇÕES DAS MEMÓRIAS
================================================== */

function getMemoryPosition(
    index
) {

    const positions = [

        {
            left: 17,
            bottom: 78,
            size: 62
        },

        {
            left: 50,
            bottom: 108,
            size: 72
        },

        {
            left: 83,
            bottom: 75,
            size: 60
        }

    ];


    return positions[
        index %
        positions.length
    ];

}


/* ==================================================
   ANIMAÇÃO DO GIRASSOL
================================================== */

function animateSunflower() {

    if (!sunflower) {
        return;
    }


    sunflower.animate(

        [

            {
                transform:
                    "scale(1) rotate(0deg)"
            },

            {
                transform:
                    "scale(1.08) rotate(-5deg)"
            },

            {
                transform:
                    "scale(1.08) rotate(5deg)"
            },

            {
                transform:
                    "scale(1) rotate(0deg)"
            }

        ],

        {

            duration: 650,

            easing:
                "cubic-bezier(.2,.8,.2,1)"

        }

    );

}


/* ==================================================
   CRIAR GIRASSOL DA MEMÓRIA
================================================== */

function plantMemoryFlower(
    memory,
    position
) {

    if (!memoryFlowers) {
        return;
    }


    const flower =
        document.createElement("img");


    flower.src =
        "imagem/girassol.png";


    flower.className =
        "memoryFlower";


    flower.alt =
        "Girassol de uma memória";


    flower.style.left =
        position.left + "%";


    flower.style.bottom =
        position.bottom + "px";


    flower.style.width =
        position.size + "px";


    flower.style.zIndex =
        "70";


    memoryFlowers.appendChild(
        flower
    );


    /* ------------------------------
       ANIMAÇÃO
    ------------------------------ */

    flower.animate(

        [

            {
                opacity: 0,

                transform:
                    "translateX(-50%) translateY(35px) scale(0)"

            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(-5px) scale(1.08)"

            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(0) scale(1)"

            }

        ],

        {

            duration: 800,

            easing:
                "cubic-bezier(.2,.8,.2,1)",

            fill: "forwards"

        }

    );


    flower.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            showMemory(
                memory
            );

        }
    );

}


/* ==================================================
   ABRIR MEMÓRIA
================================================== */

function showMemory(
    memory
) {

    if (!memoryModal) {
        return;
    }


    memoryImage.src =
        memory.photo;


    memoryCaption.textContent =
        memory.text;


    if (memoryCounter) {

        memoryCounter.textContent =
            `${currentMemory} / ${memories.length}`;

    }


    memoryModal.classList.add(
        "show"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* ==================================================
   FECHAR MEMÓRIA
================================================== */

function closeMemoryModal() {

    if (!memoryModal) {
        return;
    }


    memoryModal.classList.remove(
        "show"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (closeMemory) {

    closeMemory.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            closeMemoryModal();

        }
    );

}


if (memoryModal) {

    memoryModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                memoryModal
            ) {

                closeMemoryModal();

            }

        }
    );

}


/* ==================================================
   JOANINHA
================================================== */

if (ladybug) {

    ladybug.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            openLadybug();

        }
    );

}


/* ==================================================
   ABRIR MODAL DA JOANINHA
================================================== */

function openLadybug() {

    if (!ladybugModal) {
        return;
    }


    ladybugModal.classList.add(
        "show"
    );


    ladybugModal.setAttribute(
        "aria-hidden",
        "false"
    );


    if (ladybug) {

        ladybug.style.animationPlayState =
            "paused";

    }

}


/* ==================================================
   FECHAR MODAL DA JOANINHA
================================================== */

function closeLadybugModal() {

    if (!ladybugModal) {
        return;
    }


    ladybugModal.classList.remove(
        "show"
    );


    ladybugModal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (ladybug) {

        ladybug.style.animationPlayState =
            "running";

    }

}


if (closeLadybug) {

    closeLadybug.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            closeLadybugModal();

        }
    );

}


if (ladybugModal) {

    ladybugModal.addEventListener(
        "click",
        function(event) {

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
   PÉTALAS
================================================== */

function createPetal() {

    if (!petalLayer) {
        return;
    }


    const petal =
        document.createElement("div");


    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    const size =
        5 +
        Math.random() * 6;


    petal.style.width =
        size + "px";


    petal.style.height =
        size * 1.4 + "px";


    petal.style.background =
        randomPetalColor();


    petalLayer.appendChild(
        petal
    );


    const drift =
        -120 +
        Math.random() * 240;


    const duration =
        5000 +
        Math.random() * 4000;


    const animation =
        petal.animate(

            [

                {
                    transform:
                        "translateY(-20px) rotate(0deg)",

                    opacity: 0

                },

                {
                    transform:
                        `translate(${drift / 2}px, 45vh) rotate(180deg)`,

                    opacity: .8

                },

                {
                    transform:
                        `translate(${drift}px, 110vh) rotate(360deg)`,

                    opacity: 0

                }

            ],

            {

                duration,

                easing:
                    "linear"

            }

        );


    animation.finished
        .then(
            function() {

                petal.remove();

            }
        )
        .catch(
            function() {

                petal.remove();

            }
        );

}


/* ==================================================
   CORES DOS PÉTALAS
================================================== */

function randomPetalColor() {

    const colors = [

        "#fff5a8",
        "#ffe477",
        "#ffd75c",
        "#fffbd5"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}


/* ==================================================
   PÉTALAS AUTOMÁTICAS
================================================== */

setInterval(
    function() {

        if (
            !document.hidden
        ) {

            createPetal();

        }

    },
    4000
);


/* ==================================================
   FINAL
================================================== */

function completeGarden() {

    animateSunflower();


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 100
        );

    }

}


/* ==================================================
   TECLA ESC
================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeMemoryModal();

            closeLadybugModal();

        }

    }
);


/* ==================================================
   IMPEDIR ARRASTAR IMAGENS
================================================== */

document.addEventListener(
    "dragstart",
    function(event) {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/* ==================================================
   VERIFICAÇÃO DA JOANINHA
================================================== */

if (ladybug) {

    console.log(
        "🐞 Joaninha encontrada e configurada."
    );

} else {

    console.error(
        "🐞 ERRO: elemento #ladybug não encontrado."
    );

}


/* ==================================================
   FINAL
================================================== */

console.log(
    "🌻 Jardim das Lembranças V9 — versão corrigida carregada."
);