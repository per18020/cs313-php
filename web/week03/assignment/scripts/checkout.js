let cart;
fetch("/week03/assignment/api/getcart.php", { method: 'GET' }).then((response) => {return response.json()}).then((response) => {cart = response});

let form = document.getElementById("address-form");

let backToCartButton = document.getElementById("back-to-cart-button");
backToCartButton.addEventListener("click", () => {
    updateCartInfo();
    backToCartButton.classList.add("is-loading");
    postData("/week03/assignment/api/savecart.php", cart).then(() => {
        window.location.href = "/week03/assignment/pages/cart.php";
    });
});

let confirmPurchaseButton = document.getElementById("confirm-purchase-button");
confirmPurchaseButton.addEventListener("click", () => {
    if (form.street.value == "" && form.city.value == "" && form.state.value == "" && form.zip.value == "" && form.country.value == "") {
        error("All fields are requried");
        return;
    }
    updateCartInfo();
    confirmPurchaseButton.classList.add("is-loading");
    postData("/week03/assignment/api/savecart.php", cart).then(() => {
        window.location.href = "/week03/assignment/pages/confirmation.php";
    });
});

function updateCartInfo() {
    let info = cart.info;
    info.street = form.street.value;
    info.city = form.city.value;
    info.state = form.state.value;
    info.zip = form.zip.value;
    info.country = form.country.value;
}