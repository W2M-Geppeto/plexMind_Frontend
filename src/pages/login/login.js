let username = document.getElementById("usernameInput");
let password = document.getElementById("passwordInput");
let button = document.getElementById("loginButton");
//habra que cambiar despues a un regex mas restrictivo
const usernameRegex = /.+/;
const passwordRegex = /.+/;
let users = null;

function passwordValidation() {
    if (!passwordRegex.test(password.value)) {
        password.style.borderColor = "red";
        console.log("Invalid password!");
        return false;
    } else {
        password.style.borderColor = "initial";
        return true;
    }
}


function usernameValidation() {
    if (!usernameRegex.test(username.value)) {
        username.style.borderColor = "blue";
        console.log("Invalid username!");
        return false;
    } else {
        username.style.borderColor = "initial";
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

async function validarUsuario() {
    const response = await fetch('/src/resources/data/users.json');
    users = await response.json();
    return users.some(user => user.username === username.value && user.password === password.value);}

async function enviardatos() {
    console.log("Usuario:" + username.value);
    console.log("Usuario:" + password.value);
    let esValido = await validarUsuario();
    console.log(esValido);
    if (esValido) {
        console.log("todo way");
        window.location.href = '/src/pages/index/index.html';
    } else {
        console.log("mal");
    }
}

username.addEventListener('input', buttonUpdate);
password.addEventListener('input', buttonUpdate);
buttonUpdate();