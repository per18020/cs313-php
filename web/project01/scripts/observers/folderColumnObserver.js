class FolderColumnObserver {
    constructor(store) {
        this.store = store;
        this.init();

        this.boundHandlers = [];
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        buildFolderColumn({
            folders: getFoldersState(),
            username: getUserState().username,
            selectedFolder: getSelectedFolderState()
        }, () => {
            this.buildEventListeners();
        });
    }

    handleFolderButtonClick(folder_id) {
        this.store.dispatch(selectFolder(folder_id));
    }

    handleUserButtonClick(dropdown) {
        if (dropdown.classList.contains("is-active")) {
            dropdown.classList.remove("is-active");
        } else {
            dropdown.classList.add("is-active");
        }
    }

    handleDocumentClick(dropdown, event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("is-active");
        }
    }

    handleSignOutClick() {
        signOutCurrentUser();
        window.location.href = "/project01/login.php";
    }

    buildEventListeners() {
        let buttons = document.getElementsByClassName('collection-button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            let folder_id = parseInt(button.getAttribute('folder-id'));
            addUniqueTrackedListener(button, 'onclick', this.handleFolderButtonClick.bind(this, folder_id));
        }
        let dropdown = document.getElementById("collection-column-user-dropdown");
        addUniqueTrackedListener(dropdown, 'onclick', this.handleUserButtonClick.bind(this, dropdown));
        addUniqueTrackedListener(document, 'onclick', this.handleDocumentClick.bind(this, dropdown));
        let signOutButton = document.getElementById("collection-column-sign-out");
        addUniqueTrackedListener(signOutButton, 'onclick', this.handleSignOutClick.bind(this))
    }
}