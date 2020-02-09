let errorTimeout = null;
function error(msg) {
  var x = document.getElementById("error");
  x.innerHTML = msg;
  x.classList.add("show");
  if (errorTimeout) clearTimeout(errorTimeout);
  errorTimeout = setTimeout(function () { x.classList.remove("show") }, 2900);
}

function login() {
    postData("/project01/api/authenticate.php", { email: mainForm.email.value, password: mainForm.password.value })
        .then((res) => { return res.json() })
        .then((res) => {
            if (res.error) error("Couldn't connect to the database");
            if (res.authenticated) {
                window.location.href = "/project01/app.php";
            } else {
                error("The username and password do not match");
            }
        });
    return false;
}
