let data, cart;
fetch("/week03/assignment/api/getitems.php", { method: 'GET' }).then((response) => {return response.json()}).then((response) => {data = response});
fetch("/week03/assignment/api/getcart.php", { method: 'GET' }).then((response) => {return response.json()}).then((response) => {cart = response});

let checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
    checkoutButton.classList.add("is-loading");
    postData("/week03/assignment/api/savecart.php", cart).then(() => {
        window.location.href = "/week03/assignment/pages/checkout.php";
    });
});

let keepShoppingButton = document.getElementById("keep-shopping-button");
keepShoppingButton.addEventListener("click", () => {
    keepShoppingButton.classList.add("is-loading");
    // Save changes to cart
    postData("/week03/assignment/api/savecart.php", cart).then(() => {
        window.location.href = "/week03/assignment/index.php";
    });
});

let removeItemButtons = document.getElementsByClassName("delete-item-button");
for (let i = 0; i < removeItemButtons.length; i++) {
    let btn = removeItemButtons[i];
    btn.addEventListener("click", function() {
        let itemID = btn.getAttribute("item-id");
        let listItemId = btn.getAttribute("list-item-link");
        // Remove item from cart
        cart = cart.filter((value) => { return value.itemID != itemID });
        // Remove item from list
        let listItem = document.getElementById(listItemId);
        listItem.parentNode.removeChild(listItem);
        // Do the subtotal thing
        setSubtotal();
    });
}

let addButtons = document.getElementsByClassName("add-button");
for (let i = 0; i < addButtons.length; i++) {
    let btn = addButtons[i];
    btn.addEventListener("click", function() {
        let itemID = btn.getAttribute("item-id");
        let quantityID = btn.getAttribute("quantity-link");
        let totalID = btn.getAttribute("total-link");
        // Update cart
        let cartItem = cart.find(e => e.itemID == itemID);
        cartItem.quantity++;
        // Update quantity input
        let quantity = document.getElementById(quantityID);
        quantity.value = cartItem.quantity;
        // Update total price
        let item = data.find(e => e.itemID == itemID);
        let total = document.getElementById(totalID);
        total.innerHTML = "$" + (item.price * cartItem.quantity).toFixed(2);
        // Do the subtotal thing
        setSubtotal();
    });
}

let subtractButtons = document.getElementsByClassName("subtract-button");
for (let i = 0; i < subtractButtons.length; i++) {
    let btn = subtractButtons[i];
    btn.addEventListener("click", function() {
        let itemID = btn.getAttribute("item-id");
        let quantityID = btn.getAttribute("quantity-link");
        let totalID = btn.getAttribute("total-link");
        // Update cart
        let cartItem = cart.find(e => e.itemID == itemID);
        cartItem.quantity -= cartItem.quantity <= 1 ? 0 : 1;
        // Update quantity input
        let quantity = document.getElementById(quantityID);
        quantity.value = cartItem.quantity;
        // Update total price
        let item = data.find(e => e.itemID == itemID);
        let total = document.getElementById(totalID);
        total.innerHTML = "$" + (item.price * cartItem.quantity).toFixed(2);
        // Do the subtotal thing
        setSubtotal();
    });
}

let quantityInputs = document.getElementsByClassName("quantity-input");
for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("input", function() {
        let itemID = input.getAttribute("item-id");
        let totalID = input.getAttribute("total-link");
        // Update cart
        let cartItem = cart.find(e => e.itemID == itemID);
        cartItem.quantity = input.value ? input.value : 1;
        // Update total price
        let item = data.find(e => e.itemID == itemID);
        let total = document.getElementById(totalID);
        total.innerHTML = "$" + (item.price * cartItem.quantity).toFixed(2);
        // Do the subtotal thing
        setSubtotal();
    })
}

function setSubtotal() {
    let subtotalElement = document.getElementById("subtotal");
    let subtotal = 0;
    // Iterate through each item and calculate their combined price
    for (let i = 0; i < cart.length; i++) {
        let item = data.find(e => e.itemID == cart[i].itemID);
        subtotal += cart[i].quantity * item.price;
    }
    subtotalElement.innerHTML = "$" + subtotal.toFixed(2);
}