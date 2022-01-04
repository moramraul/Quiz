var logoutq = document.querySelector(".logout");
var empezar = document.querySelector(".empezar");
var history = document.querySelector(".history");
var pregunta = document.querySelector(".pregunta");
var registro = document.querySelector(".registro");
var loginq = document.querySelector(".login");
var top3 = document.querySelector("#top3");
// var grafica = document.querySelector(".ct-chart");
var historial = document.querySelector("#historial");

if (sessionStorage.logeado === "si") {
    logoutq.style = "display : inline";
    empezar.style = "display : inline";
    history.style = "display : inline";
    pregunta.style = "display : inline";
    top3.style = "display : inline";
    // grafica.style = "display : inline";
    historial.style = "display : inline";
    registro.style = "display : none";
    loginq.style  = "display : none";
} else {
    logoutq.style = "display : none";
    empezar.style = "display : none";
    history.style = "display : none";
    pregunta.style = "display : none";
    top3.style = "display : none";
    // grafica.style = "display : none";
    historial.style = "display : none";
    registro.style = "display : unset";
    loginq.style = "display : unset";

}
