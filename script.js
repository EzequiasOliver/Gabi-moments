/* =========================================================
   GABI MOMENTS — VERSÃO CORRIGIDA
   SCRIPT.JS — PARTE 1/3

   MECÂNICA:

   Girassol grande
        ↓
   clique
        ↓
   nasce UM girassol no jardim
        ↓
   memória abre automaticamente

   IMPORTANTE:
   - Nenhum girassol de memória nasce ao carregar a página.
   - Margaridas/tulipas NÃO serão usadas como flores de memória.
   - Cada memória possui apenas um girassol.
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

    /*
       Somente imagens de vegetação.

       NÃO colocamos margarida ou tulipa aqui,
       porque elas estavam fazendo flores aparecerem
       antes das memórias serem descobertas.
    */

    grassImages: [
        "imagem/grama1.png",
        "imagem/grama2.png"
    ],

    memoryFlower:
        "imagem/girassol.png",

    ladybug:
        "imagem/joaninha.png",

    funnyLadybug:
        "imagem/joaninha-engracada.jpg"

};


/* =========================================================
   REFERÊNCIAS
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
   ESTADO
========================================================= */

const gardenState = {

    memoriesFound:
        0,

    creatingFlower:
        false,

    completed:
        false

};


/* =========================================================
   POSIÇÕES DOS GIRASSÓIS
========================================================= */

/*
   Cada memória terá uma posição própria.

   As posições foram escolhidas para evitar:

   - ficar atrás do girassol principal;
   - nascer fora do morro;
   - nascer escondida atrás de outra flor;
   - nascer no céu.

   A posição é relativa AO MORRO.
*/

const flowerSpawnPositions = [

    {
        hill: "far",
        left: 32,
        bottom: 42,
        size: 48
    },

    {
        hill: "back",
        left: 68,
        bottom: 46,
        size: 52
    },

    {
        hill: "middle",
        left: 25,
        bottom: 52,
        size: 58
    },

    {
        hill: "middle",
        left: 74,
        bottom: 48,
        size: 56
    },

    {
        hill: "front",
        left: 25,
        bottom: 50,
        size: 62
    },

    {
        hill: "front",
        left: 75,
        bottom: 44,
        size: 60
    }

];


/* =========================================================
   POSIÇÕES UTILIZADAS
========================================================= */

const usedFlowerPositions =
    new Set();


/* =========================================================
   FUNÇÕES ALEATÓRIAS
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

    if (
        !array ||
        array.length === 0
    ) {

        return null;

    }


    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================================================
   ESCOLHER POSIÇÃO DO GIRASSOL
========================================================= */

function chooseFlowerSpawn() {

    const available =
        flowerSpawnPositions.filter(
            (_, index) => {

                return !usedFlowerPositions
                    .has(index);

            }
        );


    if (
        available.length === 0
    ) {

        return null;

    }


    const selected =
        choose(available);


    const index =
        flowerSpawnPositions.indexOf(
            selected
        );


    usedFlowerPositions.add(
        index
    );


    return selected;

}


/* =========================================================
   VEGETAÇÃO
========================================================= */

/*
   Quantidade de GRAMA por morro.

   Perceba que não existe mais
   "flower" aqui.

   Isso elimina as flores aleatórias
   que estavam aparecendo sozinhas.
*/

const vegetationAmount = {

    far: 7,

    back: 10,

    middle: 14,

    front: 18

};


/* =========================================================
   CRIAR GRAMA
========================================================= */

