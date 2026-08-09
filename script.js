/*==================================================
    JARDIM DAS LEMBRANÇAS — V8
    SCRIPT.JS — COMPLETO
==================================================*/


/*==================================================
    ELEMENTOS
==================================================*/

const sunflower =
    document.getElementById("sunflower");

const memoryFlowers =
    document.getElementById("memoryFlowers");

const grassLayer =
    document.getElementById("grassLayer");

const flowerLayer =
    document.getElementById("flowerLayer");

const petalLayer =
    document.getElementById("petalLayer");

const music =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

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


/*==================================================
    MEMÓRIAS
==================================================*/

const memories = [

    {
        photo: "imagem/foto1.jpg",

        text:
            "Uma imagem, várias memórias. 🌻"
    },

    {
        photo: "imagem/foto2.jpg",

        text:
            "Aquele dia foi especial. ☀️"
    },

    {
        photo: "imagem/foto3.jpg",

        text:
            "Ainda lembro dessa risada. 💛"
    }

];


/*==================================================
    CONTROLE
==================================================*/

let currentMemory = 0;

let isPlanting = false;

let musicStarted = false;


/*==================================================
    POSIÇÕES DAS MEMÓRIAS
==================================================*/

/*
    As flores ficam SOMENTE na área
    dos morros.

    O touchMessage fica separado
    e nunca recebe uma flor.
*/

const memoryPositions = [

    {
        left: 17,
        bottom: 75,
        scale: .62
    },

    {
        left: 50,
        bottom: 105,
        scale: .82
    },

    {
        left: 82,
        bottom: 72,
        scale: .68
    }

];


/*==================================================
    POSIÇÕES DAS GRAMAS
==================================================*/

const grassPositions = [

    [5, 55],
    [9, 82],
    [14, 38],
    [20, 68],
    [25, 48],
    [30, 90],
    [36, 58],
    [42, 76],
    [47, 45],
    [53, 68],
    [58, 88],
    [63, 52],
    [68, 73],
    [73, 42],
    [78, 82],
    [84, 57],
    [89, 75],
    [94, 48]

];


/*==================================================
    POSIÇÕES DAS FLORES DECORATIVAS
==================================================*/

const decorativePositions = [

    {
        left: 8,
        bottom: 72
    },

    {
        left: 14,
        bottom: 110
    },

    {
        left: 23,
        bottom: 55
    },

    {
        left: 31,
        bottom: 95
    },

    {
        left: 40,
        bottom: 65
    },

    {
        left: 58,
        bottom: 78
    },

    {
        left: 67,
        bottom: 58
    },

    {
        left: 76,
        bottom: 105
    },

    {
        left: 88,
        bottom: 62
    },

    {
        left: 94,
        bottom: 90
    }

];


/*==================================================
    INICIAR JARDIM
==================================================*/

createGrass();

createDecorativeFlowers();


/*==================================================
    CRIAR GRAMA
==================================================*/

function createGrass() {

    grassPositions.forEach(
        (position, index) => {

            const grass =
                document.createElement("img");


            /*
                Alterna entre os dois
                tipos de grama.
            */

            const grassType =
                index % 2 === 0
                    ? "grama1.png"
                    : "grama2.png";


            grass.src =
                "imagem/" + grassType;


            grass.className =
                "grassDecoration";


            grass.style.left =
                position[0] + "%";


            grass.style.bottom =
                position[1] + "px";


            /*
                Pequena variação
                de tamanho.
            */

            const scale =
                .65 +
                Math.random() * .45;


            grass.style.transform =
                `translateX(-50%)
                 scale(${scale})`;


            grass.style.setProperty(
                "--grass-speed",
                (3.5 + Math.random() * 2) + "s"
            );


            grass.style.setProperty(
                "--grass-rotation",
                (-3 + Math.random() * 6) + "deg"
            );


            grassLayer.appendChild(
                grass
            );

        }
    );

}


/*==================================================
    CRIAR FLORES DECORATIVAS
==================================================*/

