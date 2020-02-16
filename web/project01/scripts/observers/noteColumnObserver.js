class NoteColumnObserver {
    constructor(store) {
        this.store = store;
        this.init();
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        let notes = getNotesInSelectedFolderState();
        if (notes) {
            var sortedNotes = getNotesInSelectedFolderState().slice().sort((a, b) => {
                return new Date(b.note.last_edited) - new Date(a.note.last_edited);
            });
        }
        buildNoteColumn({
            isFolder: getSelectedFolderState() > 0,
            notes: sortedNotes
        }, () => {
            this.buildEventListeners();
        });
    }

    handleNoteClick(note_id) {
        this.store.dispatch(selectNote(note_id));
    }

    handleAddNoteClick() {
        buildCreateNoteModal({
            input_id: "modal-create-note-input",
            button_id: "modal-create-note-button"
        }, () => {
            addUniqueTrackedListener(document.getElementById("modal-create-note-button"), 'onclick', () => {
                let user_id = getUserState().id;
                let folder_id = getSelectedFolderState();
                let note_title = document.getElementById("modal-create-note-input").value;
                note_title = (note_title) ? note_title : "Untitled";
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                createNote(user_id, folder_id, note_title).then(() => {
                    this.store.dispatch(getNotesInFolder(user_id, folder_id));
                });
            });
        });
    }

    buildEventListeners() {
        let notes = document.getElementsByClassName("note-column-note");
        for (let i = 0; i < notes.length; i++) {
            let note_id = notes[i].getAttribute("note_id");
            addUniqueTrackedListener(notes[i], 'onclick', this.handleNoteClick.bind(this, note_id));
        }

        let addNoteButton = document.getElementById("note-column-add-note");
        if (addNoteButton) addUniqueTrackedListener(addNoteButton, 'onclick', this.handleAddNoteClick.bind(this))
    }
}