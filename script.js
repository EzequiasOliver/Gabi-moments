/* ==================================================
   JARDIM DAS LEMBRANÇAS — V8.1
   SCRIPT.JS
================================================== */


/* ==================================================
   ELEMENTOS
================================================== */

const sunflower = document.getElementById("sunflower");
const memoryFlowers = document.getElementById("memoryFlowers");
const grassLayer = document.getElementById("grassLayer");
const flowerLayer = document.getElementById("flowerLayer");
const petalLayer = document.getElementById("petalLayer");

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

const ladybug = document.getElementById("ladybug");
const ladybugModal = document.getElementById("ladybugModal");
const closeLadybug = document.getElementById("closeLadybug");

const memoryModal = document.getElementById("memoryModal");
const closeMemory = document.getElementById("closeMemory");
const memoryImage = document.getElementById("memoryImage");
const memoryCaption = document.getElementById("memoryCaption");
const memoryCounter = document.getElementById("memoryCounter");


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
   CONTROLE
================================================== */

let currentMemory = 0;
let isPlanting = false;
let musicStarted = false;


/* ==================================================
   POSIÇÕES DAS MEMÓRIAS
================================================== */

const memoryPositions = [
    {
        left: 18,
        bottom: 85,
        scale: 0.62
    },

    {
        left: 50,
        bottom: 115,
        scale: 0.80
    },

    {
        left: 82,
        bottom: 85,
        scale: 0.66
    }
];


/* ==================================================
   POSIÇÕES DA GRAMA
================================================== */

const grassPositions = [
    [5, 55],
    [10, 85],
    [15, 45],
    [21, 70],
    [27, 50],
    [33, 92],
    [39, 60],
    [45, 78],
    [51, 48],
    [57, 70],
    [63, 90],
    [69, 55],
    [75, 78],
    [81, 45],
    [87, 85],
    [93, 55]
];


/* ==================================================
   POSIÇÕES DAS FLORES
================================================== */

const decorativePositions = [
    { left: 8, bottom: 75 },
    { left: 15, bottom: 110 },
    { left: 24, bottom: 60 },
    { left: 32, bottom: 95 },
    { left: 41, bottom: 70 },
    { left: 59, bottom: 80 },
    { left: 68, bottom: 60 },
    { left: 76, bottom: 105 },
    { left: 88, bottom: 65 },
    { left: 94, bottom: 90 }
];


/* ==================================================
   INICIALIZAÇÃO
================================================== */

createGrass();
createDecorativeFlowers();


/* ==================================================
   CRIAR GRAMA
================================================== */

function createGrass() {

    if (!grassLayer) return;

    grassPositions.forEach((position, index) => {

        const grass = document.createElement("img");

        grass.src =
            index % 2 === 0
                ? "imagem/grama1.png"
                : "imagem/grama2.png";

        grass.className = "grassDecoration";

        grass.alt = "";

        grass.style.left = position[0] + "%";
        grass.style.bottom = position[1] + "px";

        const scale = 0.65 + Math.random() * 0.4;

        grass.style.transform =
            `translateX(-50%) scale(${scale})`;

        grass.style.setProperty(
            "--grass-speed",
            `${3.5 + Math.random() * 2}s`
        );

        grass.style.setProperty(
            "--grass-rotation",
            `${-3 + Math.random() * 6}deg`
        );

        grassLayer.appendChild(grass);
    });
}


/* ==================================================
   CRIAR FLORES DECORATIVAS
================================================== */

function createDecorativeFlowers() {

    if (!flowerLayer) return;

    decorativePositions.forEach((position, index) => {

        const flower = document.createElement("img");

        flower.src =
            index % 2 === 0
                ? "imagem/margarida.png"
                : "imagem/tulipa.png";

        flower.className =
            index % 3 === 0
                ? "decorFlower tiny"
                : "decorFlower small";

        flower.alt = "";

        flower.style.left =
            position.left + "%";

        flower.style.bottom =
            position.bottom + "px";

        const scale =
            0.7 + Math.random() * 0.3;

        flower.style.transform =
            `translateX(-50%) scale(${scale})`;

        flower.style.setProperty(
            "--flower-speed",
            `${4 + Math.random() * 2}s`
        );

        flower.style.setProperty(
            "--flower-rotation",
            `${-3 + Math.random() * 6}deg`
        );

        flowerLayer.appendChild(flower);
    });
}


