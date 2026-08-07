/*==================================================
        JARDIM DAS LEMBRANÇAS - V7
        SCRIPT.JS - PARTE 1
==================================================*/

/*==================================================
        ELEMENTOS
==================================================*/

const sunflower = document.getElementById("sunflower");

const gardenField =
    document.getElementById("gardenField");

const grassLayer =
    document.getElementById("grassLayer");

const flowerLayer =
    document.getElementById("flowerLayer");

const effectLayer =
    document.getElementById("effectLayer");

const music =
    document.getElementById("bgMusic");

const ladybug =
    document.getElementById("ladybug");

const ladybugModal =
    document.getElementById("ladybugModal");

const ladybugCard =
    document.getElementById("ladybugCard");

const memoryModal =
    document.getElementById("memoryModal");

const memoryCard =
    document.getElementById("memoryCard");

const memoryImage =
    document.getElementById("memoryImage");

const memoryCaption =
    document.getElementById("memoryCaption");

const petals =
    document.getElementById("petals");


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

let planting = false;


/*==================================================
        POSIÇÕES DOS GIRASSÓIS
==================================================*/

/*
    left = posição horizontal
    bottom = altura em relação ao chão
    scale = tamanho

    Todos ficam abaixo da legenda.
*/

const sunflowerPositions = [

    {
        left: 12,
        bottom: 55,
        scale: .55
    },

    {
        left: 25,
        bottom: 75,
        scale: .70
    },

    {
        left: 38,
        bottom: 60,
        scale: .60
    },

    {
        left: 50,
        bottom: 90,
        scale: .85
    },

    {
        left: 62,
        bottom: 65,
        scale: .72
    },

    {
        left: 75,
        bottom: 80,
        scale: .80
    },

    {
        left: 88,
        bottom: 55,
        scale: .58
    }

];


/*==================================================
        CLIQUE NO GIRASSOL PRINCIPAL
==================================================*/

sunflower.addEventListener("click", () => {

    /*
        Evita dois cliques simultâneos.
    */

    if (planting) {
        return;
    }


    /*
        Não há mais memórias para plantar.
    */

    if (currentMemory >= memories.length) {

        sunflower.animate(

            [
                {
                    transform:
                    "translateX(-50%) scale(1)"
                },

                {
                    transform:
                    "translateX(-50%) scale(1.08)"
                },

                {
                    transform:
                    "translateX(-50%) scale(1)"
                }
            ],

            {
                duration:400
            }

        );

        return;
    }


    planting = true;


    /*========================
        MÚSICA
    ========================*/

    if (music.paused) {

        music
            .play()
            .catch(() => {});

    }


    /*========================
        ANIMAÇÃO DO GIRASSOL
    ========================*/

    sunflower.animate(

        [

            {
                transform:
                "translateX(-50%) scale(1)"
            },

            {
                transform:
                "translateX(-50%) scale(1.15) rotate(5deg)"
            },

            {
                transform:
                "translateX(-50%) scale(1)"
            }

        ],

        {

            duration:500,

            easing:"ease-out"

        }

    );


    /*========================
        PLANTAR
    ========================*/

    plantMemoryFlower(
        currentMemory
    );

});


/*==================================================
        PLANTAR GIRASSOL
==================================================*/

