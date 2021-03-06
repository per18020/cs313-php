class NoteColumnObserver {
    constructor(store, documentClickHandler) {
        this.store = store;
        this.documentClickHandler = documentClickHandler;
        this.searchBar = document.getElementById('note-searchbar');
        this.init();

        this.activeNoteOptions = null;
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
        addUniqueTrackedListener(this.searchBar, 'oninput', this.handleChange.bind(this));
    }

    handleChange() {
        let notes = getNotesInSelectedFolderState();
        let sortedNotes = [];

        let emptyFolder = false;
        let noSearchResults = false;

        if (notes) {
            if (this.searchBar.value != "") {
                let results = fuzzysort.go(this.searchBar.value.trim(), notes, {
                    key: 'note.title'
                });
                for (let i = 0; i < results.length; i++) {
                    if (!sortedNotes.find((obj) => { return obj.note.id == results[i].obj.note.id; })) {
                        sortedNotes.push(results[i].obj);
                    }
                }
                noSearchResults = sortedNotes.length == 0;
            } else {
                sortedNotes = notes.slice().sort((a, b) => {
                    return new Date(b.note.last_edited) - new Date(a.note.last_edited);
                });
                emptyFolder = notes.length == 0;
            }
        }

        buildNoteColumn({
            isFolder: getSelectedFolderState() > -1, // Only show Create Note button in folders and all notes, not trash
            notes: sortedNotes,
            activeNoteOptions: this.activeNoteOptions,
            emptyFolder,
            noSearchResults
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

    buildCreateNoteAllNotesModalHelper() {
        let user_id = getUserState().id;
        let folders = getFoldersState();
        buildCreateNoteAllNotesModal({
            input_id: "modal-create-note-all-notes-input",
            button_id: "modal-create-note-all-notes-button",
            dropdown_id: "all-notes-modal-dropdown-menu",
            selected_folder_id: "all-notes-modal-dropdown-selected-folder",
            dropdown_target_id: "all-notes-modal-dropdown-trigger",
            dropdown_id: "all-notes-modal-dropdown",
            dropdown_item_class: "all-notes-modal-dropdown-menu-items",
            folders,
            selectedFolderTitle: folders[0].title,
            selectedFolderId: folders[0].id
        }, () => {
            let submit = () => {
                let note_title = document.getElementById("modal-create-note-all-notes-input").value;
                note_title = (note_title) ? note_title : "Untitled";
                let folder_id = parseInt(document.getElementById("all-notes-modal-dropdown-selected-folder").getAttribute("folder-id"));
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                createNote(user_id, folder_id, note_title).then(() => {
                    this.store.dispatch(getAllNotesInFolders(user_id));
                    this.store.dispatch(getAllNotes(user_id));
                });
            }
            addUniqueTrackedListener(document.getElementById('all-notes-modal-dropdown-trigger'), 'onclick', () => {
                let dropdown = document.getElementById("all-notes-modal-dropdown");
                if (dropdown.classList.contains('is-active')) {
                    dropdown.classList.remove('is-active');
                } else {
                    dropdown.classList.add('is-active');
                }
            });
            let dropdownItems = document.getElementsByClassName("all-notes-modal-dropdown-menu-items");
            for (let i = 0; i < dropdownItems.length; i++) {
                let dropdownItem = dropdownItems[i];
                addUniqueTrackedListener(dropdownItem, 'onclick', () => {
                    let folder_id = dropdownItem.getAttribute("folder-id");
                    let folder_title = dropdownItem.innerHTML;
                    let dropdown = document.getElementById("all-notes-modal-dropdown");
                    dropdown.classList.remove('is-active');
                    let dropdownSelectedFolder = document.getElementById("all-notes-modal-dropdown-selected-folder");
                    dropdownSelectedFolder.setAttribute("folder-id", folder_id);
                    dropdownSelectedFolder.innerHTML = folder_title;
                });
            }
            addUniqueTrackedListener(document.getElementById('modal-create-note-all-notes-input'), 'onkeyup', (event) => {
                if (event.keyCode == 13) submit();
            });
            addUniqueTrackedListener(document.getElementById("modal-create-note-all-notes-button"), 'onclick', submit);
        });
    }

    handleAddNoteClick() {
        let user_id = getUserState().id;
        let selected_folder_id = getSelectedFolderState();
        let folders = getFoldersState();
        if (selected_folder_id == 0) {
            if (!folders.length) {
                createFolder(user_id, "Untitled").then(() => {
                    return this.store.dispatch(getAllFolders(user_id));
                }).then(() => {
                    this.buildCreateNoteAllNotesModalHelper();
                });
            } else {
                this.buildCreateNoteAllNotesModalHelper();
            }
        } else {
            buildCreateNoteModal({
                input_id: "modal-create-note-input",
                button_id: "modal-create-note-button"
            }, () => {
                let submit = () => {
                    let note_title = document.getElementById("modal-create-note-input").value;
                    note_title = (note_title) ? note_title : "Untitled";
                    document.getElementById("modal-target").parentNode.classList.remove("is-active");
                    createNote(user_id, selected_folder_id, note_title).then(() => {
                        this.store.dispatch(getNotesInFolder(user_id, selected_folder_id));
                        this.store.dispatch(getAllNotes(user_id));
                    });
                }
                addUniqueTrackedListener(document.getElementById('modal-create-note-input'), 'onkeyup', (event) => {
                    if (event.keyCode == 13) submit();
                });
                addUniqueTrackedListener(document.getElementById("modal-create-note-button"), 'onclick', submit);
            });
        }
    }

    handleNoteOptionsClick(note_id) {
        if (this.activeNoteOptions == note_id) {
            this.activeNoteOptions = null;
        } else {
            this.activeNoteOptions = note_id;
        }
    }

    handleNoteOptionsRenameClick() {
        this.activeNoteOptions = null;
        let current_note_title = getSelectedNoteState().title;
        buildRenameNoteModal({
            current_note_title,
            button_id: "modal-rename-note-button",
            input_id: "modal-rename-note-input"
        }, () => {
            let submit = () => {
                let note_title = document.getElementById("modal-rename-note-input").value;
                note_title = (note_title) ? note_title : "Untitled";
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                this.store.dispatch(updateSelectedNote({ title: note_title }));
                saveCurrentNote().then(() => {
                    this.store.dispatch(getAllNotes(getUserState().id));
                    this.store.dispatch(getAllNotesInFolders(getUserState().id));
                });
            }
            addUniqueTrackedListener(document.getElementById('modal-rename-note-input'), 'onkeyup', (event) => {
                if (event.keyCode == 13) submit();
            });
            addUniqueTrackedListener(document.getElementById('modal-rename-note-button'), 'onclick', submit);
        });
    }

    handleNoteOptionsDeleteClick(note_id) {
        this.activeNoteOptions = null;
        let note_title = getSelectedNoteState().title;
        buildDeleteNoteModal({
            note_title,
            delete_button_id: "modal-delete-note-delete-button",
            cancel_button_id: "modal-delete-note-cancel-button"
        }, () => {
            addUniqueTrackedListener(document.getElementById("modal-delete-note-delete-button"), 'onclick', () => {
                let user_id = getUserState().id;
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                deleteNote(user_id, note_id).then(() => {
                    this.store.dispatch(getAllNotes(user_id));
                    this.store.dispatch(getAllNotesInFolders(user_id));
                });
            });
            addUniqueTrackedListener(document.getElementById("modal-delete-note-cancel-button"), 'onclick', () => {
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
            });
        });
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
            addUniqueTrackedListener(button, 'onclick', this.handleNoteOptionsRenameClick.bind(this));
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