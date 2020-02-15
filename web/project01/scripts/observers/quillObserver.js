class QuillObserver {
    constructor(store, quill) {
        this.store = store;
        this.quill = quill;
        this.init();
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));

        let Delta = Quill.import('delta');
        let change = new Delta;
        this.quill.on('text-change', (delta) => {
            change = change.compose(delta);
        });

        // setInterval(() => {
        //     if (change.length() > 0) {
        //         change = new Delta();
        //     }
        // }, 3000);
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