let thirdDivToggled = true;

function onClickMe() {
    alert("Clicked!");
}

function onToggleThirdDiv() {
    thirdDivToggled = !thirdDivToggled;
    if (thirdDivToggled) {
        $("#box3").fadeIn("fast");
    } else {
        $("#box3").fadeOut("fast");
    }
}

function onChangeFirstDivColor() {
    let value = $("#color-input").val();
    if (value) {
        $("#box1").css("background-color", value);
    } else {
        $("#box1").css("background-color", "blue");
    }
}