/* ==================================================
   GIRASSOL PRINCIPAL
================================================== */

if (sunflower) {

    sunflower.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        handleSunflowerClick();
    });
}


/* ==================================================
   CLIQUE NO GIRASSOL
================================================== */

function handleSunflowerClick() {

    if (isPlanting) {
        return;
    }

    startMusic();

    animateMainFlower();

    if (currentMemory >= memories.length) {

        finalFlowerAnimation();

        return;
    }

    isPlanting = true;

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

    setTimeout(function() {

        showMemory(memory);

        isPlanting = false;

    }, 750);
}


/* ==================================================
   ANIMAÇÃO DO GIRASSOL
================================================== */

function animateMainFlower() {

    if (!sunflower) return;

    sunflower.animate(
        [
            {
                transform:
                    "rotate(0deg) scale(1)"
            },

            {
                transform:
                    "rotate(-6deg) scale(1.12)"
            },

            {
                transform:
                    "rotate(6deg) scale(1.08)"
            },

            {
                transform:
                    "rotate(0deg) scale(1)"
            }
        ],
        {
            duration: 550,
            easing: "ease-out"
        }
    );
}


/* ==================================================
   PLANTAR GIRASSOL
================================================== */

function plantMemoryFlower(memory, position) {

    if (!memoryFlowers) return;

    const flower =
        document.createElement("img");

    flower.src =
        "imagem/girassol.png";

    flower.className =
        "memoryFlower";

    flower.alt =
        "Girassol da memória";

    flower.style.left =
        position.left + "%";

    flower.style.bottom =
        position.bottom + "px";

    flower.style.pointerEvents =
        "auto";

    memoryFlowers.appendChild(flower);


    /* Animação de nascimento */

    flower.animate(
        [
            {
                opacity: 0,
                transform:
                    "translateX(-50%) translateY(25px) scale(0)"
            },

            {
                opacity: 1,
                transform:
                    `translateX(-50%) translateY(-5px) scale(${position.scale * 1.08})`
            },

            {
                opacity: 1,
                transform:
                    `translateX(-50%) translateY(0) scale(${position.scale})`
            }
        ],
        {
            duration: 700,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        }
    );


    /* Clique na memória */

    flower.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        showMemory(memory);
    });


    createFlowerSpark(
        position.left,
        position.bottom
    );
}


/* ==================================================
   ABRIR MEMÓRIA
================================================== */

function showMemory(memory) {

    if (!memoryModal) return;

    memoryImage.src =
        memory.photo;

    memoryCaption.textContent =
        memory.text;

    memoryCounter.textContent =
        `${Math.min(currentMemory, memories.length)} / ${memories.length}`;

    memoryModal.classList.add("show");

    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* ==================================================
   FECHAR MEMÓRIA
================================================== */

function closeMemoryModal() {

    if (!memoryModal) return;

    memoryModal.classList.remove("show");

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
                event.target === memoryModal
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

    if (!ladybugModal) return;

    ladybug.style.animationPlayState =
        "paused";

    ladybugModal.classList.add("show");

    ladybugModal.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* ==================================================
   FECHAR JOANINHA
================================================== */

function closeLadybugModal() {

    if (!ladybugModal) return;

    ladybugModal.classList.remove("show");

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
                event.target === ladybugModal
            ) {

                closeLadybugModal();
            }
        }
    );
}


/* ==================================================
   MÚSICA
================================================== */

