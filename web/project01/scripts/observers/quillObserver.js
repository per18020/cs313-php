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

        setInterval(() => {
            if (change.length() > 0) {
                let user_id = getUserState().id;
                let note_id = getSelectedNoteState().id;
                let folder_id = getSelectedFolderState();
                let note_title = getSelectedNoteState().title;
                let note_data = JSON.stringify(this.quill.getContents());
                updateNote(user_id, note_id, folder_id, note_title, note_data);
                change = new Delta();

                console.log("saved data");
            }
        }, 3000);
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