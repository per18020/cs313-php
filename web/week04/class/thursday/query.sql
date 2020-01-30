\echo '*********************List all restaurant names*********************'
-- SELECT name FROM w4_restaurant;

\echo '****************List restaurant names and addresses****************'
-- SELECT name, address FROM w4_restaurant;

\echo '************************List  all customers************************'
-- SELECT * FROM w4_customer;

\echo '**List all menu item names and prices of a particular restaurant**'
-- SELECT restaurant.name, menu.name as item, menu.price 
--     FROM w4_menu_item menu, w4_restaurant restaurant
--     WHERE menu.restaurant_id = restaurant.id 
--         AND restaurant.name = 'Costa Vida'
--     ORDER BY menu.price;

\echo '*View all orders of a particular customer - show the customer name*'
-- SELECT customer.first_name, customer.last_name, menu.name
--     FROM w4_customer customer, w4_menu_item menuItem, w4_order order, w4_order_menu_items orderMenuItem
--     WHERE   order.customer_id = customer.id
--         AND orderMenuItem.order_id = order.id
--         AND orderMenuItem.menu_item_id = menuItem.id
--         AND customer.id = 1;

SELECT c.first_name, c.last_name, mi.name as "menu item"
    FROM w4_customer c
    INNER JOIN w4_order o ON c.id = o.customer_id
    INNER JOIN w4_order_menu_items om ON o.id = om.order_id
    INNER JOIN w4_menu_item mi ON mi.id = om.menu_item_id
    WHERE c.id = 1;
        
\echo '************List  all orders of a particular restaurant************'
SELECT r.name, om.order_id, mi.name, mi.price
    FROM w4_restaurant r
    INNER JOIN w4_menu_item mi ON r.id = mi.restaurant_id
    INNER JOIN w4_order_menu_items om ON mi.id = om.menu_item_id
    WHERE r.id = 1
    ORDER BY mi.price;


