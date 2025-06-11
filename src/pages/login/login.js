let username = document.getElementById("usernameInput");
let password = document.getElementById("passwordInput");
let button = document.getElementById("loginButton");
//habra que cambiar despues a un regex mas restrictivo
const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;
let users = null;

window.usernameValidation = function () {
    if (!usernameRegex.test(username.value)) {
        return false;
    } else {
        username.style.borderColor = "initial";
        return true;
    }
}

window.passwordValidation = function () {
    if (!passwordRegex.test(password.value)) {
        return false;
    } else {
        password.style.borderColor = "initial";
        return true;
    }
}

/* Cambia boton LOGIN entre disable y enable dependiendo de regex sobre los campos username y password. */
window.buttonUpdate = function () {
    if (passwordValidation() && usernameValidation()) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

async function validarDatos() {
    const sendData = { email: username.value, password: password.value };
    const receivedData = await sendGetData('https://micro-user-m5dv.onrender.com/api/users/login', sendData);
    if (receivedData && receivedData.id && receivedData.email) {
        createNewCookie('user', JSON.stringify(receivedData), {});
        console.log(getCookie('user'));
        return true;
    } else {
        return false;
    }
}

async function enviarDatos() {
    let esValido = await validarDatos();
    console.log("Login: " + esValido);
    if (esValido) {
        password.value = "";
        passwordError.style.display = "none";
        window.location.reload();
    } else {
        password.value = "";
        username.style.borderColor = "red";
        password.style.borderColor = "red";
        passwordError.style.display = "block";
        button.disabled = true;
    }

}

function initLogin() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) loginButton.disabled = true;
    username.addEventListener('input', window.buttonUpdate);
    password.addEventListener('input', window.buttonUpdate);
    window.buttonUpdate();

    button.addEventListener('click', function (e) {
        e.preventDefault();
        enviarDatos();
    })
}