function createGrass(container) {

    if (!container) {

        return null;

    }


    const grass =
        document.createElement("img");


    grass.className =
        "grass";


    grass.src =
        choose(
            CONFIG.grassImages
        );


    grass.alt =
        "";


    grass.draggable =
        false;


    grass.style.left =
        `${random(5, 95)}%`;


    grass.style.bottom =
        `${random(2, 42)}px`;


    grass.style.setProperty(
        "--rotation",
        `${random(-8, 8)}deg`
    );


    grass.style.setProperty(
        "--wind-speed",
        `${random(3.8, 6.5)}s`
    );


    grass.style.animationDelay =
        `${random(-5, 0)}s`;


    const scale =
        random(.75, 1.08);


    grass.style.scale =
        scale;


    container.appendChild(
        grass
    );


    return grass;

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
       Limpa somente a vegetação
       antes de criar novamente.
    */

    hill.vegetation
        .replaceChildren();


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        createGrass(
            hill.vegetation
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
   GABI MOMENTS — VERSÃO CORRIGIDA
   SCRIPT.JS — PARTE 2/3

   Girassol de memória
   + abertura automática
   + modais
   + pétalas
========================================================= */


/* =========================================================
   CRIAR GIRASSOL DE MEMÓRIA
========================================================= */

function createMemoryFlower(
    memoryIndex,
    spawn
) {

    if (!spawn) {

        console.error(
            "Gabi Moments: posição do girassol não encontrada."
        );

        return null;

    }


    const hill =
        hills[spawn.hill];


    if (
        !hill ||
        !hill.element ||
        !hill.vegetation
    ) {

        console.error(
            "Gabi Moments: morro inválido:",
            spawn.hill
        );

        return null;

    }


    /*
       IMPORTANTE:

       O girassol é colocado diretamente
       no container de vegetação do morro.

       Ele NÃO é criado no HTML.

       Portanto, antes do primeiro clique,
       não existe nenhum girassol de memória.
    */

    const flower =
        document.createElement("img");


    flower.className =
        "memory-flower";


    flower.src =
        CONFIG.memoryFlower;


    flower.alt =
        `Girassol da lembrança ${memoryIndex + 1}`;


    flower.draggable =
        false;


    flower.dataset.memoryIndex =
        String(memoryIndex);


    flower.style.left =
        `${spawn.left}%`;


    flower.style.bottom =
        `${spawn.bottom}px`;


    flower.style.setProperty(
        "--memory-size",
        `${spawn.size}px`
    );


    /*
       Estado inicial.

       A flor começa invisível e pequena.
    */

    flower.style.opacity =
        "0";


    flower.style.transform =
        "translateX(-50%) scale(0)";


    /*
       Adiciona ao morro.
    */

    hill.vegetation.appendChild(
        flower
    );


    /*
       Força o navegador a reconhecer
       o estado inicial antes da animação.
    */

    requestAnimationFrame(
        () => {

            flower.animate(

                [
                    {
                        opacity: 0,

                        transform:
                            "translateX(-50%) scale(0) rotate(-12deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(-50%) scale(1.16) rotate(4deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(-50%) scale(1) rotate(0deg)"
                    }
                ],

                {
                    duration: 850,

                    easing:
                        "cubic-bezier(.18,.9,.25,1)",

                    fill:
                        "forwards"
                }

            );

        }
    );


    /*
       Clicar em um girassol já descoberto
       abre novamente a memória dele.

       Isso NÃO cria outro girassol.
    */

    flower.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const index =
                Number(
                    flower.dataset.memoryIndex
                );


            openMemory(index);

        }
    );


    return flower;

}


/* =========================================================
   DESCOBRIR PRÓXIMA MEMÓRIA
========================================================= */

function discoverNextMemory() {

    /*
       Não existe uma quarta memória.
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
       Impede clique duplo enquanto
       a flor ainda está nascendo.
    */

    if (
        gardenState.creatingFlower
    ) {

        return;

    }


    gardenState.creatingFlower =
        true;


    /*
       O índice é definido ANTES de
       aumentar memoriesFound.

       Assim:

       primeiro clique → memória 0
       segundo clique → memória 1
       terceiro clique → memória 2
    */

    const memoryIndex =
        gardenState.memoriesFound;


    const spawn =
        chooseFlowerSpawn();


    if (!spawn) {

        gardenState.creatingFlower =
            false;

        console.error(
            "Gabi Moments: não há posições livres para o girassol."
        );

        return;

    }


    const flower =
        createMemoryFlower(
            memoryIndex,
            spawn
        );


    /*
       Se a criação falhou,
       não contamos a memória.
    */

    if (!flower) {

        gardenState.creatingFlower =
            false;

        usedFlowerPositions.forEach(
            index => {

                /*
                   Nada aqui é removido
                   automaticamente porque
                   a posição só é consumida
                   quando a flor realmente nasce.
                */

            }
        );

        return;

    }


    /*
       Agora sim a memória foi descoberta.
    */

    gardenState.memoriesFound++;


    /*
       A flor tem alguns milissegundos
       para aparecer antes da foto.
    */

    setTimeout(
        () => {

            openMemory(
                memoryIndex
            );


            gardenState.creatingFlower =
                false;


            if (
                gardenState.memoriesFound >=
                CONFIG.photos.length
            ) {

                gardenState.completed =
                    true;

            }

        },

        650
    );

}


