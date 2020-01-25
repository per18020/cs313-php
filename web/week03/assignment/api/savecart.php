<?php 

session_start();

$cart = json_decode(file_get_contents('php://input'));
$cart->info->street = htmlspecialchars($cart->info->street);
$cart->info->city = htmlspecialchars($cart->info->city);
$cart->info->state = htmlspecialchars($cart->info->state);
$cart->info->zip = htmlspecialchars($cart->info->zip);
$cart->info->country = htmlspecialchars($cart->info->country);

$_SESSION["cart"] = json_encode($cart);

?>