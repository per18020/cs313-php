<?php

$continents = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Australia",
    "Africa",
    "Antarctica"
];


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Week 03</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
</head>

<body>
    <div class="section">
        <div class="container">

            <div class="title">Week 03 Team Assignment</div>

            <form action="postForm.php" method="post">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control has-icons-left">
                        <input name="name" class="input" type="text">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                        <input name="email" class="input" type="email">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Major</label>
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="major" value="CS">
                            Computer Science
                        </label>
                        <label class="radio">
                            <input type="radio" name="major" value="WDD">
                            Web Design and Development
                        </label>
                        <label class="radio">
                            <input type="radio" name="major" value="CIT">
                            Computer Information Technology
                        </label>
                        <label class="radio">
                            <input type="radio" name="major" value="CE">
                            Computer Engineering
                        </label>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Comments</label>
                    <div class="control">
                        <textarea name="comment" class="textarea"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Continents You have Visited</label>
                    <div class="control">
                        <?php 
                            foreach ($continents as $continent) {
                                echo '
                                    <label class="checkbox">
                                        <input name="continents[]" type="checkbox" value="' . $continent . '">
                                        ' . $continent . '
                                    </label>
                                ';
                            }
                        ?>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button name="submit" class="button is-link">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    </div>

</body>

</html>