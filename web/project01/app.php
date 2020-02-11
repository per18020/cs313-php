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
    <link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">

    <link rel="stylesheet" href="/project01/style/app.css">
    <link rel="stylesheet" href="/project01/style/editor.css">
</head>

<body>
    <div class="columns">
        <div id="collection-column-target" class="column sticky-column">
            
        </div>
        <div id="note-column" class="column sticky-column">
            <!-- Searchbar -->
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="Search Notes">
                </div>
                <div class="control">
                    <button class="button is-primary">
                        <span class="icon is-small">
                            <i class="far fa-sticky-note"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div id="note-column-target"></div>
        </div>

        <div class="scrolling-container">
            <div id="editor"></div>
        </div>
    </div>

    <!-- Util -->
    <script src="/project01/scripts/utilities/util.js"></script>
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
    <script src="/project01/scripts/observers/folderColumnObserver.js"></script>
    <script src="/project01/scripts/observers/noteColumnObserver.js"></script>
    <script src="/project01/scripts/observers/quillObserver.js"></script>
    <script src="/project01/scripts/app.js"></script>
</body>

</html>