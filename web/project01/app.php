<?php

session_start();

if (!isset($_SESSION["isAuthenticated"]) && getenv('DATABASE_URL')) {
    header("Location:login.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Project 1</title>

    <link rel="stylesheet" href="/lib/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <link rel="stylesheet" href="/project01/lib/style/quillBubble.css">

    <link rel="stylesheet" href="/project01/style/app.css">
    <link rel="stylesheet" href="/project01/style/editor.css">
    <link rel="stylesheet" href="/project01/style/spinner.css">
</head>

<body>
    <div class="modal">
        <div id="modal-target-background" class="modal-background"></div>
        <div id="modal-target" class="modal-content">
            
        </div>
    </div>
    <div id="app-loader">
        <section class="hero is-primary is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <p class="title">
                        <div class="loader">Loading...</div>
                    </p>
                </div>
            </div>
        </section>
    </div>
    <div id="app">
        <div class="columns">
            <div id="collection-column-target" class="column sticky-column">

            </div>
            <div id="note-column" class="column sticky-column">
                <!-- Searchbar -->
                <div class="field">
                    <div class="control is-expanded">
                        <input id="note-searchbar" class="input" type="text" placeholder="Search Notes">
                    </div>
                </div>
                <div id="note-column-target"></div>
            </div>

            <div class="scrolling-container">
                <div id="editor"></div>
            </div>
        </div>
    </div>

    <!-- Util -->
    <script src="/project01/scripts/utilities/util.js"></script>
    <!-- Fuzzysort -->
    <script src="/project01/lib/fuzzysort.js"></script>
    <!-- Momentjs -->
    <script src="/project01/lib/momentjs.min.js"></script>
    <!-- Handlebars -->
    <script src="/project01/lib/handlebars.min-v4.7.2.js"></script>
    <script src="/project01/scripts/build/templates.js"></script>
    <script src="/project01/scripts/utilities/handlebarsHelpers.js"></script>
    <!-- Quill -->
    <script src="/project01/lib/quill.min.js"></script>
    <script src="/project01/lib/quill-markdown.js"></script>
    <!-- Immutable -->
    <script src="/project01/lib/immutable.min.js"></script>
    <!-- Redux -->
    <script src="/project01/lib/redux.min.js"></script>
    <script src="/project01/lib/redux-thunk.js"></script>
    <script src="/project01/scripts/actions/fetchAPI.js"></script>
    <script src="/project01/scripts/actions/userActions.js"></script>
    <script src="/project01/scripts/actions/folderActions.js"></script>
    <script src="/project01/scripts/actions/noteActions.js"></script>
    <script src="/project01/scripts/reducers/reducers.js"></script>
    <script src="/project01/scripts/store/store.js"></script>
    <!-- Custom JS -->
    <script src="/project01/scripts/utilities/documentClickHandler.js"></script>
    <script src="/project01/scripts/observers/folderColumnObserver.js"></script>
    <script src="/project01/scripts/observers/noteColumnObserver.js"></script>
    <script src="/project01/scripts/observers/quillObserver.js"></script>
    <script src="/project01/scripts/app.js"></script>
</body>

</html>