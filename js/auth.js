function changeLoginPasswordVisibility(btn) {
  if (document.getElementById("login-password").type == "text") {
    btn.firstElementChild.style.display = "none";
    btn.lastElementChild.style.display = "inline";
    document.getElementById("login-password").type = "password";
  } else {
    btn.firstElementChild.style.display = "inline";
    btn.lastElementChild.style.display = "none";
    document.getElementById("login-password").type = "text";
  }
}
function changeSignPasswordVisibility(btn) {
  if (document.getElementById("sign-password").type == "text") {
    btn.firstElementChild.style.display = "none";
    btn.lastElementChild.style.display = "inline";
    document.getElementById("sign-password").type = "password";
  } else {
    btn.firstElementChild.style.display = "inline";
    btn.lastElementChild.style.display = "none";
    document.getElementById("sign-password").type = "text";
  }
}
function changeForms() {
  document.getElementById("forms").classList.toggle("translate-x-full");
}