/* =========================================================
   ABRIR MEMÓRIA
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

        console.error(
            "Gabi Moments: modal da memória não encontrado."
        );

        return;

    }


    /*
       Verificação de índice.
    */

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= CONFIG.photos.length
    ) {

        console.error(
            "Gabi Moments: índice de memória inválido:",
            index
        );

        return;

    }


    /*
       Coloca a foto correta.
    */

    image.src =
        CONFIG.photos[index];


    image.alt =
        `Foto da lembrança ${index + 1}`;


    /*
       Coloca a legenda correta.
    */

    if (
        elements.memoryCaption
    ) {

        elements.memoryCaption.textContent =
            CONFIG.captions[index] || "";

    }


    /*
       Contador.
    */

    if (
        elements.memoryCounter
    ) {

        elements.memoryCounter.textContent =
            `${index + 1} / ${CONFIG.photos.length}`;

    }


    /*
       Abre o modal.
    */

    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
       Impede a página de rolar
       enquanto a foto está aberta.
    */

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


    /*
       Limpa a imagem depois de fechar.

       Isso evita que a foto anterior
       fique carregada desnecessariamente.
    */

    if (
        elements.memoryImage
    ) {

        elements.memoryImage.src =
            "";

        elements.memoryImage.alt =
            "";

    }


    /*
       Só devolvemos o scroll se
       nenhum outro modal estiver aberto.
    */

    const ladybugIsOpen =
        elements.ladybugModal &&
        elements.ladybugModal.classList.contains(
            "show"
        );


    if (!ladybugIsOpen) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   ABRIR JOANINHA
========================================================= */

function openLadybugModal() {

    const modal =
        elements.ladybugModal;


    if (!modal) {

        console.error(
            "Gabi Moments: modal da joaninha não encontrado."
        );

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
   FECHAR JOANINHA
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


    const memoryIsOpen =
        elements.memoryModal &&
        elements.memoryModal.classList.contains(
            "show"
        );


    if (!memoryIsOpen) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   BOTÃO FECHAR — MEMÓRIA
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
   BOTÃO FECHAR — JOANINHA
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
   FECHAR CLICANDO FORA DA FOTO
========================================================= */

if (
    elements.memoryModal
) {

    elements.memoryModal.addEventListener(
        "click",
        event => {

            /*
               Só fecha quando o clique
               foi realmente no fundo escuro.

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
                        "translate3d(0,-35px,0) rotate(0deg)"
                },

                {
                    transform:
                        `
                        translate3d(
                            ${drift}px,
                            110vh,
                            0
                        )
                        rotate(${rotation}deg)
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

function createPetalBurst() {

    const amount =
        randomInt(12, 18);


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
/* =========================================================
   GABI MOMENTS — VERSÃO CORRIGIDA
   SCRIPT.JS — PARTE 3/3

   Girassol principal
   + joaninha
   + inicialização
   + limpeza segura
========================================================= */


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
               Cada clique no girassol grande
               desbloqueia UMA memória.

               1º clique → girassol 1 + memória 1
               2º clique → girassol 2 + memória 2
               3º clique → girassol 3 + memória 3

               Depois disso não nasce mais
               nenhum girassol.
            */

            if (
                gardenState.memoriesFound <
                CONFIG.photos.length
            ) {

                discoverNextMemory();

            }


            /*
               Pétalas acompanham o clique,
               mas não interferem na mecânica.
            */

            createPetalBurst();

        }
    );

}


/* =========================================================
   ESTADO DA JOANINHA
========================================================= */

const ladybugState = {

    /*
       Posição horizontal em porcentagem.
    */

    x: 12,

    /*
       1 = direita
       -1 = esquerda
    */

    direction: 1,

    /*
       Está andando?
    */

    walking: true,

    /*
       Momento em que termina uma pausa.
    */

    pauseUntil: 0,

    /*
       Próxima pausa aleatória.
    */

    nextPause: 0,

    /*
       Velocidade em porcentagem por frame.
    */

    speed: 0.026

};


/* =========================================================
   LIMITES DA JOANINHA
========================================================= */

const ladybugLimits = {

    minX: 7,

    maxX: 88

};


/* =========================================================
   ATUALIZAR VISUAL DA JOANINHA
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
       O scaleX controla somente
       a direção horizontal.

       Não mexemos no translate aqui,
       porque a posição já é controlada
       pelo left.
    */

    bug.style.transform =
        `scaleX(${ladybugState.direction})`;

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
            3500,
            7000
        );

}


