class FolderColumnObserver {
    constructor(store, documentClickHandler) {
        this.store = store;
        this.documentClickHandler = documentClickHandler;
        this.init();

        this.activeFolderOptions;
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        buildFolderColumn({
            folders: getFoldersState(),
            username: getUserState().username,
            selectedFolder: getSelectedFolderState(),
            activeFolderOptions: this.activeFolderOptions
        }, () => {
            this.buildEventListeners();
        });
    }

    handleFolderButtonClick(folder_id) {
        this.store.dispatch(selectFolder(folder_id));
    }

    handleUserButtonClick() {
        if (this.activeFolderOptions == 0) {
            this.activeFolderOptions = null;
        } else {
            this.activeFolderOptions = 0;
        }
        this.handleChange();
    }

    handleDocumentClick() {
        this.activeFolderOptions = null;
        this.handleChange();
    }

    handleSignOutClick() {
        signOutCurrentUser();
        window.location.href = "/project01/login.php";
    }

    handleCreateFolderClick() {
        buildCreateFolderModal({
            button_id: "modal-create-folder-button",
            input_id: "modal-create-folder-input"
        }, () => {
            let submit = () => {
                let user_id = getUserState().id;
                let folder_title = document.getElementById("modal-create-folder-input").value;
                folder_title = (folder_title) ? folder_title : "Untitled";
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                createFolder(user_id, folder_title).then(() => {
                    this.store.dispatch(getAllFolders(user_id));
                });
            }
            addUniqueTrackedListener(document.getElementById("modal-create-folder-input"), 'onkeyup', (event) => {
                if (event.keyCode == 13) submit();
            })
            addUniqueTrackedListener(document.getElementById("modal-create-folder-button"), 'onclick', submit);
        });
    }

    handleFolderOptionsClick(folder_id) {
        if (this.activeFolderOptions == folder_id) {
            this.activeFolderOptions = null;
        } else {
            this.activeFolderOptions = folder_id;
        }
    }

    handleFolderOptionsRenameClick(folder_id) {
        this.activeFolderOptions = null;
        let current_folder_title = getFolderState(folder_id).title;
        buildRenameFolderModal({
            current_folder_title,
            button_id: "modal-rename-folder-button",
            input_id: "modal-rename-folder-input"
        }, () => {
            let submit = () => {
                let user_id = getUserState().id;
                let folder_title = document.getElementById("modal-rename-folder-input").value;
                folder_title = (folder_title) ? folder_title : "Untitled";
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                renameFolder(user_id, folder_id, folder_title).then(() => {
                    this.store.dispatch(getAllFolders(user_id));
                });
            }
            addUniqueTrackedListener(document.getElementById('modal-rename-folder-input'), 'onkeyup', (event) => {
                if (event.keyCode == 13) submit();
            });
            addUniqueTrackedListener(document.getElementById('modal-rename-folder-button'), 'onclick', submit);
        });
    }

    handleFolderOptionsDeleteClick(folder_id) {
        this.activeFolderOptions = null;
        let folder_title = getFolderState(folder_id).title;
        let notes = getNotesInSelectedFolderState();
        buildDeleteFolderModal({
            folder_title,
            delete_button_id: "modal-delete-folder-delete-button",
            cancel_button_id: "modal-delete-folder-cancel-button",
            note_count: notes.length
        }, () => {
            addUniqueTrackedListener(document.getElementById("modal-delete-folder-delete-button"), 'onclick', () => {
                let user_id = getUserState().id;
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
                deleteFolder(user_id, folder_id).then(() => {
                    this.store.dispatch(getAllFolders(user_id));
                });
            });
            addUniqueTrackedListener(document.getElementById("modal-delete-folder-cancel-button"), 'onclick', () => {
                document.getElementById("modal-target").parentNode.classList.remove("is-active");
            });
        });
    }

    buildEventListeners() {
        let buttons = document.getElementsByClassName('collection-button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            let folder_id = parseInt(button.getAttribute('folder-id'));
            addUniqueTrackedListener(button, 'onclick', this.handleFolderButtonClick.bind(this, folder_id));
        }

        let userDropdown = document.getElementById("collection-column-user-dropdown");
        addUniqueTrackedListener(userDropdown, 'onclick', this.handleUserButtonClick.bind(this));
        // dropdowns.push(userDropdown);
        this.documentClickHandler.addIgnoredElement("user-dropdown", userDropdown);

        let signOutButton = document.getElementById("collection-column-sign-out");
        addUniqueTrackedListener(signOutButton, 'onclick', this.handleSignOutClick.bind(this))

        let createFolderButton = document.getElementById("create-collection-button");
        addUniqueTrackedListener(createFolderButton, 'onclick', this.handleCreateFolderClick.bind(this));

        let optionButtons = document.getElementsByClassName('collection-column-collection-options-button');
        for (let i = 0; i < optionButtons.length; i++) {
            let button = optionButtons[i];
            let folder_id = parseInt(button.getAttribute('folder-id'));

            let d = document.getElementsByClassName('collection-column-collection-options-dropdown');
            for (let i = 0; i < d.length; i++) {
                if (parseInt(d[i].getAttribute('folder-id')) == folder_id) {
                    // dropdowns.push(d.item(i));
                    this.documentClickHandler.addIgnoredElement("folder-dropdown" + i, d.item(i));
                }
            }
            addUniqueTrackedListener(button, 'onclick', this.handleFolderOptionsClick.bind(this, folder_id));
        }

        let optionButtonsRename = document.getElementsByClassName('collection-column-collection-options-rename');
        for (let i = 0; i < optionButtonsRename.length; i++) {
            let button = optionButtonsRename[i];
            let folder_id = button.getAttribute('folder-id');
            addUniqueTrackedListener(button, 'onclick', this.handleFolderOptionsRenameClick.bind(this, folder_id));
        }
        let optionButtonsDelete = document.getElementsByClassName('collection-column-collection-options-delete');
        for (let i = 0; i < optionButtonsDelete.length; i++) {
            let button = optionButtonsDelete[i];
            let folder_id = button.getAttribute('folder-id');
            addUniqueTrackedListener(button, 'onclick', this.handleFolderOptionsDeleteClick.bind(this, folder_id));
        }

        // addUniqueTrackedListener(document, 'onclick', this.handleDocumentClick.bind(this, dropdowns));
        this.documentClickHandler.subscribe("folder-column", this.handleDocumentClick.bind(this));
    }
}