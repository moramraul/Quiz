class Jugador {
    constructor(nombre, correo, password) {
        this.nombre = nombre;
        this.correo = correo;
        this.password = password

    }
}
// NO ME LO COJE DESDE FUERA
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
        const logeado = { logeado: 'Si' }; // Creamos el token de logueo
        var usuarioActualizado = Object.assign(userJson, logeado); //Añadimos el token de logeo al usuario
        var actualizadoString = JSON.stringify(usuarioActualizado) // Y lo pasamos a string para poder chutarlo al usuario almacenado
        localStorage.setItem(correo, actualizadoString) // Cosa que hacemos aquí, usando la variable correo, que también es la key del usuario almacenado, así se sobreescribe la información añadiendo el token y no se crea un usuario nuevo
        var registro = document.querySelector("div[class='registro']");
        registro.style = "display : none";
        var login = document.querySelector("div[class='login']");
        login.style = "display : none";
        var boton = document.createElement("input");
        boton.setAttribute("type", "button")
        boton.setAttribute("value", "logout");
        boton.setAttribute("onclick", "logout()"); // Cuando logeas salta el juego y un botón para desloguear
        document.body.appendChild(boton);
        var parrafo = document.createElement("p");
        var texto = document.createTextNode("Primera pregunta"); // Más adelante aquí se imprimira la primera pregunta almacenada con sus respuestas. Para la prueba basta esto
        parrafo.append(texto);
        document.body.appendChild(parrafo);

    }
    else { alert("Nombre o contraseña incorrectos") }
}

function logout() { 
    var registro = document.querySelector("div[class='registro']");
    registro.style = "display : unset";
    var login = document.querySelector("div[class='login']");
    login.style = "display : unset"; 
    var parrafo = document.getElementsByTagName("p");
    console.log(parrafo);
    document.body.removeChild(parrafo[2]);  // Cuando deslogueas recuperamos la página inicial. Aquí por ahora lo dejamos así pero cuando conectemos con las preguntas el borrado será más complejo.
   
}