class Jugador {
    constructor(nombre, correo, password, numTests, puntuacion, totalTests) {
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.numTests = numTests;
        this.puntuacion = puntuacion;
        this.totalTests = totalTests;
    }
}

function userName(nombre) {
    var nombre = document.querySelector("input[name='nombre']").value;
    var valnom = true;
    for (let i = 0; i < nombre.length; i++) {
        if ((nombre.charCodeAt(i) > 64 && nombre.charCodeAt(i) < 91) || (nombre.charCodeAt(i) > 96 && nombre.charCodeAt(i) < 123) || (nombre.charCodeAt(i) > 47 && nombre.charCodeAt(i) < 57)) { }
        else {
            valnom = false;
        }
    }
    return valnom
}

function eMail(password) {
    var password = document.querySelector("input[name='email']").value;
    var valmail;
    var mail = password.split("@");
    if (mail.length == 2 && mail[1].split(".").length == 2) { valmail = true }
    else { valmail = false };
    return valmail;
}

function passwordMayusc() {
    var password = document.querySelector("input[name='password']").value;
    var valmay = false;
    var i = 0;
    while (!valmay && i < password.length) {
        if (password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91) { valmay = true }
        else { valmay = false; i++ }

    }
    return valmay;
}

function passwordNums() {
    var password = document.querySelector("input[name='password']").value;
    var valnums = false;
    var i = 0;
    while (!valnums && i < password.length) {
        if (password.charCodeAt(i) > 47 && password.charCodeAt(i) < 57) { valnums = true }
        else { valnums = false; i++ }

    }
    return valnums;
}

function passwordSims() {
    var password = document.querySelector("input[name='password']").value;
    var valsims = false;
    var i = 0;
    while (!valsims && i < password.length) {
        if (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48) { valsims = true }
        else { valsims = false; i++ }

    }
    return valsims;
}

function repetirPass() {
    var password = document.querySelector("input[name='password']").value;
    var password2 = document.querySelector("input[name='password2']").value;
    var checkPass = true;
    if (password == password2) { } else { checkPass = false };
    return checkPass
}

function validatePass() {
    var valpass = true;
    if (passwordMayusc() && passwordNums() && passwordSims() && repetirPass()) { }
    else { valpass = false }
    return valpass;
}

function register() {
    var nombre = document.querySelector("input[name='nombre']").value;
    var password = document.querySelector("input[name='password']").value;
    var correo = document.querySelector("input[name='email']").value;

    var nameOk = userName(nombre);
    var mailOk = eMail(correo);
    var passOk = validatePass(password);
    var ok = nameOk && mailOk && passOk;

    if (ok) {
        var user = new Jugador(nombre, correo, password, [], [], 0);
        var user_cadena = JSON.stringify(user);
        localStorage.setItem(user.correo, user_cadena);
        alert("Te has registrado correctamente");
        document.querySelector(".registro").style = "display : none";

    } else {
        if (!nameOk) {
            alert("El nombre solo puede tener may??sculas y minusculas sin acento y cifras");
        }
        if (!mailOk) {
            alert("El correo tiene que tener el formato correo@algo.com");
        }
        if (!passOk) {
            alert("El password debe incluir al menos un n??mero, una may??scula y uno de estos s??mbolos '!, ??, #, $, %, &,???, (, ), *, +, ,, ???, ., /'")
        }
    }
    return ok;
}

function login() {
    var correo = document.querySelector("input[name='correo2']").value;
    var password = document.querySelector("input[name='password3']").value;
    var usuarioAlmacenado = localStorage.getItem(`${correo}`); //El usuario est?? almacenado en storage con el correo como key. Cojemos todo el string con usuario correo y contrase??a
    var userJson = JSON.parse(usuarioAlmacenado); // Y lo pasamos a Json
    var correoAlmacenado = userJson.correo; // Aqui sacamos del Json el correo
    var passAlmacenado = userJson.password; // Y aqu?? el passworrd
    if (correo == correoAlmacenado && password == passAlmacenado)// Y aqu?? comparamos si los valores de los inputs coinciden con los almacenados. Si s??:
    {
        alert("Has iniciado sesi??n correctamente");
        sessionStorage.setItem("logeado", "si");
        sessionStorage.setItem("usuarioActivo", correo);
        location.reload();
    }
    else { alert("Nombre o contrase??a incorrectos") }
}

function logout() {
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("usuarioActivo")
    location.reload();
    // Cuando deslogueas recuperamos la p??gina inicial. Aqu?? por ahora lo dejamos as?? pero cuando conectemos con las preguntas el borrado ser?? m??s complejo.  
}


