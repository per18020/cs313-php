class FolderColumnObserver {
    constructor(store) {
        this.store = store;
        this.init();
    }

    init() {
        this.store.subscribe(this.handleChange.bind(this));
    }

    handleChange() {
        let folderColumn = document.getElementById("collection-column");
        folderColumn.innerHTML += "ran!";
    }
}