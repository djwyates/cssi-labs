window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const googleUserId = user.uid;
            const userDisplayName = user.displayName;
            console.log(userDisplayName);
            getAllNotes(googleUserId, userDisplayName);
        } else {
            window.location = "index.html";
            alert("You must be logged in to view notes!");
        }
    });
};

const getAllNotes = (userId, userDisplayName) => {
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on("value", (snapshot) => {
        renderNotesInHtml(snapshot.val(), userDisplayName);
    });
};

const renderNotesInHtml = (notes, userDisplayName) => {
    console.log(notes);
    for (const noteKey in notes) {
        const note = notes[noteKey];
        const cardContainer = document.querySelector("#app");
        cardContainer.appendChild(createNoteElement(note, userDisplayName));
    }
};

const createNoteElement = (note, userDisplayName) => {
    // Card containers
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("column", "is-one-third");
    const noteCard = document.createElement("div");
    noteCard.classList.add("card");
    cardColumn.appendChild(noteCard);
    // Card header content
    const noteHeader = document.createElement("div");
    noteHeader.classList.add("card-header");
    const noteHeaderTitle = document.createElement("p");
    noteHeaderTitle.classList.add("card-header-title");
    noteHeaderTitle.innerText = note.title ? note.title : "No title";
    noteHeader.appendChild(noteHeaderTitle);
    if (note.labels) {
        const noteLabels = document.createElement("div");
        note.labels.forEach((label) => {
            const noteHeaderLabel = document.createElement("span");
            noteHeaderLabel.classList.add("tag");
            noteHeaderLabel.innerText = label;
            noteLabels.appendChild(noteHeaderLabel);
            noteHeader.appendChild(noteLabels);
        });
    }
    noteCard.appendChild(noteHeader);
    // Card body content
    const noteContent = document.createElement("div");
    noteContent.classList.add("card-content");
    const noteParagraph = document.createElement("div");
    noteParagraph.classList.add("content");
    noteParagraph.innerText = note.note ? note.note : "This note has no content";
    noteContent.appendChild(noteParagraph);
    noteCard.appendChild(noteContent);
    // Card footer content
    const noteFooter = document.createElement("div");
    noteFooter.classList.add("card-footer");
    const noteFooterP = document.createElement("p");
    noteFooterP.classList.add("card-footer-item");
    noteFooterP.innerText = "Created by " + userDisplayName;
    noteFooter.appendChild(noteFooterP);
    noteCard.appendChild(noteFooter);
    const backgroundColors = ["white", "light", "primary", "link", "info", "success", "warning", "danger"];
    const randomColorIndex = Math.round(Math.random()*(backgroundColors.length-1));
    noteCard.classList.add("has-background-" + backgroundColors[randomColorIndex]);
    return cardColumn;
};

const searchNotesByLabel = () => {
    const labelToSearch = document.querySelector("#labelInput").value;
    const notesContainer = document.querySelector("#app");
    for (let i = 0; i < notesContainer.children.length; i++) {
        const card = notesContainer.children[i];
        if (card.children[0].children[0].children[1]) {
            const cardLabels = card.children[0].children[0].children[1];
            console.log(cardLabels);
        }
    }
};