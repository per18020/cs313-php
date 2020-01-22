<?php

    $name = empty($_POST['name']) ? 'No Name' : filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = empty($_POST['email']) ? 'No Email' : filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $comment = empty($_POST['comment']) ? 'No Comment' : filter_var($_POST["comment"], FILTER_SANITIZE_STRING);
    $major = empty($_POST['major']) ? 'No Major' : filter_var($_POST["major"], FILTER_SANITIZE_STRING);
    $continents = $_POST['continents'] ?? ['No Continents Visited'];

    $majorlookup = [
        "CS" => "Computer Science",
        "WDD" => "Web Design and Development",
        "CIT" => "Computer Information Technology",
        "CE" => "Computer Engineering"
    ];

    $major = $majorlookup[$major] ?? "No Major";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Week 03 PHP Form Handler</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">

</head>
<body>
    <div class="section">
        <div class="container">
            <div class="title">Week 03 PHP Form Handler</div>
            <div class="content">
                <h2>Name</h2>
                <p> <?php echo $name ?> </p>
                <h2>Email</h2>
                <p> <?php echo $email ?> </p>
                <h2>Comment</h2>
                <p> <?php echo $comment ?> </p>
                <h2>Major</h2>
                <p> <?php echo $major ?> </p>
                <h2>Continents Visited</h2>
                <p> 
                    <?php 
                        foreach ($continents as $continent) {
                            echo $continent;
                            echo "<br>";
                        }
                ?> </p>
            </div>
        </div>
    </div>
</body>
</html>