function startMusic() {

    if (!music) return;

    if (!music.paused) return;

    music.play()
        .then(function() {

            musicStarted = true;

            if (musicButton) {
                musicButton.textContent = "🔊";
            }

        })
        .catch(function(error) {

            console.log(
                "Navegador bloqueou o áudio:",
                error
            );
        });
}


/* ==================================================
   BOTÃO DA MÚSICA
================================================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            if (!music) return;

            if (music.paused) {

                music.play()
                    .then(function() {

                        musicStarted = true;

                        musicButton.textContent =
                            "🔊";
                    })
                    .catch(function() {

                        musicButton.textContent =
                            "🔇";
                    });

            } else {

                music.pause();

                musicButton.textContent =
                    "🔇";
            }
        }
    );
}


/* ==================================================
   PÉTALAS
================================================== */

function createPetal() {

    if (!petalLayer) return;

    if (document.hidden) return;

    const petal =
        document.createElement("div");

    petal.className =
        "petal";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.background =
        randomPetalColor();

    const size =
        6 + Math.random() * 6;

    petal.style.width =
        size + "px";

    petal.style.height =
        size * 1.35 + "px";

    petalLayer.appendChild(petal);

    const horizontal =
        -120 + Math.random() * 240;

    const duration =
        5000 + Math.random() * 5000;

    const animation =
        petal.animate(
            [
                {
                    transform:
                        "translate(0,-20px) rotate(0deg)",
                    opacity: 0
                },

                {
                    transform:
                        `translate(${horizontal / 2}px,45vh) rotate(180deg)`,
                    opacity: 0.85
                },

                {
                    transform:
                        `translate(${horizontal}px,110vh) rotate(360deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "linear"
            }
        );

    animation.finished
        .then(function() {

            petal.remove();

        })
        .catch(function() {

            petal.remove();

        });
}


/* ==================================================
   COR DAS PÉTALAS
================================================== */

function randomPetalColor() {

    const colors = [
        "#fff4a3",
        "#ffe17a",
        "#ffd45a",
        "#fff8c9"
    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];
}


/* ==================================================
   PÉTALAS AUTOMÁTICAS
================================================== */

setInterval(
    createPetal,
    3200
);


/* ==================================================
   BRILHO AO PLANTAR
================================================== */

function createFlowerSpark(left, bottom) {

    if (!memoryFlowers) return;

    const spark =
        document.createElement("div");

    spark.style.position =
        "absolute";

    spark.style.left =
        left + "%";

    spark.style.bottom =
        (bottom + 80) + "px";

    spark.style.width =
        "8px";

    spark.style.height =
        "8px";

    spark.style.borderRadius =
        "50%";

    spark.style.background =
        "#fff6a3";

    spark.style.boxShadow =
        "0 0 15px #ffe85a";

    spark.style.pointerEvents =
        "none";

    spark.style.zIndex =
        "40";

    memoryFlowers.appendChild(spark);

    spark.animate(
        [
            {
                opacity: 0,
                transform: "scale(0)"
            },

            {
                opacity: 1,
                transform: "scale(1.3)"
            },

            {
                opacity: 0,
                transform:
                    "scale(.2) translateY(-20px)"
            }
        ],
        {
            duration: 900,
            easing: "ease-out"
        }
    );

    setTimeout(function() {

        spark.remove();

    }, 900);
}


/* ==================================================
   ANIMAÇÃO FINAL
================================================== */

function finalFlowerAnimation() {

    if (!sunflower) return;

    sunflower.animate(
        [
            {
                transform:
                    "scale(1) rotate(0deg)"
            },

            {
                transform:
                    "scale(1.15) rotate(-5deg)"
            },

            {
                transform:
                    "scale(1.15) rotate(5deg)"
            },

            {
                transform:
                    "scale(1) rotate(0deg)"
            }
        ],
        {
            duration: 900,
            easing: "ease-in-out"
        }
    );

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 120
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
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();
        }
    }
);


/* ==================================================
   TESTE DO JAVASCRIPT
================================================== */

console.log(
    "🌻 Jardim das Lembranças V8.1 funcionando!"
);