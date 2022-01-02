class Jugador {
    constructor(nombre, correo, password) {
        this.nombre = nombre;
        this.correo = correo;
        this.password = password

    }
}
// // NO ME LO COJE DESDE FUERA
// var nombre = document.querySelector("input[name='nombre']").value;
// var password = document.querySelector("input[name='password']").value;
// var correo = document.querySelector("input[name='email']").value;

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
    var valmail
    var mail = password.split("@");
    if (mail.length == 2 && mail[1].split(".").length == 2) { valmail = true }
    else { valmail = false }
    return valmail
}

function passwordMayusc() {
    var password = document.querySelector("input[name='password']").value;
    var valmay = false
    var i = 0
    while (!valmay && i < password.length) {
        if (password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91) { valmay = true }
        else { valmay = false; i++ }

    }
    return valmay;
}

function passwordNums() {
    var password = document.querySelector("input[name='password']").value;
    var valnums = false
    var i = 0
    while (!valnums && i < password.length) {
        if (password.charCodeAt(i) > 47 && password.charCodeAt(i) < 57) { valnums = true }
        else { valnums = false; i++ }

    }
    return valnums;
}

function passwordSims() {
    var password = document.querySelector("input[name='password']").value;
    var valsims = false
    var i = 0
    while (!valsims && i < password.length) {
        if (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48) { valsims = true }
        else { valsims = false; i++ }

    }
    return valsims;
}

function repetirPass() {
    var password = document.querySelector("input[name='password']").value;
    var password2 = document.querySelector("input[name='password2']").value;
    var checkPass = true
    if (password == password2) { } else { checkPass = false };
    return checkPass
}

function validatePass() {
    var valpass = true
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
        var user = new Jugador(nombre, correo, password);
        var user_cadena = JSON.stringify(user);
        localStorage.setItem(user.correo, user_cadena);
        var registro = document.querySelector("div[class='registro']")
        registro.style = "display : none";

    } else {
        if (!nameOk) {
            alert("El nombre solo puede tener mayúsculas y minusculas sin acento y cifras");
        }
        if (!mailOk) {
            alert("El correo tiene que tener el formato correo@algo.com");
        }
        if (!passOk) {
            alert("El password debe incluir al menos un número, una mayúscula y uno de estos símbolos '!, «, #, $, %, &,‘, (, ), *, +, ,, –, ., /'")
        }
    }
    return ok;
}

function login() {
    var correo = document.querySelector("input[name='correo2']").value;
    var password = document.querySelector("input[name='password3']").value;
    var usuarioAlmacenado = localStorage.getItem(`${correo}`); //El usuario está almacenado en storage con el correo como key. Cojemos todo el string con usuario correo y contraseña
    var userJson = JSON.parse(usuarioAlmacenado); // Y lo pasamos a Json
    var correoAlmacenado = userJson.correo; // Aqui sacamos del Json el correo
    var passAlmacenado = userJson.password; // Y aquí el passworrd
    if (correo == correoAlmacenado && password == passAlmacenado)// Y aquí comparamos si los valores de los inputs coinciden con los almacenados. Si sí:
    {
        sessionStorage.setItem("logeado", "si");
        sessionStorage.setItem("usuarioActivo", correo)
        location.reload();
        // const logeado = { logeado: 'Si' }; // Creamos el token de logueo
        // var usuarioActualizado = Object.assign(userJson, logeado); //Añadimos el token de logeo al usuario
        // var actualizadoString = JSON.stringify(usuarioActualizado) // Y lo pasamos a string para poder chutarlo al usuario almacenado
        // localStorage.setItem(correo, actualizadoString) // Cosa que hacemos aquí, usando la variable correo, que también es la key del usuario almacenado, así se sobreescribe la información añadiendo el token y no se crea un usuario nuevo


        // var registro = document.querySelector("div[class='registro']");
        // registro.style = "display : none";
        // var login = document.querySelector("div[class='login']");
        // login.style = "display : none";
        // var logout = document.querySelector(".logout");
        // logout.style = "display : unset"
    }
    else { alert("Nombre o contraseña incorrectos") }
}

function logout() {
    // var registro = document.querySelector("div[class='registro']");
    // registro.style = "display : unset";
    // var login = document.querySelector("div[class='login']");
    // login.style = "display : unset";
    // var logout = document.querySelector(".logout");
    // logout.style = "display : none";
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("usuarioActivo")
    var p = document.getElementsByTagName("p");
    var input0 = document.querySelector(".mala");

    document.body.removeChild(p[2]);
    document.body.removeChild(input0);
    console.log(input0);
    // Cuando deslogueas recuperamos la página inicial. Aquí por ahora lo dejamos así pero cuando conectemos con las preguntas el borrado será más complejo.  
}

var preguntas = [];
function sacarPreguntas() {
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(res => res.json())
        .then(json => {
            preguntas.push(json.results);
            console.log(pregunta);
            return preguntas;
        }).then(() => {
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
            var submit1 = document.createElement("input");
            submit1.type = "button";
            submit1.value = "Siguiente";
            submit1.setAttribute("onclick", "siguientePregunta()");
            formulario.appendChild(submit1);
        })
}

var puntuacion = 0;
var preguntasTotales = 0;
var contadorTests = "Test"
var contadorNumero = 1

function siguientePregunta() {
    var form = document.querySelector("#quiz");
    if (preguntasTotales < 2) {
        if (form.elements["buena"].checked) {
            puntuacion++;
            console.log(puntuacion);
            form.remove();
            sacarPreguntas();
            preguntasTotales++;
        } else {
            form.remove();
            sacarPreguntas();
            preguntasTotales++;
        }
    } else {
        alert("test terminado, tu resultado es " + puntuacion);
        form.style = "display : none";
        
        // if (localStorage.getItem('test') === "0" || "1" || "2" || "3") {
        //     contadorTests = contadorTests + contadorNumero;
        //     var test1 = {[contadorTests]: puntuacion};
        //     var correo1 = sessionStorage.getItem('usuarioActivo');
        //     var usuarioAlmacenado1 = localStorage.getItem(`${correo1}`)
        //     var usuarioJson1= JSON.parse(usuarioAlmacenado1);
        //     var usuarioConTest1 = Object.assign(usuarioJson1, test1);
        //      var conTestString1 = JSON.stringify(usuarioConTest1); 
        //      localStorage.setItem(correo1, conTestString1);
        //     contadorNumero++
             
        // }
        // else {
        var correo1 = sessionStorage.getItem('usuarioActivo');
        var test = {test: puntuacion};
        var usuarioAlmacenado = localStorage.getItem(`${correo1}`)
        var usuarioJson= JSON.parse(usuarioAlmacenado);
        var usuarioConTest = Object.assign(usuarioJson, test);
         var conTestString = JSON.stringify(usuarioConTest);
         localStorage.setItem(correo1, conTestString);
         var numTests = {"numero de tests": 1};
         var usuarioAlmacenado1 = localStorage.getItem(`${correo1}`)
         var usuarioJson1= JSON.parse(usuarioAlmacenado1);
         var usuarioConNumTest = Object.assign(usuarioJson1, numTests);
          var conNumTestString = JSON.stringify(usuarioConNumTest);
          localStorage.setItem(correo1, conNumTestString); 
         

    }
}
