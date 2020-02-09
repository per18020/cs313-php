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
            notes: getNotesInSelectedFolderState()
        });
    }
}