class NoteColumnObserver {
    constructor(store) {
        this.store = store;
        this.init();
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        buildNoteColumn({
            isFolder: getSelectedFolderState() > 0,
            notes: getNotesInSelectedFolderState()
        }, () => {
            this.buildEventListeners();
        });
    }

    handleNoteClick(note_id) {
        this.store.dispatch(selectNote(note_id));
    }

    buildEventListeners() {
        let notes = document.getElementsByClassName("note-column-box");
        for (let i = 0; i < notes.length; i++) {
            let note_id = notes[i].getAttribute("note_id");
            addUniqueTrackedListener(notes[i], 'onclick', this.handleNoteClick.bind(this, note_id));
        }
    }
}