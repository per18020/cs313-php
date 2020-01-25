<?php 

session_start();

$_SESSION["cart"] = json_encode(
    (object) [
      "info" => (object) [
        "street" => "",
        "city" => "",
        "state" => "",
        "zip" => "",
        "country" => ""
      ],
      "items" => []
    ]
  );

?>