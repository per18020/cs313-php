<?php

session_start();

$serializedCart = $_SESSION["cart"];
$cart = json_decode($serializedCart);
$info = $cart->info;

$serializedItems = file_get_contents("../data/items.json");
$items = json_decode($serializedItems, true);

function findItem($arr, $itemID)
{
    foreach ($arr as $element) {
        if ($itemID == $element["itemID"]) {
            return $element;
        }
    }
}

// You shouldn't be here if you have no items!
if (count($cart->items) == 0) {
    header("Location:../index.php");
} 

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmation</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">
    <link rel="stylesheet" href="/week03/assignment/style/confirmation.css">

    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

</head>

<body>
    <div class="section">
        <div class="container">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="title">Confirmation</div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="button is-info" id="keep-shopping-button">
                            <span class="icon">
                                <i class="fa fa-store"></i>
                            </span>
                            <span>Continue Shopping</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="columns">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <div class="section">
                        <h3 class="title">Your order will be sent to:</h3>
                        <div class="content padding-fix">
                            <p class="is-uppercase"><?= $info->street ?></p>
                            <p class="is-uppercase"><?php echo "$info->city, $info->state, $info->zip" ?></p>
                            <p class="is-uppercase"><?= $info->country ?></p>
                        </div>
                        <h3 class="title">Order Details</h3>
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th class="has-text-right">Quantity</th>
                                    <th class="has-text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($cart->items as $cartItem) : $item = findItem($items, $cartItem->itemID) ?>
                                    <tr>
                                        <td><?php echo $item["title"]; ?></td>
                                        <td class="has-text-right"><?php echo $cartItem->quantity; ?></td>
                                        <td class="has-text-right">$<?php echo number_format($cartItem->totalprice, 2); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <nav class="level padding-fix">
                            <div class="level-left">
                                <div class="level-item">
                                    <div class="title is-4">Total</div>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <div id="total" class="title is-4 has-text-right">
                                        <?php
                                        $total = 0;
                                        foreach ($cart->items as $cartItem) {
                                            $item = findItem($items, $cartItem->itemID);
                                            $total += $item["price"] * $cartItem->quantity;
                                        }
                                        echo "$" . number_format($total, 2);
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/week03/assignment/scripts/confirmation.js"></script>

</body>

</html>