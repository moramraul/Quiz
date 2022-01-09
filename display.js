

var correo1 = sessionStorage.getItem('usuarioActivo');
var usuarioAlmacenado = localStorage.getItem(`${correo1}`)
var usuarioJson = JSON.parse(usuarioAlmacenado);

var logoutq = document.querySelector(".logout");
var empezar = document.querySelector(".empezar");
var pregunta = document.querySelector(".pregunta");
var registrolog = document.querySelector(".registerlogin");
var historial = document.querySelector("#historial");
var grafica = document.querySelector("#grafica1");
var top3qs = document.querySelector("#grafico2");
var bienv = document.querySelector("#Bienvenido")
var pTop = document.querySelector("#pTop");
var pGraf = document.querySelector("#pGraf");
var pHist = document.querySelector("#pHist");

if (sessionStorage.logeado === "si") {
    bienv.style = "display : none";
    logoutq.style = "display : flex";
    empezar.style = "display : flex";
    pregunta.style = "display : inline";
    top3qs.style = "display : block";
    registrolog.style = "display : none";
    if (usuarioJson["totalTests"] > 0) {
        historial.style = "display : flex";
        grafica.style = "display : block";
        grafico(usuarioJson["numTests"], usuarioJson["puntuacion"]);
        generaTabla(usuarioJson["numTests"], usuarioJson["puntuacion"]);
        topTres();
    } else {
        historial.style = "display : none";
        grafica.style = "display : none";
        top3qs.style = "display: none";
        pTop.style = "display: none";
        pGraf.style = "display: none";
        pHist.style = "display: none";

    }

} else {
    logoutq.style = "display : none";
    empezar.style = "display : none";
    pregunta.style = "display : none";
    grafica.style = "display : none";
    historial.style = "display : none";
    top3qs.style = "display : none";
    pTop.style = "display: none";
    pGraf.style = "display: none";
    pHist.style = "display: none";
}
