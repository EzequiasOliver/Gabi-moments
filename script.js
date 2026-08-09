/* ==================================================
   JARDIM DAS LEMBRANÇAS — V9
   SCRIPT.JS
================================================== */


/* ==================================================
   ELEMENTOS
================================================== */

const sunflower =
    document.getElementById("sunflower");

const memoryFlowers =
    document.getElementById("memoryFlowers");

const petalLayer =
    document.getElementById("petalLayer");

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
   CAMADAS DOS MORROS
================================================== */

const terrainLayers = [

    {
        element:
            document.getElementById(
                "natureFar"
            ),

        grass: 5,

        flowers: 4,

        fieldFlowers: 4
    },

    {
        element:
            document.getElementById(
                "natureBack"
            ),

        grass: 8,

        flowers: 6,

        fieldFlowers: 6
    },

    {
        element:
            document.getElementById(
                "natureMiddle"
            ),

        grass: 11,

        flowers: 8,

        fieldFlowers: 8
    },

    {
        element:
            document.getElementById(
                "natureFront"
            ),

        grass: 15,

        flowers: 10,

        fieldFlowers: 12
    }

];


/* ==================================================
   POSIÇÕES DOS GIRASSÓIS
================================================== */

const memoryPositions = [

    {
        left: 18,
        bottom: 82,
        scale: 0.72
    },

    {
        left: 50,
        bottom: 112,
        scale: 0.84
    },

    {
        left: 82,
        bottom: 82,
        scale: 0.70
    }

];


/* ==================================================
   INICIAR
================================================== */

createNature();

createFieldFlowers();


/* ==================================================
   VEGETAÇÃO
================================================== */

function createNature() {

    terrainLayers.forEach(
        function(layer, layerIndex) {

            if (!layer.element) {
                return;
            }


            /* ------------------------------
               GRAMA
            ------------------------------ */

            for (
                let i = 0;
                i < layer.grass;
                i++
            ) {

                const grass =
                    document.createElement(
                        "img"
                    );

                grass.src =
                    i % 2 === 0
                        ? "imagem/grama1.png"
                        : "imagem/grama2.png";

                grass.className =
                    "grassDecoration";


                /* posição */

                grass.style.left =
                    random(5, 95) + "%";


                grass.style.bottom =
                    getGrassHeight(
                        layerIndex
                    ) + "px";


                /* tamanho */

                const size =
                    getGrassSize(
                        layerIndex
                    );

                grass.style.width =
                    size + "px";


                /* movimento */

                grass.style.setProperty(
                    "--grass-speed",
                    (
                        3.5 +
                        Math.random() * 3
                    ) + "s"
                );


                grass.style.setProperty(
                    "--grass-rotation",
                    (
                        -4 +
                        Math.random() * 8
                    ) + "deg"
                );


                layer.element.appendChild(
                    grass
                );

            }


            /* ------------------------------
               FLORES
            ------------------------------ */

            for (
                let i = 0;
                i < layer.flowers;
                i++
            ) {

                const flower =
                    document.createElement(
                        "img"
                    );


                flower.src =
                    i % 2 === 0
                        ? "imagem/margarida.png"
                        : "imagem/tulipa.png";


                flower.className =
                    "decorFlower";


                /* tamanho por distância */

                if (
                    layerIndex === 0
                ) {

                    flower.classList.add(
                        "tiny"
                    );

                }

                else if (
                    layerIndex === 1
                ) {

                    flower.classList.add(
                        "small"
                    );

                }

                else {

                    flower.classList.add(
                        "medium"
                    );

                }


                flower.style.left =
                    random(5, 95) + "%";


                flower.style.bottom =
                    getFlowerHeight(
                        layerIndex
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
                        -4 +
                        Math.random() * 8
                    ) + "deg"
                );


                layer.element.appendChild(
                    flower
                );

            }

        }
    );

}


/* ==================================================
   FLORES PEQUENAS DE CAMPO
================================================== */

function createFieldFlowers() {

    terrainLayers.forEach(
        function(layer, layerIndex) {

            if (!layer.element) {
                return;
            }


            for (
                let i = 0;
                i < layer.fieldFlowers;
                i++
            ) {

                const flower =
                    document.createElement(
                        "div"
                    );


                flower.className =
                    "fieldFlower";


                flower.style.left =
                    random(3, 97) + "%";


                flower.style.bottom =
                    getFieldHeight(
                        layerIndex
                    ) + "px";


                const scale =
                    getFieldScale(
                        layerIndex
                    );


                flower.style.transform =
                    `scale(${scale})`;


                layer.element.appendChild(
                    flower
                );

            }

        }
    );

}


/* ==================================================
   ALTURA DA GRAMA
================================================== */

function getGrassHeight(
    layerIndex
) {

    const heights = [

        [120, 190],

        [75, 150],

        [35, 115],

        [5, 85]

    ];


    const range =
        heights[layerIndex];


    return random(
        range[0],
        range[1]
    );

}


/* ==================================================
   ALTURA DAS FLORES
================================================== */

function getFlowerHeight(
    layerIndex
) {

    const heights = [

        [145, 205],

        [90, 160],

        [45, 125],

        [15, 95]

    ];


    const range =
        heights[layerIndex];


    return random(
        range[0],
        range[1]
    );

}


/* ==================================================
   ALTURA DAS FLORES PEQUENAS
================================================== */