function createDecorativeFlowers() {

    decorativePositions.forEach(
        (position, index) => {

            const flower =
                document.createElement("img");


            /*
                Alterna entre margarida
                e tulipa.
            */

            const file =
                index % 2 === 0
                    ? "margarida.png"
                    : "tulipa.png";


            flower.src =
                "imagem/" + file;


            flower.className =
                index % 3 === 0
                    ? "decorFlower tiny"
                    : "decorFlower small";


            flower.style.left =
                position.left + "%";


            flower.style.bottom =
                position.bottom + "px";


            const scale =
                .7 +
                Math.random() * .35;


            flower.style.transform =
                `translateX(-50%)
                 scale(${scale})`;


            flower.style.setProperty(
                "--flower-speed",
                (4 + Math.random() * 2) + "s"
            );


            flower.style.setProperty(
                "--flower-rotation",
                (-3 + Math.random() * 6) + "deg"
            );


            flowerLayer.appendChild(
                flower
            );

        }
    );

}


/*==================================================
    CLIQUE NO GIRASSOL PRINCIPAL
==================================================*/

sunflower.addEventListener(
    "click",
    handleSunflowerClick
);


function handleSunflowerClick() {

    /*
        Impede cliques duplos.
    */

    if (isPlanting) {
        return;
    }


    /*
        Se todas as memórias já
        foram descobertas.
    */

    if (
        currentMemory >=
        memories.length
    ) {

        finalFlowerAnimation();

        return;

    }


    isPlanting = true;


    /*----------------------------------------------
        MÚSICA
    ----------------------------------------------*/

    startMusic();


    /*----------------------------------------------
        ANIMAÇÃO DO GIRASSOL
    ----------------------------------------------*/

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
            duration:550,

            easing:"ease-out"
        }

    );


    /*----------------------------------------------
        PLANTAR MEMÓRIA
    ----------------------------------------------*/

    const memory =
        memories[currentMemory];


    const position =
        memoryPositions[
            currentMemory %
            memoryPositions.length
        ];


    const flower =
        plantMemoryFlower(
            memory,
            position
        );


    /*
        Avança somente depois de
        criar a flor.
    */

    currentMemory++;


    /*
        Mostra a memória depois
        da animação de nascimento.
    */

    setTimeout(

        () => {

            showMemory(
                memory
            );

            isPlanting = false;

        },

        750

    );

}


/*==================================================
    PLANTAR GIRASSOL DE MEMÓRIA
==================================================*/

function plantMemoryFlower(
    memory,
    position
) {

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


    flower.style.transform =
        `translateX(-50%)
         scale(0)`;


    /*
        O clique continua funcionando
        mesmo com as flores decorativas.
    */

    flower.style.pointerEvents =
        "auto";


    memoryFlowers.appendChild(
        flower
    );


    /*----------------------------------------------
        NASCIMENTO
    ----------------------------------------------*/

    flower.animate(

        [

            {
                opacity:0,

                transform:
                    "translateX(-50%)
                     translateY(25px)
                     scale(0)"
            },

            {
                opacity:1,

                transform:
                    `translateX(-50%)
                     translateY(-5px)
                     scale(${position.scale * 1.08})`
            },

            {
                opacity:1,

                transform:
                    `translateX(-50%)
                     translateY(0)
                     scale(${position.scale})`
            }

        ],

        {

            duration:700,

            easing:"cubic-bezier(.2,.8,.2,1)",

            fill:"forwards"

        }

    );


    /*
        Clique na flor já plantada.
    */

    flower.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            showMemory(
                memory
            );

        }
    );


    /*
        Pequeno brilho.
    */

    createFlowerSpark(
        position.left,
        position.bottom
    );


    return flower;

}


/*==================================================
    ABRIR MEMÓRIA
==================================================*/

function showMemory(memory) {

    memoryImage.src =
        memory.photo;


    memoryCaption.textContent =
        memory.text;


    memoryCounter.textContent =
        `${Math.min(
            currentMemory,
            memories.length
        )} / ${memories.length}`;


    memoryModal.classList.add(
        "show"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/*==================================================
    FECHAR MEMÓRIA
==================================================*/

function closeMemoryModal() {

    memoryModal.classList.remove(
        "show"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


closeMemory.addEventListener(
    "click",
    closeMemoryModal
);


memoryModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            memoryModal
        ) {

            closeMemoryModal();

        }

    }
);


/*==================================================
    JOANINHA
==================================================*/

ladybug.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        ladybug.style.animationPlayState =
            "paused";


        const image =
            document.getElementById(
                "ladybugImage"
            );


        /*
            Pequena animação
            antes de abrir.
        */

        ladybug.animate(

            [

                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.25)
                         rotate(-8deg)"
                },

                {
                    transform:
                        "scale(1)"
                }

            ],

            {
                duration:350
            }

        );


        ladybugModal.classList.add(
            "show"
        );


        ladybugModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/*==================================================
    FECHAR JOANINHA
==================================================*/

