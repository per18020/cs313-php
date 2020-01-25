// Clear the cart after transaction has completed!
fetch("/week03/assignment/api/clearcart.php", {method: "GET"});

let keepShoppingButton = document.getElementById("keep-shopping-button");
keepShoppingButton.addEventListener("click", () => {
    window.location.href = "/week03/assignment/index.php";
});