class QuillObserver {
    constructor(store, quill) {
        this.store = store;
        this.quill = quill;
        this.init();
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        let selectedNote = getSelectedNoteState();
        if (selectedNote) {
            this.quill.setContents(JSON.parse(formatJSONString(selectedNote.data)));
        } else {
            this.quill.setContents([{ insert: '\n' }]);
        }
    }
}