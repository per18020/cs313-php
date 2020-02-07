function buildCollectionColumn(data) {
    fetch('/project01/templates/collection-column.handlebars').then((response) => {
        return response.text();
    }).then((response) => {
        document.getElementById("collection-column").innerHTML = Handlebars.compile(response)(data);
    });
}