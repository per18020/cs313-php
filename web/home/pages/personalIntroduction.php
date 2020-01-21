<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Personal Introduction</title>

    <link rel="stylesheet" href="../../lib/bulma.min.css">
    <link rel="stylesheet" href="/home/style/personalIntroduction.css">
</head>

<body>
    <div class="section">
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="content is-large">
                    <h1 id="main-title">
                        Jacob <br>
                        Perry
                    </h1>
                    <p id="main-subtitle">
                        I like to make things that other people like. I don't believe in cheese 🧀
                    </p>
                    <p>
                        <strong>Hobbies include:</strong>
                    </p>
                    <ol type="1">
                        <li>Book Reading 📚</li>
                        <li>Cartoon Watching 📺</li>
                        <li>Horse Painting 🐴</li>
                    </ol>
                    <h1 class="content-title">
                        Do Requirements
                    </h1>
                    <p>
                        <strong>Do an image: </strong>
                    </p>
                    <p>
                        <div class="image is-16by9 text-centered">
                            <img class="" src="https://pbs.twimg.com/media/D8jfLEdUIAUVO2D?format=jpg&name=4096x4096">
                        </div>
                        <div>
                            <a href="#">Cloud Chasers</a>
                            <em>by me</em>
                        </div>
                    </p>
                    <p>
                        <strong>Do a PHP: </strong>
                    </p>
                    <?php
                    date_default_timezone_set('America/Denver'); // CDT
                    echo "Server time: " . date('m/d/Y h:i:s');
                    ?>
                    <h1 class="content-title">
                        Links
                    </h1>
                    <ul>
                        <li><a href="/index.php">Home</a></li>
                        <li><a href="https://github.com/per18020/cs313-php">Github</a></li>
                        <li><a href="https://twitter.com/thefloatingtree">Twitter</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>

</html>