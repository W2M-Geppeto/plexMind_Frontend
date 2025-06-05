let username = document.getElementById("usernameInput");
let password = document.getElementById("passwordInput");
let button = document.getElementById("loginButton");
//habra que cambiar despues a un regex mas restrictivo
const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;
let users = null;

function usernameValidation() {
    if (!usernameRegex.test(username.value)) {
        return false;
    } else {
        username.style.borderColor = "initial";
        return true;
    }
}

function passwordValidation() {
    if (!passwordRegex.test(password.value)) {
        return false;
    } else {
        password.style.borderColor = "initial";
        return true;
    }
}

/* Cambia boton LOGIN entre disable y enable dependiendo de regex sobre los campos username y password. */
function buttonUpdate() {
    if (passwordValidation() && usernameValidation()) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

/* async function validarDatos() {
    try {
        const response = await fetch('/src/resources/data/mocks/users.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok \nStatus: ${response.status} - ${response.statusText}`);
        }
        users = await response.json();
        return users.some(user => user.email === username.value && user.password === password.value);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
} */

async function validarDatos() {
    const sendData = { email: username.value, password: password.value };
    const receiveData = await sendGetData('https://micro-user-m5dv.onrender.com/api/users/login', sendData);
    console.log(receiveData);
    if (receiveData && receiveData.id && receiveData.email) {
        createNewCookie('user', receiveData, {});
        console.log('cookie creada');
        return true;
    }else{
        console.log('cookie ERROR');
        return false;
    }
}

async function enviarDatos() {
    let esValido = await validarDatos();
    console.log("Login: " + esValido);
    if (esValido) {
        password.value = "";
        passwordError.style.display = "none";
        window.location.href = '/src/pages/index/index.html';
    } else {
        password.value = "";
        username.style.borderColor = "red";
        password.style.borderColor = "red";
        passwordError.style.display = "block";
        button.disabled = true;
    }
}

username.addEventListener('input', buttonUpdate);
password.addEventListener('input', buttonUpdate);
buttonUpdate();

button.addEventListener('click', function (e) {
    e.preventDefault();
    enviarDatos();
})