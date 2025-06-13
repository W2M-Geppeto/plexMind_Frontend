const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;
let users = null;

function usernameValidation(username) {
    if (!usernameRegex.test(username.value)) {
        return false;
    } else {
        username.style.borderColor = "initial";
        return true;
    }
}

function passwordValidation(password) {
    if (!passwordRegex.test(password.value)) {
        return false;
    } else {
        password.style.borderColor = "initial";
        return true;
    }
}

function buttonUpdate(username, password, button) {
    if (passwordValidation(password) && usernameValidation(username)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

async function validarDatos(username, password) {
    const sendData = { email: username.value, password: password.value };
    const receivedData = await sendGetData('https://plexmind.onrender.com/api/users/login', sendData);
    if (receivedData && receivedData.id && receivedData.email) {
        createNewCookie('user', JSON.stringify(receivedData), {});
        console.log(getCookie('user'));
        return true;
    } else {
        return false;
    }
}

async function enviarDatos(username, password, passwordError, button) {
    let esValido = await validarDatos(username, password);
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
     const username = document.getElementById("usernameInput");
    const password = document.getElementById("passwordInput");
    const button = document.getElementById("loginButton");
    const passwordError = document.getElementById("passwordError");

    button.disabled = true;
    username.addEventListener('input', function() {buttonUpdate(username, password, button);});
    password.addEventListener('input', function() {buttonUpdate(username, password, button);});
    buttonUpdate(username, password, button);

    button.addEventListener('click', function (e) {
        e.preventDefault();
        enviarDatos(username, password, passwordError, button);
    })
}
window.initLogin = initLogin;