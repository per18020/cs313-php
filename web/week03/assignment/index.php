<?php

session_start();

// Get item data
$serializedItems = file_get_contents("./data/items.json");
$items = json_decode($serializedItems, true);

// Mutable foreach generates item id and id to connect item cards and modals
foreach ($items as $key => $item) {
  $items[$key]["modalLink"] = "modal-" . $key;
  $items[$key]["itemID"] = $key;
}

// $_SESSION["cart"] = null;
$_SESSION["cart"] = isset($_SESSION["cart"]) ? $_SESSION["cart"] :
  json_encode(
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

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Week 03 Assignment - Shopping Cart</title>

  <link rel="stylesheet" href="/lib/bulma.min.css">
  <link rel="stylesheet" href="/week03/assignment/style/index.css">
  <link rel="stylesheet" href="/week03/assignment/style/toast.css">

  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
</head>

<body>
  <div class="section">
    <div class="container">

      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">Browse Items</div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="button is-primary" id="view-cart-button">
              <span class="icon">
                <i class="fa fa-shopping-cart"></i>
              </span>
              <span>View Cart</span>
            </div>
          </div>
        </div>
      </nav>

      <?php
      foreach ($items as $item) {
        //TODO: remove echo strings and embed php into html
        echo '
          <div class="modal" id="' . $item["modalLink"] . '">
          <div class="modal-background"></div>
          <div class="modal-content">
            <button class="modal-close is-large" aria-label="close"></button>
            <div class="box">
              <figure class="image is-4x3">
                <img src="' . $item["imageURL"] . '">
              </figure>
              <div class="container">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <p class="title">' . $item["title"] . '</p>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <div class="button is-primary modal-add-to-cart" item-id="' . $item["itemID"] . '">
                        <span class="icon">
                          <i class="fa fa-cart-plus"></i>
                        </span>
                        <span>Add to Cart</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content">
                <h4>$' . number_format($item["price"], 2) . '</h4>
                <p>' . $item["description"] . '</p>
              </div>
            </div>
          </div>
        </div>';
      }
      ?>

      <div class="columns is-multiline">
        <?php
        foreach ($items as $item) {
          echo '
            <div class="column is-one-quarter-desktop is-half-tablet">
            <a class="item-card" modal-link="' . $item["modalLink"] . '">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="' . $item["imageURL"] . '" alt="Product Image">
                  </figure>
                </div>
                <div class="card-content">
                  <p class="title">
                    ' . $item["title"] . '
                  </p>
                  <p class="subtitle">
                    $' . number_format($item["price"], 2) . '
                  </p>
                </div>
              </div>
            </a>
          </div>';
        }
        ?>
      </div>
    </div>
  </div>
  <div class="notification is-info" id="notify">Test</div>
  <div class="notification is-danger" id="error">Test</div>

  <script src="/week03/assignment/scripts/util.js"></script>
  <script src="/week03/assignment/scripts/index.js"></script>
</body>

</html>