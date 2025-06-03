let username = document.getElementById("usernameInput");
let password = document.getElementById("passwordInput");
let button = document.getElementById("loginButton");
//habra que cambiar despues a un regex mas restrictivo
const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/;
let users = null;

function usernameValidation() {
    if (!usernameRegex.test(username.value)) {
        username.style.borderColor = "red";
        console.log("Invalid username!");
        return false;
    } else {
        username.style.borderColor = "initial";
        return true;
    }
}

function passwordValidation() {
    if (!passwordRegex.test(password.value)) {
        password.style.borderColor = "red";
        console.log("Invalid password!");
        return false;
    } else {
        console.log("badbadbad");
        password.style.borderColor = "initial";
        return true;
    }
}

function buttonUpdate() {
    let enable = false;
    if (username.value && password.value) {
        button.classList.remove("btn-m-disabled"); //crear clase disable
        button.classList.add("btn-m");
        enable = true;
        if (enable) {
            console.log("Boton ENABLE");
            button.addEventListener('click', function (e) {
                e.preventDefault();
                let flag = true;
                if (flag) {
                    if (!passwordValidation()) { flag = false }
                    if (!usernameValidation()) { flag = false }
                    enviardatos();
                    /* alert("Data sent corretly"); */
                }
            })
        }
    } else {
        console.log("boton DISABLE");
        button.classList.remove("btn-m");
        button.classList.add("btn-m-disabled");
    }
}

async function validarDatos() {
    try {
        const response = await fetch('/src/resources/data/mocks/users1.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok \nStatus: ${response.status} - ${response.statusText}`);
        }
        users = await response.json();
        return users.some(user => user.email === username.value && user.password === password.value);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
async function validarDatos() {
    try {
        const response = await fetch('API'); //A rellenar
        if (!response.ok) {
            throw new Error(`Network response was not ok \nStatus: ${response.status} - ${response.statusText}`);
        }
        users = await response.json();
        const usersString = JSON.stringify(users);
        sessionStorage.setItem('usuario', usersString);
        return true;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function enviardatos() {
    let esValido = await validarDatos();
    console.log(esValido);
    if (esValido) {
        console.log("");
        window.location.href = '/src/pages/index/index.html';
    }
}

username.addEventListener('input', buttonUpdate);
password.addEventListener('input', buttonUpdate);
buttonUpdate();