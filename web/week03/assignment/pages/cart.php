<?php

session_start();

$serializedCart = $_SESSION["cart"];
$cart = json_decode($serializedCart);

$serializedItems = file_get_contents("../data/items.json");
$items = json_decode($serializedItems, true);

// Mutable foreach generates item id's
foreach ($items as $key => $item) {
    $items[$key]["listItemLink"] = "list-item-" . $key;
    $items[$key]["quantityLink"] = "quantity-" . $key;
    $items[$key]["totalLink"] = "total-" . $key;
    $items[$key]["itemID"] = $key;
}

function findItem($arr, $itemID)
{
    foreach ($arr as $element) {
        if ($itemID == $element["itemID"]) {
            return $element;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cart</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">
    <link rel="stylesheet" href="/week03/assignment/style/cart.css">

    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

</head>

<body>
    <div class="section">
        <div class="container">

            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="title">Cart</div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="button is-info" id="keep-shopping-button">
                            <span class="icon">
                                <i class="fa fa-shopping-bag"></i>
                            </span>
                            <span>Keep Shopping</span>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="button is-primary" id="checkout-button">
                            <span class="icon">
                                <i class="fa fa-shopping-bag"></i>
                            </span>
                            <span>Checkout</span>
                        </div>
                    </div>
                </div>
            </nav>

            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($cart as $cartItem) {

                        $item = findItem($items, $cartItem->itemID);

                        echo '
                            <tr id="' . $item["listItemLink"] . '">
                            <td class="remove-cell">
                                <div class="button is-danger is-outlined delete-item-button" item-id="' . $cartItem->itemID . '" list-item-link="' . $item["listItemLink"] . '">
                                    <span class="icon">
                                        <i class="fa fa-trash"></i>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <h4 class="title is-4">' . $item["title"] . '</h4>
                            </td>
                            <td class="small-cell">
                                <div class="field has-addons">
                                    <div class="control">
                                        <div class="button subtract-button" item-id="' . $cartItem->itemID . '" quantity-link="' . $item["quantityLink"] . '" total-link="' . $item["totalLink"] . '">
                                            <span class="icon">
                                                <i class="fa fa-minus"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <p class="control">
                                        <input id="' . $item["quantityLink"] . '" class="input quantity-input" type="text" value="' . $cartItem->quantity . '" item-id="' . $cartItem->itemID . '" total-link="' . $item["totalLink"] . '">
                                    </p>
                                    <div class="control">
                                        <div class="button add-button" item-id="' . $cartItem->itemID . '" quantity-link="' . $item["quantityLink"] . '" total-link="' . $item["totalLink"] . '">
                                            <span class="icon">
                                                <i class="fa fa-plus"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="small-cell">
                                <h4 class="title is-4 right-align">$' . number_format($item["price"], 2) . '</h4>
                            </td>
                            <td class="small-cell">
                                <h4 id="' . $item["totalLink"] . '" class="title is-4 right-align">$' . number_format($item["price"] * $cartItem->quantity, 2) . '</h4>
                            </td>
                        </tr>';
                    }
                    ?>
                </tbody>
            </table>

            <nav id="subtotal-level" class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="title is-4">Subtotal</div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div id="subtotal" class="title is-4">
                            <?php 
                                $subtotal = 0;
                                foreach ($cart as $cartItem) {
                                    $item = findItem($items, $cartItem->itemID);
                                    $subtotal += $item["price"] * $cartItem->quantity;
                                }
                                echo "$" . number_format($subtotal, 2);
                            ?>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    </div>

    <script src="/week03/assignment/scripts/util.js"></script>
    <script src="/week03/assignment/scripts/cart.js"></script>
</body>

</html>