function getFieldHeight(
    layerIndex
) {

    const heights = [

        [125, 185],

        [75, 145],

        [30, 110],

        [5, 75]

    ];


    const range =
        heights[layerIndex];


    return random(
        range[0],
        range[1]
    );

}


/* ==================================================
   TAMANHO DA VEGETAÇÃO
================================================== */

function getGrassSize(
    layerIndex
) {

    const sizes = [

        [16, 25],

        [22, 32],

        [27, 39],

        [31, 45]

    ];


    const range =
        sizes[layerIndex];


    return random(
        range[0],
        range[1]
    );

}


/* ==================================================
   ESCALA DAS FLORES PEQUENAS
================================================== */

function getFieldScale(
    layerIndex
) {

    const scales = [

        [0.55, 0.75],

        [0.7, 0.9],

        [0.8, 1],

        [0.9, 1.15]

    ];


    const range =
        scales[layerIndex];


    return (
        range[0] +
        Math.random() *
        (range[1] - range[0])
    );

}


/* ==================================================
   ALEATÓRIO
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
        memoryPositions[
            currentMemory %
            memoryPositions.length
        ];


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
        700
    );

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
                    "scale(1.1) rotate(-5deg)"
            },

            {
                transform:
                    "scale(1.07) rotate(5deg)"
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
   PLANTAR MEMÓRIA
================================================== */

function plantMemoryFlower(
    memory,
    position
) {

    if (!memoryFlowers) {
        return;
    }


    const flower =
        document.createElement(
            "img"
        );


    flower.src =
        "imagem/girassol.png";


    flower.className =
        "memoryFlower";


    flower.alt =
        "Memória";


    flower.style.left =
        position.left + "%";


    flower.style.bottom =
        position.bottom + "px";


    flower.style.width =
        (
            85 *
            position.scale
        ) + "px";


    flower.style.pointerEvents =
        "auto";


    memoryFlowers.appendChild(
        flower
    );


    /* ------------------------------
       NASCIMENTO
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
                    "translateX(-50%) translateY(-7px) scale(1.08)"

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


    /* ------------------------------
       BRILHO
    ------------------------------ */

    createSpark(
        position.left,
        position.bottom
    );


    /* ------------------------------
       CLIQUE
    ------------------------------ */

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
   ABRIR JOANINHA
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
   FECHAR JOANINHA
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
   BRILHO DA FLOR
================================================== */

function createSpark(
    left,
    bottom
) {

    if (!memoryFlowers) {
        return;
    }


    const spark =
        document.createElement(
            "div"
        );


    spark.style.position =
        "absolute";


    spark.style.left =
        left + "%";


    spark.style.bottom =
        (
            bottom + 75
        ) + "px";


    spark.style.width =
        "9px";


    spark.style.height =
        "9px";


    spark.style.borderRadius =
        "50%";


    spark.style.background =
        "#fff7a8";


    spark.style.boxShadow =
        "0 0 18px #ffe66b";


    spark.style.pointerEvents =
        "none";


    spark.style.zIndex =
        "60";


    memoryFlowers.appendChild(
        spark
    );


    spark.animate(

        [

            {
                opacity: 0,

                transform:
                    "scale(0)"

            },

            {
                opacity: 1,

                transform:
                    "scale(1.3)"

            },

            {
                opacity: 0,

                transform:
                    "scale(.2) translateY(-25px)"

            }

        ],

        {

            duration: 900,

            easing:
                "ease-out"

        }

    );


    setTimeout(
        function() {

            spark.remove();

        },
        900
    );

}


/* ==================================================
   FINAL DO JARDIM
================================================== */

function completeGarden() {

    animateSunflower();


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 100
        );

    }


    createFinalFlowers();

}


/* ==================================================
   FLORES EXTRAS DO FINAL
================================================== */

function createFinalFlowers() {

    const positions = [

        [7, 75],
        [12, 95],
        [25, 68],
        [33, 85],
        [67, 82],
        [76, 65],
        [88, 95],
        [94, 72]

    ];


    positions.forEach(
        function(position, index) {

            const flower =
                document.createElement(
                    "img"
                );


            flower.src =
                index % 2 === 0
                    ? "imagem/margarida.png"
                    : "imagem/tulipa.png";


            flower.className =
                "decorFlower medium";


            flower.style.left =
                position[0] + "%";


            flower.style.bottom =
                position[1] + "px";


            flower.style.opacity =
                "0";


            memoryFlowers.appendChild(
                flower
            );


            setTimeout(
                function() {

                    flower.animate(

                        [

                            {
                                opacity: 0,
                                transform:
                                    "translateX(-50%) scale(0)"
                            },

                            {
                                opacity: 1,
                                transform:
                                    "translateX(-50%) scale(1)"
                            }

                        ],

                        {

                            duration: 700,

                            easing:
                                "ease-out",

                            fill: "forwards"

                        }

                    );

                },
                index * 100
            );

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
        document.createElement(
            "div"
        );


    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    const size =
        5 +
        Math.random() * 7;


    petal.style.width =
        size + "px";


    petal.style.height =
        (
            size * 1.35
        ) + "px";


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
        Math.random() * 5000;


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

                    opacity: .85

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
   COR DOS PÉTALAS
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
    3500
);


/* ==================================================
   ESC
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
   NÃO ARRASTAR IMAGENS
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
   LOG
================================================== */

console.log(
    "🌻 Jardim das Lembranças V9 carregado!"
);