
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

// handlebars

let collections = [
    "Test1",
    "Test2",
    "Test3",
]

fetch('/project01/templates/collection-column-item.handlebars').then((response) => {
    return response.text();
}).then((response) => {
    document.getElementById("collection-column").innerHTML += Handlebars.compile(response)(collections);
});
