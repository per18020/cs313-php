
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

// Get data and build collection column
Promise.all([
    postData("/project01/api/getUser.php", {id: 1}).then(response => { return response.json(); }),
    postData("/project01/api/getFolders.php", {id: 1}).then(response => { return response.json(); })
]).then(([userResponse, foldersResponse]) => {
    buildCollectionColumn({
        folders: foldersResponse.folders,
        username: userResponse.username
    });
});

// Handlebars
function buildCollectionColumn(data) {
    fetch('/project01/templates/collection-column.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        document.getElementById("collection-column").innerHTML = Handlebars.compile(response)(data);
    });
}

postData("/project01/api/getAllNotes.php", {id: 1}).then(response => { return response.json(); }).then(response => console.log(response));

const folderColumnObserver = new FolderColumnObserver(store);