/* =========================================================
   PAUSAR JOANINHA
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
            2300
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
       Se ela está parada,
       aguardamos o tempo da pausa.
    */

    if (
        !ladybugState.walking
    ) {

        if (
            currentTime >=
            ladybugState.pauseUntil
        ) {

            /*
               Existe uma chance de ela
               mudar de direção.
            */

            if (
                Math.random() < .5
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
       Pausa aleatória.
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
   CLIQUE DA JOANINHA
========================================================= */

if (
    elements.ladybug
) {

    elements.ladybug.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            /*
               A joaninha para enquanto
               a lembrança está aberta.
            */

            ladybugState.walking =
                false;


            ladybugState.pauseUntil =
                performance.now() +
                3000;


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


    /*
       Faz a primeira pausa acontecer
       somente depois de algum tempo.
    */

    scheduleLadybugPause(
        now
    );


    updateLadybugVisual();


    requestAnimationFrame(
        ladybugAnimationLoop
    );

}


/* =========================================================
   PRÉ-CARREGAR IMAGENS
========================================================= */

function preloadImages() {

    const sources = [

        ...CONFIG.photos,

        ...CONFIG.decorationImages,

        CONFIG.memoryFlower,

        "imagem/joaninha.png",

        "imagem/joaninha-engracada.jpg"

    ];


    sources.forEach(
        source => {

            if (!source) {

                return;

            }


            const image =
                new Image();


            image.src =
                source;

        }
    );

}


/* =========================================================
   VERIFICAR ESTRUTURA
========================================================= */

function verifyPageStructure() {

    const required = [

        "garden",

        "mainFlower",

        "ladybug",

        "petalLayer",

        "memoryModal",

        "memoryImage",

        "memoryCaption",

        "memoryCounter",

        "memoryClose",

        "ladybugModal",

        "ladybugClose"

    ];


    const missing = [];


    required.forEach(
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

        console.error(
            "Gabi Moments — elementos ausentes:",
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
       Aqui está uma correção importante.

       A limpeza acontece SOMENTE
       durante o carregamento da página.

       Ela não é chamada novamente
       quando o usuário clica.

       Portanto:

       página abre
       ↓
       limpa elementos antigos
       ↓
       cria decoração
       ↓
       usuário clica
       ↓
       girassol nasce
       ↓
       permanece no jardim
    */

    const vegetationContainers = [

        hills.far.vegetation,

        hills.back.vegetation,

        hills.middle.vegetation,

        hills.front.vegetation

    ];


    vegetationContainers.forEach(
        container => {

            if (
                container
            ) {

                container.replaceChildren();

            }

        }
    );


    /*
       Nenhuma memória começa
       desbloqueada.
    */

    gardenState.memoriesFound =
        0;


    gardenState.creatingFlower =
        false;


    gardenState.completed =
        false;


    usedFlowerPositions.clear();

}


/* =========================================================
   INICIALIZAR JARDIM
========================================================= */

function initializeGarden() {

    /*
       Primeiro verificamos a estrutura.
    */

    const pageIsValid =
        verifyPageStructure();


    /*
       Mesmo que exista algum elemento
       opcional ausente, continuamos com
       o que estiver disponível.
    */

    if (!pageIsValid) {

        console.warn(
            "Gabi Moments: alguns elementos estão ausentes. Verifique o HTML."
        );

    }


    /*
       Limpeza acontece UMA ÚNICA VEZ.
    */

    cleanDynamicElements();


    /*
       Carregamos as imagens.
    */

    preloadImages();


    /*
       Criamos somente a vegetação
       decorativa.

       NÃO criamos nenhum girassol
       de memória.
    */

    populateAllHills();


    /*
       A joaninha começa a andar.
    */

    startLadybug();

}


/* =========================================================
   EVITAR ARRASTAR IMAGENS
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
   EVITAR DUPLA INICIALIZAÇÃO
========================================================= */

let gardenInitialized =
    false;


/* =========================================================
   INICIALIZAÇÃO SEGURA
========================================================= */

function safeInitializeGarden() {

    /*
       Protege contra o script ser executado
       duas vezes acidentalmente.
    */

    if (
        gardenInitialized
    ) {

        return;

    }


    gardenInitialized =
        true;


    initializeGarden();

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
        safeInitializeGarden,
        {
            once: true
        }
    );

} else {

    safeInitializeGarden();

}


/* =========================================================
   FIM DO SCRIPT.JS
========================================================= */