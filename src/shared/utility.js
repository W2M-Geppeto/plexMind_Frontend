function fillMainUser() {
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  document.getElementById("user").textContent =
    userInfo && userInfo.email ? userInfo.email.split("@")[0] : "Usuario";
}
function setPreviousPage(selector) {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("click", function () {
      sessionStorage.setItem("previousPage", window.location.pathname);
    });
  });
}
function goBack() {
  const previous = sessionStorage.getItem("previousPage");
  if (previous && previous !== window.location.pathname) {
    window.location.href = previous;
  } else {
    window.location.href = "/src/pages/index/index.html";
  }
}
//Añadir la llamada a la funcion: setPreviousPage('.goForum'); y la classe a todos los elementos que lleven al foro
function setPreviousPage(selector) {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("click", function () {
      sessionStorage.setItem("previousPage", window.location.pathname);
    });
  });
}
function backHome() {
  document
    .querySelector(".logo-navbar")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "/src/pages/index/index.html";
    });
}
function goProfile() {
  document.getElementById("personIcon").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "/src/pages/profile/profile.html";
  });
}
goProfile();
backHome();
async function getData(url = '') {
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
async function sendData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer', //para no saber quien envia la peticion, prescindible
    body: JSON.stringify(data)
  });
}
function setCookie(name, value, jsonAttributes = {}) {
  jsonAttributes = {
    path: "/",
    ...jsonAttributes,
  };
  if (jsonAttributes.expires instanceof Date) {
    jsonAttributes.expires = jsonAttributes.expires.toUTCString();
  }
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let attributeKey in jsonAttributes) {
    updatedCookie += "; " + attributeKey;
    let attributeValue = jsonAttributes[attributeKey];
    if (attributeValue !== true) {
      updatedCookie += "=" + attributeValue;
    }
  }
  document.cookie = updatedCookie;
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
function setCookie(name, newDataObj, jsonAttributes = {}) {
  let oldCookieData = {};
  let currentCookieData = getCookie(name);
  if (!currentCookieData) setCookie(name, JSON.stringify(newDataObj), attributes = {})
  else{
    oldCookieData = JSON.parse(currentCookieData);
    const updatedObj = { ...oldCookieData, ...newDataObj };
    setCookie(name, JSON.stringify(updatedObj), jsonAttributes);
  }}
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
async function sendData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();
}