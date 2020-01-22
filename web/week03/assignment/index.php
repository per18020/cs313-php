<?php

$serializedItems = file_get_contents("./data/items.json");
$items = json_decode($serializedItems, true);

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Week 03 Assignment - Shopping Cart</title>

  <link rel="stylesheet" href="/lib/bulma.min.css">

  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
</head>

<body>
  <div class="section">
    <div class="container">
      <div class="title">Browse Items</div>

      <div class="columns is-multiline">

        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
            <div class="card-image">
              <figure class="image is-3by2">
                <img src="https://source.unsplash.com/WLUHO9A_xik/300x200" alt="">
              </figure>
              <div class="card-content is-overlay is-clipped">
                <span class="tag is-info">
                  Photo Title That is really long to show the clipping
                </span>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">
                Details
              </a>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
</body>

</html>