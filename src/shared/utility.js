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
async function getData(direccion) {
  try {
    const response = await fetch(direccion);
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
function addDataCookie(name, newDataObj, jsonAttributes = {}) {
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