function plantMemoryFlower(index) {

    const memory =
        memories[index];

    const position =
        sunflowerPositions[
            index %
            sunflowerPositions.length
        ];


    const flower =
        document.createElement("img");


    flower.src =
        "imagem/girassol.png";


    flower.className =
        "memoryFlower";


    /*
        Posicionamento usando LEFT + BOTTOM.

        Isso é importante.

        Não usamos TOP aqui, porque o terreno
        está na parte inferior da tela.
    */

    flower.style.left =
        position.left + "%";


    flower.style.bottom =
        position.bottom + "px";


    flower.style.transform =
        `translateX(-50%) scale(${position.scale})`;


    flower.style.zIndex =
        Math.round(
            10 +
            position.scale * 10
        );


    gardenField.appendChild(
        flower
    );


    /*========================
        ANIMAÇÃO DE NASCIMENTO
    ========================*/

    flower.animate(

        [

            {
                opacity:0,

                transform:
                `translateX(-50%)
                 translateY(35px)
                 scale(0)`
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

            duration:800,

            easing:"ease-out",

            fill:"forwards"

        }

    );


    /*========================
        BRILHO
    ========================*/

    createSpark(
        position.left,
        position.bottom
    );


    /*========================
        CLIQUE NA FLOR
    ========================*/

    flower.addEventListener(
        "click",
        (event) => {

            /*
                Impede que o clique
                atravesse para outros elementos.
            */

            event.stopPropagation();

            showMemory(
                memory
            );

        }
    );


    /*========================
        ABRIR MEMÓRIA
    ========================*/

    setTimeout(() => {

        showMemory(
            memory
        );


        planting = false;


        currentMemory++;


    }, 850);

}
/*==================================================
        DECORAÇÕES DO JARDIM
        SCRIPT.JS - PARTE 2
==================================================*/

/*==================================================
        CONFIGURAÇÃO
==================================================*/

const decorationTypes = [

    {
        image: "imagem/margarida.png",
        className: "decorFlower small"
    },

    {
        image: "imagem/tulipa.png",
        className: "decorFlower tiny"
    }

];


/*==================================================
        CRIAR GRAMA
==================================================*/

function createGrass() {

    /*
        Quantidade de tufos.
        No celular usamos menos para
        não deixar o jardim pesado.
    */

    const amount =
        window.innerWidth <= 768
        ? 24
        : 45;


    for(let i = 0; i < amount; i++){

        const grass =
            document.createElement("img");


        /*
            Alterna entre os dois tipos
            de grama.
        */

        const type =
            Math.random() < .5
            ? "grama1.png"
            : "grama2.png";


        grass.src =
            "imagem/" + type;


        grass.className =
            "grassDecoration";


        /*
            Posição horizontal aleatória.
        */

        const left =
            3 + Math.random() * 94;


        /*
            A grama fica na parte inferior
            do jardim.

            Não usamos TOP porque isso
            poderia colocar grama no céu.
        */

        const bottom =
            15 + Math.random() * 190;


        grass.style.left =
            left + "%";


        grass.style.bottom =
            bottom + "px";


        /*
            Tamanho aleatório.
        */

        const scale =
            .55 + Math.random() * .55;


        grass.style.transform =
            `translateX(-50%) scale(${scale})`;


        /*
            Pequena variação na animação.
        */

        grass.style.animationDelay =
            (Math.random() * 3) + "s";


        grassLayer.appendChild(
            grass
        );

    }

}


/*==================================================
        CRIAR FLORES DECORATIVAS
==================================================*/

function createDecorativeFlowers() {

    /*
        Quantidade de flores.

        Elas serão discretas para que
        os girassóis continuem sendo
        os protagonistas.
    */

    const amount =
        window.innerWidth <= 768
        ? 14
        : 28;


    for(let i = 0; i < amount; i++){

        const type =
            decorationTypes[
                Math.floor(
                    Math.random() *
                    decorationTypes.length
                )
            ];


        const flower =
            document.createElement("img");


        flower.src =
            type.image;


        flower.className =
            type.className;


        /*
            Posição horizontal.
        */

        const left =
            4 + Math.random() * 92;


        /*
            Altura.

            Limitamos a altura para evitar
            que as flores apareçam sobre
            o texto.
        */

        const bottom =
            25 + Math.random() * 170;


        flower.style.left =
            left + "%";


        flower.style.bottom =
            bottom + "px";


        /*
            Tamanho aleatório.
        */

        const scale =
            .65 + Math.random() * .5;


        flower.style.transform =
            `translateX(-50%) scale(${scale})`;


        flower.style.animationDelay =
            (Math.random() * 4) + "s";


        flowerLayer.appendChild(
            flower
        );

    }

}


/*==================================================
        BRILHO
==================================================*/

function createSpark(left, bottom) {

    const spark =
        document.createElement("div");


    spark.className =
        "spark";


    spark.style.left =
        left + "%";


    spark.style.bottom =
        (bottom + 45) + "px";


    effectLayer.appendChild(
        spark
    );


    setTimeout(() => {

        spark.remove();

    }, 900);

}


/*==================================================
        INICIAR DECORAÇÕES
==================================================*/

createGrass();

createDecorativeFlowers();