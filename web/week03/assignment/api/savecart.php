<?php 

session_start();

$_SESSION["cart"] = file_get_contents('php://input');

?>