class DocumentClickHandler {
    constructor() {
        this.ignoredElements = Immutable.Map();
        this.callbacks = Immutable.Map();

        addUniqueTrackedListener(document, 'onclick', this.handleDocumentClick.bind(this));
    }

    addIgnoredElement(key, element) {
        this.ignoredElements = this.ignoredElements.set(key, element);
    }

    subscribe(key, callback) {
        this.callbacks = this.callbacks.set(key, callback);
    }

    handleDocumentClick(event) {
        // Clean up dead elements
        this.ignoredElements.map((element, key) => {
            if (!document.body.contains(element)) this.ignoredElements = this.ignoredElements.delete(key);
        })
        // Iterate over ignored elements, if none of them match the event's target, run callbacks
        let clickedOnTriggerFlag = false;
        this.ignoredElements.map(element => {
            if (element.contains(event.target)) clickedOnTriggerFlag = true;
        })
        if (!clickedOnTriggerFlag) {
            this.callbacks.map(callback => callback());
        }
    }
}