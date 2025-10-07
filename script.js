let vidasRestantes = 10;
const frutasImg = ['cereza.png', 'fresa.png', 'limon.png', 'pera.png', 'platano.png', 'sandia.png'];
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const boton = document.getElementById("boton");
const resultado = document.getElementById("resultado");
const vidas = document.getElementById("vidas");
const sonidoVictoria = document.getElementById("sonidoVictoria");
const sonidoDerrota = document.getElementById("sonidoDerrota");
let fruta1, fruta2, fruta3;

function sumarVidas() {
    if (vidasRestantes < 10) {
        vidasRestantes++;
    } else {
        vidasRestantes = 10;
    }
    dibujarCorazones
}

function dibujarCorazones() {
    vidas.innerHTML = "";
    for (let i = 0; i < vidasRestantes; i++) {
        const corazon = document.createElement("span");
        corazon.textContent = "🧡";
        corazon.classList.add("corazon");
        vidas.appendChild(corazon);
    }
}
function getRandomNum() {
    return Math.floor(Math.random() * frutasImg.length);
}
function frutaAleatoria() {
    fruta1 = frutasImg[getRandomNum()];
    fruta2 = frutasImg[getRandomNum()];
    fruta3 = frutasImg[getRandomNum()];
}
function imprimirFrutas() {
    img1.src = `./img/${fruta1}`;
    img2.src = `./img/${fruta2}`;
    img3.src = `./img/${fruta3}`;
}
function animarFrutas() {
    [img1, img2, img3].forEach(img => {
        img.classList.add("animar");
        resultado.innerHTML = "Fruteando...";
        boton.disabled = true;
        frutaAleatoria();
        setTimeout(() => img.classList.remove("animar"), 1000);
        setTimeout(() => resultado.innerHTML = "¡Sigue Fruteando!", 950);
        setTimeout(() => imprimirFrutas(), 950);
        setTimeout(() => boton.disabled = false, 1050);
    })
}
function blur() {
    img1.classList.add("blur");
    img2.classList.add("blur");
    img3.classList.add("blur");
}
function sinVidas() {
    resultado.innerHTML = "¡¡Has sido fruteado!!";
    boton.disabled = true;
    sonidoDerrota.play();
    setTimeout(() => location.reload(), 5000);
}
function ganador() {
    sumarVidas();
    dibujarCorazones();
    resultado.innerHTML = "¡¡Has Freuteado!!";
    boton.disabled = true;
    sonidoVictoria.play();
}
sonidoVictoria.addEventListener("ended", () => {
    sonidoVictoria.currentTime = 0;
});

boton.addEventListener("click", () => {
    if (vidasRestantes <= 0) return;
    vidasRestantes--;
    dibujarCorazones();
    animarFrutas();
    // fruta1 = fruta2 = fruta3 = 'fresa.png';
    const combinacion = [fruta1, fruta2, fruta3];
    console.log(combinacion);
    if (combinacion.every(fruta => fruta === fruta1)) {
        // todas las frutas son iguales
        setTimeout(() => ganador(), 1000);

    } else if (vidasRestantes === 0) {
        setTimeout(() => boton.disabled = true, 1060);
        setTimeout(() => sinVidas(), 1000);
        setTimeout(() => blur(), 1050);
    }
})
dibujarCorazones();