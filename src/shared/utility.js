function fillMainUser() {
  const cookieValue = getCookie("user");
  try {
    const userInfo = JSON.parse(cookieValue);
    document.getElementById("user").textContent =
      userInfo && userInfo.email ? userInfo.email.split("@")[0] : "User";
  } catch (error) {
    console.error("Error al parsear la cookie 'user':", error);
    document.getElementById("user").textContent = "Invitado";
  }
}
function goBack() {
  const previous = getCookie("previousPage");
  console.log(previous);
  if (previous && previous !== window.location.pathname) {
    window.location.href = previous;
  } else {
    window.location.href = "/src/pages/index/index.html";
  }
}
function setPreviousPage(selector) {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault(); // Evita la navegación automática
      createNewCookie("previousPage", window.location.pathname, {});
      window.location.href = element.href; // Navega manualmente después de guardar la cookie
    });
  });
}
function backHome() {
  document
    .querySelector(".logo-navbar")
    .addEventListener("click", function (e) {
      e.preventDefault();
      createNewCookie("previousPage", "/src/pages/index/index.html", {});
      window.location.href = "/src/pages/index/index.html";
    });
}
function goProfile() {
  document.querySelectorAll(".goProfile").forEach(icon => {
    icon.addEventListener("click", function (e) {
      if (e.target.tagName === "I" && e.target.classList.contains("personIcon")) {
        e.preventDefault();
        window.location.href = "/src/pages/profile/profile.html";
      }
    });
  });

}
function login() {
  fetch('/src/pages/login/login.html')
    .then(response => response.text())
    .then(html => {
      const bodyContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      document.getElementById('loginModal').style.display = "block";
      document.getElementById('loginModalContent').innerHTML = bodyContent ? bodyContent[1] : html;
      const script = document.createElement('script');
      script.src = '/src/pages/login/login.js';
      script.onload = function () {
        initLogin();
      };
      document.body.appendChild(script);
    });
}

function checkLogin() {
  console.log('llamando al login');
  let personIconStyle = 'personIconDisabled';
  let loginStyle = 'loginIcon';
  let loginType = 'login';
  if (getCookie('user') !== undefined) {
    personIconStyle = 'personIcon';
    loginStyle = 'logoutIcon';
    loginType = 'logout';
  }
  const personIconContent = `<i class="material-symbols-outlined nv-personIcon ${personIconStyle}">person</i>`;
  const loginIconContent = `<i class="material-symbols-outlined nv-personIcon mx-0 ${loginStyle}">${loginType}</i>`;
  document.getElementById('personIconcontainer').innerHTML = personIconContent;
  document.getElementById('loginIconcontainer').innerHTML = loginIconContent;
  document.querySelector(".loginIcon").addEventListener('click', function (e) {
    login();
  } )

}


async function getData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(
        `Network response was not ok \nStatus: ${response.status} - ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
async function sendData(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer', //opcional, para ocultar quien envía la peticion
    body: JSON.stringify(data)
  });
}
async function sendGetData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer', //opcional, para ocultar quien envía la peticion
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(
        `Network response was not ok \nStatus: ${response.status} - ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
function createNewCookie(name, value, cookieAttributes = {}) {
  cookieAttributes = {
    path: "/",
    ...cookieAttributes,
  };
  if (cookieAttributes.expires instanceof Date) {
    cookieAttributes.expires = cookieAttributes.expires.toUTCString();
  }
  let newCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value); for (let attributeKey in cookieAttributes) {
      newCookie += "; " + attributeKey;
      let attributeValue = cookieAttributes[attributeKey];
      if (attributeValue !== true) {
        newCookie += "=" + attributeValue;
      }
    }
  document.cookie = newCookie;
}
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function updateCookie(name, newDataObj, jsonAttributes = {}) {
  let oldCookieData = {};
  let currentCookieData = getCookie(name);
  if (!currentCookieData) createNewCookie(name, JSON.stringify(newDataObj), attributes = {})
  else {
    oldCookieData = JSON.parse(currentCookieData);
    const updatedObj = { ...oldCookieData, ...newDataObj };
    createNewCookie(name, JSON.stringify(newDataObj), jsonAttributes);
  }
}
function deleteCookie(name) {
  updateCookie(name, "", {
    'max-age': -1
  })
}
function goToLogin() {
  console.log("Go to log");
}

fillMainUser();
goProfile();
backHome();