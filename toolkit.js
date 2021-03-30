var didCreateCollapseButton = false;
var tagToSearchFor = "";

if (location.href.includes("/merge_requests/"))
    tagToSearchFor = "span";
else if (location.href.includes("/commit/"))
    tagToSearchFor = "a";

main();

// If the user has a slow connection, keep trying to find the button until we timeout
async function main() {
    for (let i = 0; i < 60; i++) {
        tryCreateCollapseButton();

        if (didCreateCollapseButton)
            break;
        else
            await sleep(250);
    }
}

function tryCreateCollapseButton() {
    // If the button already exists, get outta here
    if (document.getElementById("mergeRequestCollapseButton") != null)
        return;

    var expandAllButton = null;

    // The expand button is the element that contains a span child w/ the text "Expand all"
    for (var element of document.getElementsByTagName(tagToSearchFor)) {
        if (element.textContent.trim() === "Expand all") {
            if (tagToSearchFor === "span")
                expandAllButton = element.parentElement;
            else
                expandAllButton = element;

            break;
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
    var toggleButtons;

    if (tagToSearchFor === "span")
        toggleButtons = document.getElementsByClassName('diff-toggle-caret gl-mr-2 gl-icon s16');
    else
        toggleButtons = document.getElementsByClassName('s16 chevron-down');

    for (let i = 0; i < toggleButtons.length; i++) {
        if (toggleButtons[i].getAttribute('data-testid') === 'chevron-down-icon') {
            if (tagToSearchFor === "span")
                toggleButtons[i].dispatchEvent(new Event('click'));
            else
                toggleButtons[i].parentElement.parentElement.parentElement.dispatchEvent(new Event('click'));
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
