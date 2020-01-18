// THREE JS

import App from './app.js';

let app = new App();

window.addEventListener("resize", () => {
    app.resize();
});

// NAV-PANEL CONTROLS

let linkData;
let panelShowing = true;

fetch('/home/data/directory.json').then((response) => {
    return response.json();
}).then((response) => {
    linkData = response;

    resetPanelTabSelection();
    panelTabHome.classList.add("is-active");
    appendHTMLToPanel(linkData.home);

});

let panelTabHome = document.getElementById("panel-tabs-home");
let panelTabAssignments = document.getElementById("panel-tabs-assignments");
let panelTabTeam = document.getElementById("panel-tabs-team");
let panelTabMisc = document.getElementById("panel-tabs-misc");
let panel = document.getElementById("nav-panel");

panelTabHome.addEventListener("click", () => {
    resetPanelTabSelection();
    panelTabHome.classList.add("is-active");
    appendHTMLToPanel(linkData.home);
});

panelTabAssignments.addEventListener("click", () => {
    resetPanelTabSelection();
    panelTabAssignments.classList.add("is-active");
    appendHTMLToPanel(linkData.assignments);
});

panelTabTeam.addEventListener("click", () => {
    resetPanelTabSelection();
    panelTabTeam.classList.add("is-active");
    appendHTMLToPanel(linkData.team);
});

panelTabMisc.addEventListener("click", () => {
    resetPanelTabSelection();
    panelTabMisc.classList.add("is-active");
    appendHTMLToPanel(linkData.misc);
});

function appendHTMLToPanel(data) {
    // Remove existing children
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }

    // Build and append an error if there is nothing to display
    if (data.length <= 0) {
        let node = document.createElement("div");
        node.classList.add("panel-block");

        let spanNode = document.createElement("span");
        spanNode.classList.add("panel-icon");
        let iNode = document.createElement("i");
        iNode.classList.add("fas", "fa-exclamation-triangle");
        iNode.setAttribute("aria-hidden", "true");

        let textNode = document.createTextNode("Nothing to display");

        spanNode.appendChild(iNode);

        node.appendChild(spanNode);
        node.appendChild(textNode);

        panel.appendChild(node);
        return;
    }

    // Build and append panel-blocks
    for (let i = 0; i < data.length; i++) {
        let node = document.createElement("a");
        node.classList.add("panel-block");
        node.setAttribute("href", data[i].path);

        let spanNode = document.createElement("span");
        spanNode.classList.add("panel-icon");
        let iNode = document.createElement("i");
        iNode.classList.add("fas", "fa-link");
        iNode.setAttribute("aria-hidden", "true");

        let textNode = document.createTextNode(data[i].title);

        spanNode.appendChild(iNode);

        node.appendChild(spanNode);
        node.appendChild(textNode);

        panel.appendChild(node);
    }
}

function resetPanelTabSelection() {
    panelTabHome.classList.remove("is-active");
    panelTabMisc.classList.remove("is-active");
    panelTabTeam.classList.remove("is-active");
    panelTabAssignments.classList.remove("is-active");
}

// NAV-PANEL SHOW-HIDE

let panelCollapseButton = document.getElementById("panel-collapse-button");
let panelBox = document.getElementById("panel");

panelCollapseButton.addEventListener("click", () => {
    panelShowing = !panelShowing;
    panelBox.style.visibility = panelShowing ? "visible" : "hidden";
    panelCollapseButton.style.fontSize = "bold";
    app.toggleControls();
});