function closeLadybugModal() {

    ladybugModal.classList.remove(
        "show"
    );


    ladybugModal.setAttribute(
        "aria-hidden",
        "true"
    );


    ladybug.style.animationPlayState =
        "running";

}


closeLadybug.addEventListener(
    "click",
    closeLadybugModal
);


ladybugModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            ladybugModal
        ) {

            closeLadybugModal();

        }

    }
);


/*==================================================
    MÚSICA
==================================================*/

function startMusic() {

    if (
        musicStarted ||
        !music
    ) {

        return;

    }


    music
        .play()
        .then(
            () => {

                musicStarted = true;

                musicButton.textContent =
                    "🔊";

            }
        )
        .catch(
            () => {

                musicStarted = false;

            }
        );

}


/*==================================================
    BOTÃO DA MÚSICA
==================================================*/

musicButton.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music
                .play()
                .then(
                    () => {

                        musicStarted = true;

                        musicButton.textContent =
                            "🔊";

                    }
                )
                .catch(
                    () => {}
                );

        } else {

            music.pause();

            musicButton.textContent =
                "🔇";

        }

    }
);


/*==================================================
    PÉTALAS
==================================================*/

function createPetal() {

    if (
        document.hidden
    ) {

        return;

    }


    const petal =
        document.createElement("div");


    petal.className =
        "petal";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.background =
        randomPetalColor();


    const size =
        6 +
        Math.random() * 6;


    petal.style.width =
        size + "px";


    petal.style.height =
        size * 1.35 + "px";


    petalLayer.appendChild(
        petal
    );


    const horizontal =
        -120 +
        Math.random() * 240;


    const duration =
        5000 +
        Math.random() * 5000;


    petal.animate(

        [

            {
                transform:
                    "translate(0,-20px)
                     rotate(0deg)",

                opacity:0
            },

            {
                transform:
                    `translate(
                        ${horizontal / 2}px,
                        45vh
                    )
                    rotate(180deg)`,

                opacity:.85
            },

            {
                transform:
                    `translate(
                        ${horizontal}px,
                        110vh
                    )
                    rotate(360deg)`,

                opacity:0
            }

        ],

        {

            duration:duration,

            easing:"linear"

        }

    );


    setTimeout(
        () => {

            petal.remove();

        },
        duration
    );

}


/*==================================================
    COR DAS PÉTALAS
==================================================*/

function randomPetalColor() {

    const colors = [

        "#fff4a3",
        "#ffe17a",
        "#ffd45a",
        "#fff8c9"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}


/*==================================================
    GERADOR DE PÉTALAS
==================================================*/

setInterval(
    createPetal,
    3200
);


/*==================================================
    BRILHO DA FLOR
==================================================*/

function createFlowerSpark(
    left,
    bottom
) {

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


    memoryFlowers.appendChild(
        spark
    );


    spark.animate(

        [

            {
                opacity:0,
                transform:"scale(0)"
            },

            {
                opacity:1,
                transform:"scale(1.3)"
            },

            {
                opacity:0,
                transform:
                    "scale(.2)
                     translateY(-20px)"
            }

        ],

        {

            duration:900,

            easing:"ease-out"

        }

    );


    setTimeout(
        () => {

            spark.remove();

        },
        900
    );

}


/*==================================================
    ANIMAÇÃO FINAL
==================================================*/

function finalFlowerAnimation() {

    sunflower.animate(

        [

            {
                transform:
                    "scale(1)
                     rotate(0deg)"
            },

            {
                transform:
                    "scale(1.15)
                     rotate(-5deg)"
            },

            {
                transform:
                    "scale(1.15)
                     rotate(5deg)"
            },

            {
                transform:
                    "scale(1)
                     rotate(0deg)"
            }

        ],

        {

            duration:900,

            easing:"ease-in-out"

        }

    );


    createFinalPetals();

}


/*==================================================
    PÉTALAS FINAIS
==================================================*/

function createFinalPetals() {

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


/*==================================================
    ESC FECHA MODAIS
==================================================*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeMemoryModal();

        closeLadybugModal();

    }
);


/*==================================================
    EVITAR DRAG DAS IMAGENS
==================================================*/

document.addEventListener(
    "dragstart",
    (event) => {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/*==================================================
    LOG
==================================================*/

console.log(
    "🌻 Jardim das Lembranças V8 iniciado."
);