var preguntas = [];
function sacarPreguntas() {
    document.querySelector(".empezar").style = "display : none";
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(res => res.json())
        .then(json => {
            preguntas.push(json.results);
            console.log(pregunta);
            return preguntas;
        }).then(e => {
            var formulario = document.createElement("form");
            formulario.id = "quiz";
            var parrafo = document.createElement("p");
            var texto = document.createTextNode(JSON.stringify(preguntas[preguntas.length - 1][0].question));
            var clasePreg = document.querySelector(".pregunta");
            parrafo.append(texto);
            clasePreg.appendChild(formulario);
            formulario.appendChild(parrafo);
            var input = document.createElement("input");
            input.type = 'radio';
            input.id = 'buena';
            input.value = 'buena';
            input.name = "respuesta";
            var label = document.createElement('label')
            label.htmlFor = 'buena';
            label.setAttribute("class", "respuesta");
            var description = document.createTextNode(JSON.stringify(preguntas[preguntas.length - 1][0].correct_answer));

            var control = false;
            var aleatorio = Math.floor(Math.random() * 3);
            for (j = 0; j < 3; j++) {
                var input1 = document.createElement("input");
                input1.name = "respuesta";
                input1.type = 'radio';
                input1.setAttribute("id", "mala");
                input1.value = 'mala';
                var label1 = document.createElement('label');
                label1.htmlFor = 'mala';
                label1.setAttribute("id", "mala");
                label1.setAttribute("class", "respuesta");
                var description1 = document.createTextNode(JSON.stringify(preguntas[preguntas.length - 1][0].incorrect_answers[j]));
                if (j === aleatorio && control === false) {
                    control = true;
                    label.appendChild(description);
                    formulario.appendChild(input);
                    formulario.appendChild(label);
                }
                label1.appendChild(description1);
                formulario.appendChild(input1);
                formulario.appendChild(label1);
            }
            var enter = document.createElement("br");
            var enter1 = document.createElement("br");
            var submit1 = document.createElement("input");
            submit1.id = "siguiente";
            submit1.type = "button";
            submit1.value = "Siguiente";
            submit1.setAttribute("onclick", "siguientePregunta()");
            formulario.appendChild(enter);
            formulario.appendChild(enter1);
            formulario.appendChild(submit1);
        })
}


var preguntasTotales = 0;
var contadorPuntuacion = 0;


function siguientePregunta() {
    var form = document.querySelector("#quiz");
    var tabla = document.querySelector("#tabla");
    if (preguntasTotales < 19) {
        if (form.elements["buena"].checked) {
            contadorPuntuacion++;
            form.remove();
            sacarPreguntas();
            preguntasTotales++;
        } else {
            form.remove();
            sacarPreguntas();
            preguntasTotales++;
        }
    } else {
        if (form.elements["buena"].checked) {
            contadorPuntuacion++;
        }
        var submit2 = document.querySelector("#siguiente");
        submit2.value = "Finalizar Test";
        alert("test terminado, tu resultado es " + contadorPuntuacion);
        form.remove();
        if (tabla !== null) {
            tabla.remove();
        }
        document.querySelector(".empezar").style = "display : unset";
        var correo1 = sessionStorage.getItem('usuarioActivo');
        var usuarioAlmacenado = localStorage.getItem(`${correo1}`)
        var usuarioJson = JSON.parse(usuarioAlmacenado);
        usuarioJson["totalTests"]++;
        usuarioJson["numTests"].push(usuarioJson["totalTests"].toString());
        usuarioJson["puntuacion"].push(contadorPuntuacion);
        var conTestString = JSON.stringify(usuarioJson);
        localStorage.setItem(correo1, conTestString);
        preguntasTotales = 0;
        contadorPuntuacion = 0;
        grafico(usuarioJson["numTests"], usuarioJson["puntuacion"]);
        topTres();
        generaTabla(usuarioJson["numTests"], usuarioJson["puntuacion"]);
        location.reload();
    }
}

function grafico(labels, series) {
    new Chartist.Line('.ct-chart', {
        labels: labels,
        series: [series]
    }, {
        high: 21,
        low: 0,
        fullWidth: true,
        axisY: {
            onlyInteger: true,
        },
        chartPadding: {
            right: 50
        }
    });
}



class top3 {
    constructor(userTop, puntuacionMaxTop) {
        this.userTop = userTop;
        this.puntuacionMaxTop = puntuacionMaxTop;
    }
}


function topTres() {
    var topTres = [];
    for (let i = 0; i < localStorage.length; i++) {
        let sKey = localStorage.key(i);
        let aPuntuacion = JSON.parse(localStorage.getItem(sKey)).puntuacion;
        let maxima = Math.max(...aPuntuacion)
        // aTodosUsersPuntTop.push("Usuario: " + sKey + " Puntuacion: " + maxima); 
        topTres.push(new top3(sKey, maxima));
    }
    topTres.sort(((a, b) => b.puntuacionMaxTop - a.puntuacionMaxTop));
    var topTresPuntFinal = [];
    var topTresUserFinal = [];
    for (let j = 0; j < 3; j++) {
        if (topTres[j] !== undefined) {
            if (topTres[j].puntuacionMaxTop !== -Infinity) {
                topTresPuntFinal.push(topTres[j].puntuacionMaxTop);
                topTresUserFinal.push(topTres[j].userTop);
            }

        }
    }
    graficaTop3(topTresUserFinal, topTresPuntFinal);
}


function graficaTop3(labels, series) {
    var data = {
        labels: labels,
        series: [series]
    };
    var options = {
        high: 21,
        low: 0,
        axisY: {
            onlyInteger: true,
        },
        chartPadding: {
            right: 50
        }
        
    };
    new Chartist.Bar('.ct-chart2', data, options);
}



function generaTabla(numTests, puntuacion) {

    var body = document.querySelector("#historial");
    var tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");
    var tblBody = document.createElement("tbody");
    var tituloTablaTest = document.createElement("th");
    var tituloTablaPunt = document.createElement("th");
    var textoTituloTests = document.createTextNode("Test n??:");
    var textoTituloPunt = document.createTextNode("Puntuaci??n:");
    tituloTablaTest.appendChild(textoTituloTests);
    tituloTablaPunt.appendChild(textoTituloPunt);
    tblBody.appendChild(tituloTablaTest);
    tblBody.appendChild(tituloTablaPunt);

    for (var i = 0; i < numTests.length; i++) {
        var hilera = document.createElement("tr");

        for (var j = 0; j < 1; j++) {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode("Test " + numTests[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        for (var k = 0; k < 1; k++) {
            var celda2 = document.createElement("td");
            var textoCelda2 = document.createTextNode(puntuacion[i]);
            celda2.appendChild(textoCelda2);
            hilera.appendChild(celda2);
        }

        tblBody.appendChild(hilera);
    }

    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
}