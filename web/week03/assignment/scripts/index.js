let data, cart;
fetch("/week03/assignment/api/getitems.php", { method: 'GET' }).then((response) => {return response.json()}).then((response) => {data = response});
fetch("/week03/assignment/api/getcart.php", { method: 'GET' }).then((response) => {return response.json()}).then((response) => {cart = response});

let modalBackgrounds = document.getElementsByClassName("modal-background");
for (let i = 0; i < modalBackgrounds.length; i++) {
    modalBackgrounds[i].addEventListener('click', function() {
        closeAllModals();
    }, false);
}

let modalCloseButtons = document.getElementsByClassName("modal-close");
for (let i = 0; i < modalCloseButtons.length; i++) {
    modalCloseButtons[i].addEventListener('click', function() {
        closeAllModals();
    }, false);
}

let itemCards = document.getElementsByClassName("item-card");
for (let i = 0; i < itemCards.length; i++) {
    itemCards[i].addEventListener('click', function() {
        let modalLink = itemCards[i].getAttribute("modal-link");
        document.getElementById(modalLink).classList.add("is-active");
    }, false);
}

let modalAddToCartButtons = document.getElementsByClassName("modal-add-to-cart");
for (let i = 0; i < modalAddToCartButtons.length; i++) {
    modalAddToCartButtons[i].addEventListener('click', function() {
        // Trigger notification
        let itemID = modalAddToCartButtons[i].getAttribute("item-id");
        let item = data.find(e => e.itemID == itemID);
        let inCart = alreadyInCart(itemID);
        if (!inCart) {
            cart.items.push({
                itemID: itemID,
                quantity: 1,
                unitprice: item.price,
                totalprice: item.price
            });
        }
        closeAllModals();
        notify(`Added "${item.title}" to your cart!`);
    }, false);
}

let viewCartButton = document.getElementById("view-cart-button");
viewCartButton.addEventListener("click", function() {
    if (cart.items.length <= 0) {
        error("You have no items in your cart");
        return;
    }
    viewCartButton.classList.add("is-loading");
    postData("/week03/assignment/api/savecart.php", cart).then(() => {
        window.location.href = "/week03/assignment/pages/cart.php";
    }); 
});

function alreadyInCart(itemID) {
    return cart.items.find(e => e.itemID == itemID);
}

function closeAllModals() {
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        modals[i].classList.remove("is-active");
    }
}

