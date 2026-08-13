/* =========================================================
   GABI MOMENTS — NOVA MECÂNICA
   SCRIPT.JS — PARTE 1/3

   MECÂNICA PRINCIPAL:

   Girassol grande
        ↓ clique
   nasce um girassol
        ↓
   memória abre automaticamente

   Os girassóis de memória NÃO existem
   antes da interação.
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
   REFERÊNCIAS DO HTML
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
   ESTADO DO JARDIM
========================================================= */

const gardenState = {

    /*
       Quantas memórias já foram descobertas.
    */

    memoriesFound: 0,

    /*
       Evita dois cliques rápidos criarem
       duas flores para a mesma memória.
    */

    creatingFlower: false,

    /*
       Depois que as três memórias forem
       descobertas, o jardim entra no estado
       completo.
    */

    completed: false

};


/* =========================================================
   POSIÇÕES POSSÍVEIS DOS GIRASSÓIS
========================================================= */

/*
   Os girassóis são distribuídos pelos
   quatro morros.

   Cada posição pertence a um morro.

   Não usamos posições fixas todas de uma vez.
   O JavaScript escolhe uma delas somente
   quando o jogador descobre uma memória.
*/

const flowerSpawnPositions = [

    {
        hill:
            "far",

        left:
            34,

        bottom:
            42,

        size:
            48
    },

    {
        hill:
            "back",

        left:
            68,

        bottom:
            48,

        size:
            52
    },

    {
        hill:
            "middle",

        left:
            24,

        bottom:
            55,

        size:
            60
    },

    {
        hill:
            "middle",

        left:
            73,

        bottom:
            50,

        size:
            56
    },

    {
        hill:
            "front",

        left:
            28,

        bottom:
            54,

        size:
            66
    },

    {
        hill:
            "front",

        left:
            72,

        bottom:
            47,

        size:
            62
    }

];


/* =========================================================
   POSIÇÕES JÁ UTILIZADAS
========================================================= */

const usedFlowerPositions = new Set();


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
   ESCOLHER POSIÇÃO PARA NOVO GIRASSOL
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions.filter(
            (_, index) =>
                !usedFlowerPositions.has(index)
        );


    /*
       Se ainda existem posições livres,
       escolhemos uma delas.
    */

    if (available.length > 0) {

        const selected =
            choose(available);


        const originalIndex =
            flowerSpawnPositions.indexOf(
                selected
            );


        usedFlowerPositions.add(
            originalIndex
        );


        return selected;

    }


    /*
       Este caso praticamente nunca será
       necessário porque temos seis posições
       para apenas três memórias.

       Ainda assim, existe uma proteção.
    */

    return flowerSpawnPositions[
        gardenState.memoriesFound %
        flowerSpawnPositions.length
    ];

}


/* =========================================================
   CRIAR VEGETAÇÃO
========================================================= */

const vegetationAmount = {

    far: 6,

    back: 9,

    middle: 13,

    front: 17

};


/* =========================================================
   CRIAR PLANTA
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


    plant.alt =
        "";


    plant.draggable =
        false;


    /*
       A planta pertence exclusivamente
       ao container do próprio morro.
    */

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


    const scale =
        random(.78, 1.08);


    plant.style.scale =
        scale;


    container.appendChild(
        plant
    );

}


/* =========================================================
   POPULAR UM MORRO
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


    /*
       Vegetação normal pode ser recriada
       sem problemas.
    */

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
   FIM DA PARTE 1/3
========================================================= */
/* =========================================================
   GABI MOMENTS — NOVA MECÂNICA
   SCRIPT.JS — PARTE 2/3

   Nascimento dos girassóis
   + abertura automática das memórias
   + joaninha
   + pétalas
========================================================= */


/* =========================================================
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    memoryIndex,
    spawn
) {

    /*
       Descobre em qual morro o girassol
       deve nascer.
    */

    const hill =
        hills[spawn.hill];


    if (
        !hill ||
        !hill.vegetation
    ) {

        return null;
    }


    /*
       Criamos o girassol dentro do
       container do morro.

       Assim ele nunca fica solto no céu
       ou em outro morro.
    */

    const flower =
        document.createElement("img");


    flower.className =
        "memory-flower";


    flower.src =
        "imagem/girassol.png";


    flower.alt =
        `Girassol da lembrança ${memoryIndex + 1}`;


    flower.draggable =
        false;


    flower.dataset.memoryIndex =
        memoryIndex;


    flower.style.left =
        `${spawn.left}%`;


    flower.style.bottom =
        `${spawn.bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${spawn.size}px`
    );


    /*
       Começa pequeno e invisível.
       Depois fazemos a flor nascer.
    */

    flower.style.opacity =
        "0";


    flower.style.transform =
        "translateX(-50%) scale(0)";


    /*
       O container de vegetação é usado
       apenas para manter a flor dentro
       do morro.
    */

    hill.vegetation.appendChild(
        flower
    );


    /*
       Animação de nascimento.
    */

    requestAnimationFrame(
        () => {

            flower.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            `
                            translateX(-50%)
                            scale(0)
                            rotate(-8deg)
                            `
                    },

                    {
                        opacity: 1,

                        transform:
                            `
                            translateX(-50%)
                            scale(1.12)
                            rotate(3deg)
                            `
                    },

                    {
                        opacity: 1,

                        transform:
                            `
                            translateX(-50%)
                            scale(1)
                            rotate(0deg)
                            `
                    }

                ],

                {
                    duration: 900,

                    easing:
                        "cubic-bezier(.2,.9,.2,1)",

                    fill:
                        "forwards"
                }

            );

        }
    );


    /*
       O clique no girassol que já nasceu
       também abre a mesma memória.
    */

    flower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            openMemory(
                memoryIndex
            );

        }
    );


    return flower;

}


/* =========================================================
   DESCOBRIR PRÓXIMA MEMÓRIA
========================================================= */

function discoverNextMemory() {

    /*
       Não há mais memórias.
    */

    if (
        gardenState.memoriesFound >=
        CONFIG.photos.length
    ) {

        gardenState.completed =
            true;

        return;

    }


    /*
       Evita dois girassóis nascerem
       simultaneamente.
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


    /*
       Se houve algum problema na criação,
       não avançamos o contador.
    */

    if (!flower) {

        gardenState.creatingFlower =
            false;

        return;

    }


    /*
       A memória foi descoberta.
    */

    gardenState.memoriesFound++;


    /*
       Pequena espera para o girassol
       terminar de nascer antes da foto
       aparecer.

       Isso deixa a interação mais bonita.
    */

    setTimeout(
        () => {

            openMemory(
                memoryIndex
            );


            gardenState.creatingFlower =
                false;


            /*
               Depois da terceira memória,
               marcamos o jardim como completo.
            */

            if (
                gardenState.memoriesFound >=
                CONFIG.photos.length
            ) {

                gardenState.completed =
                    true;

            }

        },

        700
    );

}


/* =========================================================
   MODAL DE MEMÓRIA
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


    if (
        !elements.ladybugModal ||
        !elements.ladybugModal.classList.contains(
            "show"
        )
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
        !elements.memoryModal.classList.contains(
            "show"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   BOTÃO DE FECHAR — MEMÓRIA
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
   BOTÃO DE FECHAR — JOANINHA
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
   FECHAR CLICANDO NO FUNDO
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
   ESC FECHA OS MODAIS
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
                        `
                        translate3d(
                            0,
                            -35px,
                            0
                        )
                        rotate(0deg)
                        `
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

    const amount =
        randomInt(
            12,
            18
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
   FIM DA PARTE 2/3
========================================================= */