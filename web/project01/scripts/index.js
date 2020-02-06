
// Set up quill
// https://quilljs.com/

let bindings = {
    removeFormattingOnBackspace: {
        key: "backspace",
        format: ["header", "code-block", "blockquote"],
        empty: true,
        handler: () => {
            let pos = this.quill.getSelection();
            this.quill.removeFormat(pos.index, pos.length);
        }
    },
    removeFormattingOnEnter: {
        key: "enter",
        format: ["blockquote"],
        empty: true,
        handler: () => {
            let pos = this.quill.getSelection();
            this.quill.removeFormat(pos.index, pos.length);
        }
    }
}

var quill = new Quill('#editor', {
    theme: 'bubble',
    modules: {
        keyboard: {
            bindings: bindings
        },
        markdownShortcuts: {}
    },
    scrollingContainer: '#scrolling-container'
});

// // Get username
// postData("/project01/api/getUser.php", {id: 1}).then((response) => {
//     return response.json();
// }).then((response) => console.log(response));

// // Get folders
// postData("/project01/api/getFolders.php", {id: 1}).then((response) => {
//     return response.json();
// }).then((response) => buildCollectionColumn(response.folders))


Promise.all([
    postData("/project01/api/getUser.php", {id: 1}).then(response => { return response.json(); }),
    postData("/project01/api/getFolders.php", {id: 1}).then(response => { return response.json(); })
]).then(values => {
    let userResponse = values[0];
    let foldersResponse = values[1];

    let data = {
        folders: foldersResponse.folders,
        username: userResponse.email
    }

    console.log(data);

    buildCollectionColumn(data);
});

// Handlebars
function buildCollectionColumn(data) {
    fetch('/project01/templates/collection-column-item.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        document.getElementById("collection-column").innerHTML += Handlebars.compile(response)(data);
    });
}