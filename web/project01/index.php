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

    <link rel="stylesheet" href="/project01/style/index.css">
    <link rel="stylesheet" href="/project01/style/editor.css">
</head>

<body>
    <div class="columns">
        <div id="collection-column" class="column sticky-column">

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

        </div>

        <div class="scrolling-container">
            <div id="editor"></div>
        </div>
    </div>

    <script src="/project01/lib/handlebars.min-v4.7.2.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script src="/project01/lib/quill-markdown.js"></script>
    <script src="/project01/scripts/util.js"></script>
    <script src="/project01/scripts/index.js"></script>
</body>

</html>