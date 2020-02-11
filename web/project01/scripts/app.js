
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
const noteColumnObserver = new NoteColumnObserver(store);
const quillObserver = new QuillObserver(store, quill);

let user_id = 1;

console.time("load");
Promise.all([
    store.dispatch(getUser(user_id)),
    store.dispatch(getAllFolders(user_id)),
    store.dispatch(getAllNotes(user_id))
]).then(() => {
    console.timeEnd("load");

    document.getElementById("app-loader").style.display = "none";
})

