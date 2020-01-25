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
    <title>Checkout</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">
    <link rel="stylesheet" href="/week03/assignment/style/checkout.css">
    <link rel="stylesheet" href="/week03/assignment/style/toast.css">

    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

</head>

<body>
    <div class="section">
        <div class="container">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="title">Checkout</div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="button is-info" id="back-to-cart-button">
                            <span class="icon">
                                <i class="fa fa-shopping-bag"></i>
                            </span>
                            <span>Back to Cart</span>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="button is-primary" id="confirm-purchase-button">
                            <span class="icon">
                                <i class="fa fa-credit-card"></i>
                            </span>
                            <span>Confirm Purchase</span>
                        </div>
                    </div>
                </div>
            </nav>


            <div class="section">
                <div class="columns">
                    <div class="column is-half">
                        <h3 class="title">Shipping Address</h3>
                        <form id="address-form">
                            <div class="field">
                                <label class="label">Street Address</label>
                                <div class="control">
                                    <input name="street" type="text" class="input" value="<?= $info->street ?>">
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-body">
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">City</label>
                                            <div class="control">
                                                <input name="city" type="text" class="input" value="<?= $info->city ?>">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">State</label>
                                            <div class="control">
                                                <input name="state" type="text" class="input" value="<?= $info->state ?>">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-body">
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">Postal / Zip Code</label>
                                            <div class="control">
                                                <input name="zip" type="text" class="input" value="<?= $info->zip ?>">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">Country</label>
                                            <div class="control">
                                                <input name="country" type="text" class="input" value="<?= $info->country ?>">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="column is-half">
                        <h3 class="title">Summary</h3>
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th class="has-text-right">Quantity</th>
                                    <th class="has-text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($cart->items as $cartItem) : $item = findItem($items, $cartItem->itemID)?>
                                    <tr>
                                        <td><?php echo $item["title"]; ?></td>
                                        <td class="has-text-right"><?php echo $cartItem->quantity; ?></td>
                                        <td class="has-text-right">$<?php echo number_format($cartItem->totalprice, 2); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <nav id="total-level" class="level">
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

    <div class="notification is-info" id="notify">Test</div>
    <div class="notification is-danger" id="error">Test</div>

    <script src="/week03/assignment/scripts/util.js"></script>
    <script src="/week03/assignment/scripts/checkout.js"></script>

</body>

</html>