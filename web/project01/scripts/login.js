function login() {
    return postData("/project01/api/authenticate.php", { email: mainForm.email.value, password: mainForm.password.value })
        .then((res) => { return res.json() })
        .then((res) => {
            if (res.authenticated) {
                window.location.href = "/project01/app.php";
            } 
            return false;
        });
}