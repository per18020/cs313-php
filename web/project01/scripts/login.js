function login() {
    postData("/project01/api/authenticate.php", { email: mainForm.email.value, password: mainForm.email.password })
        .then((res) => { return res.json() })
        .then((res) => {
            console.log(res);
        });

    return false;
}