
// Set up quill
// https://quilljs.com/

const bindings = {
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

const quill = new Quill('#editor', {
    theme: 'bubble',
    modules: {
        keyboard: {
            bindings: bindings
        },
        markdownShortcuts: {}
    },
    scrollingContainer: '#scrolling-container'
});

const folderColumnObserver = new FolderColumnObserver(store);

store.dispatch(getUser(1));
store.dispatch(getAllFolders(1));