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
            this.store.dispatch(updateSelectedNote({ data: JSON.stringify(this.quill.getContents()) }))
            change = new Delta();
        });

        setInterval(() => {
            if (change.length() > 0) {
                saveCurrentNote().then(() => console.log("Saved"));
            }
        }, 2000);
    }

    handleChange() {
        let selectedNote = getSelectedNoteState();
        if (selectedNote) {
            let newData = formatJSONString(selectedNote.data);
            let oldData = JSON.stringify(this.quill.getContents());
            if (newData != oldData) { 
                // Only set contents if the data coming from the state object is different than what's already in there. 
                // This should only really run once when a note is loaded in.
                this.quill.setContents(JSON.parse(newData));
            }
        }
    }
}