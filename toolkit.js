var timeout = null;
var didCreateCollapseButton = false;

// If the user has a slow connection, keep trying to find the button until we timeout
for (let i = 0; i < 60; i++) {
    setTimeout(tryCreateCollapseButton, 250);

    if (didCreateCollapseButton)
        break;
}

function tryCreateCollapseButton() {
    // If the button already exists, get outta here
    if (document.getElementById("mergeRequestCollapseButton") != null)
        return;

    var expandAllButton = null;

    // The expand button is the element that contains a span child w/ the text "Expand all"
    for (var element of document.getElementsByTagName("span")) {
        if (element.textContent.trim() === "Expand all") {
            expandAllButton = element.parentElement
        }
    }

    if (expandAllButton != null) {
        var collapseAllButton = document.createElement('button');

        collapseAllButton.id = "mergeRequestCollapseButton";
        collapseAllButton.className = "btn gl-mr-3 btn-default btn-md gl-button";
        collapseAllButton.innerHTML = `<span class="gl-button-text">Collapse all</span>`;
        collapseAllButton.onclick = onCollapseAllClick;

        // Insert the collapse button directly after the expand button
        expandAllButton.insertAdjacentElement('afterend', collapseAllButton);

        didCreateCollapseButton = true;
    }
}

function onCollapseAllClick() {
    let icons = document.getElementsByClassName('diff-toggle-caret gl-mr-2 gl-icon s16')

    for (let i = 0; i < icons.length; i++) {
        if (icons[i].getAttribute('data-testid') === 'chevron-down-icon') {
            icons[i].dispatchEvent(new Event('click'));
        }
    }
}
