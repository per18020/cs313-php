class NoteColumnObserver {
    constructor(store, documentClickHandler) {
        this.store = store;
        this.documentClickHandler = documentClickHandler;
        this.init();

        this.activeNoteOptions = null;
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
            isFolder: getSelectedFolderState() > 0, // Only show Create Note button in folders, not all notes or trash
            notes: sortedNotes,
            activeNoteOptions: this.activeNoteOptions
        }, () => {
            this.buildEventListeners();
        });
    }

    handleNoteClick(note_id) {
        this.store.dispatch(selectNote(note_id));
    }

    handleDocumentClick() {
        this.activeNoteOptions = null;
        this.handleChange();
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

    handleNoteOptionsClick(note_id) {
        if (this.activeNoteOptions == note_id) {
            this.activeNoteOptions = null;
        } else {
            this.activeNoteOptions = note_id;
        }
    }

    handleNoteOptionsRenameClick(note_id) {
        
    }

    handleNoteOptionsDeleteClick(note_id) {
        
    }

    buildEventListeners() {
        let notes = document.getElementsByClassName("note-column-note");
        for (let i = 0; i < notes.length; i++) {
            let note_id = notes[i].getAttribute("note-id");
            addUniqueTrackedListener(notes[i], 'onclick', this.handleNoteClick.bind(this, note_id));
        }

        let addNoteButton = document.getElementById("note-column-add-note");
        if (addNoteButton) addUniqueTrackedListener(addNoteButton, 'onclick', this.handleAddNoteClick.bind(this));

        let optionButtons = document.getElementsByClassName('note-column-note-options-button');
        for (let i = 0; i < optionButtons.length; i++) {
            let button = optionButtons[i];
            let note_id = parseInt(button.getAttribute('note-id'));

            let d = document.getElementsByClassName('note-column-note-options-dropdown');
            for (let i = 0; i < d.length; i++) {
                if (parseInt(d[i].getAttribute('note-id')) == note_id) {
                    this.documentClickHandler.addIgnoredElement("note-dropdown" + i, d.item(i));
                }
            }
            addUniqueTrackedListener(button, 'onclick', this.handleNoteOptionsClick.bind(this, note_id));
        }

        let optionButtonsRename = document.getElementsByClassName('note-column-note-options-rename');
        for (let i = 0; i < optionButtonsRename.length; i++) {
            let button = optionButtonsRename[i];
            let note_id = button.getAttribute('note-id');
            addUniqueTrackedListener(button, 'onclick', this.handleNoteOptionsRenameClick.bind(this, note_id));
        }

        let optionButtonsDelete = document.getElementsByClassName('note-column-note-options-delete');
        for (let i = 0; i < optionButtonsDelete.length; i++) {
            let button = optionButtonsDelete[i];
            let note_id = button.getAttribute('note-id');
            addUniqueTrackedListener(button, 'onclick', this.handleNoteOptionsDeleteClick.bind(this, note_id));
        }

        this.documentClickHandler.subscribe("note-column", this.handleDocumentClick.bind(this));
    }
}