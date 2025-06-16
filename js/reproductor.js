'use strict';

var maximo = 0;
var bucle;
var play, pause, replay10, forward10, volUp, volDown, volMute, speed, restart;
var medio, barra, progreso;

function iniciar() {
    const themeIcon = document.getElementById('themeIcon');
    const themeButton = document.getElementById('themeButton');
    const marcoReproductor = document.querySelector('.marco-reproductor');

    // Tema inicial
    marcoReproductor.classList.add('tema-claro');

    themeButton.addEventListener('click', () => {
        const isDark = marcoReproductor.classList.contains('tema-oscuro');
        marcoReproductor.classList.toggle('tema-claro', isDark);
        marcoReproductor.classList.toggle('tema-oscuro', !isDark);
        themeIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
    });

    medio = document.getElementById('medio');
    barra = document.getElementById('barra');
    progreso = document.getElementById('progreso');
    maximo = barra.clientWidth;

    play = document.getElementById('play');
    pause = document.getElementById('pause');
    replay10 = document.getElementById('replay10');
    forward10 = document.getElementById('forward10');
    volUp = document.getElementById('volUp');
    volDown = document.getElementById('volDown');
    volMute = document.getElementById('volMute');
    speed = document.getElementById('speed');
    restart = document.getElementById('restart');

    play.addEventListener('click', comenzar, false);
    pause.addEventListener('click', parar, false);
    replay10.addEventListener('click', retroceder, false);
    forward10.addEventListener('click', adelantar, false);
    volUp.addEventListener('click', subir, false);
    volDown.addEventListener('click', bajar, false);
    volMute.addEventListener('click', apagar, false);
    speed.addEventListener('click', velocidad, false);
    restart.addEventListener('click', reiniciar, false);
    barra.addEventListener('click', mover, false);

    play.classList.remove("oculto");
    pause.classList.add("oculto");
}

function comenzar() {
    if (medio.paused || medio.ended) {
        medio.play();
        bucle = setInterval(estado, 100);
        setComenzar();
    }
}

function setComenzar() {
    play.classList.add("oculto");
    pause.classList.remove("oculto");
}

function setFinalizar() {
    play.classList.remove("oculto");
    pause.classList.add("oculto");
}

function parar() {
    if (!medio.paused && !medio.ended) {
        medio.pause();
        window.clearInterval(bucle);
        setFinalizar();
    }
}

function finalizar() {
    medio.pause();
    medio.currentTime = 0;
    window.clearInterval(bucle);
    progreso.style.width = '0px';
    setFinalizar();
}

function retroceder() {
    if (!medio.paused && !medio.ended) {
        medio.currentTime -= 10;
        if (medio.currentTime < 0) medio.currentTime = 0;
    }
}

function adelantar() {
    if (!medio.paused && !medio.ended) {
        medio.currentTime += 10;
        if (medio.currentTime >= medio.duration) {
            medio.currentTime = medio.duration; 
        }
    }
}

function subir() {
    medio.volume = Math.min(1, medio.volume + 0.2);
}

function bajar() {
    medio.volume = Math.max(0, medio.volume - 0.2);
}

function apagar() {
    medio.volume = 0;
}

function velocidad() {
    if (medio.playbackRate === 1) {
        medio.playbackRate = 4;
    } else {
        medio.playbackRate = 1;
    }
}

function reiniciar() {
    medio.currentTime = 0;
    medio.pause();
    progreso.style.width = '0px';
    window.clearInterval(bucle);
    setFinalizar();
}

function estado() {
    if (!medio.ended) {
        const total = parseInt(medio.currentTime * barra.clientWidth / medio.duration);
        progreso.style.width = total + 'px';
    } else {
        progreso.style.width = barra.clientWidth + 'px';
        window.clearInterval(bucle);
        setFinalizar();
    }
}

function mover(e) {
    if (!medio.paused && !medio.ended) {
        const ratonX = e.pageX - barra.offsetLeft;
        const nuevoTiempo = ratonX * medio.duration / barra.clientWidth;
        medio.currentTime = nuevoTiempo;
        progreso.style.width = ratonX + 'px';
    }
}

window.addEventListener('load', iniciar, false);
