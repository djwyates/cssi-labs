let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(false);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    }
  });
  const showArchived = document.querySelector("#showArchived");
  showArchived.addEventListener("click", () => {
    const checkbox = showArchived.children[0];
    if (checkbox.checked) getNotes(true);
    else getNotes(false);
  });
};

const getNotes = (displayArchived) => {
  const notesRef = firebase.database().ref(`users/${googleUserId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data, displayArchived);
  });
};

const renderDataAsHtml = (data, displayArchived) => {
  let cards = ``;
  let notes = [];
  for(const noteItem in data) {
    let note = data[noteItem];
    if (note.archived && !displayArchived) continue;
    note.id = noteItem;
    notes.push(note);
  };
  notes.sort((a, b) => {
    if (a.title > b.title) return 1;
    else return -1;
  });
  // For each note create an HTML card
  notes.forEach((note) => {
    cards += createCard(note, note.id);
  });
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note, noteId) => {
  return `
    <div class="column is-one-quarter">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    ${note.title}
                </p>` + (note.archived ?
                `<span class="tag">
                    Archived
                </span>` : ``)
            + `</header>
            <div class="card-content">
                <div class="content">
                    ${note.text}
                </div>
            </div>
            <footer class="card-footer">
                <a id="${noteId}" href="#" class="card-footer-item"
                    onclick="editNote('${noteId}')">
                    Edit
                </a>
                <a id="${noteId}" href="#" class="card-footer-item"
                    onclick="archiveNote('${noteId}')">
                    Archive
                </a>
                <a id="${noteId}" href="#" class="card-footer-item"
                    onclick="deleteNote('${noteId}')">
                    Delete
                </a>
            </footer>
        </div>
    </div>
  `;
};

const archiveNote = (noteId) => {
    if (confirm("Are you sure you want to archive this note?")) {
        const noteRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);
        noteRef.update({
            archived: true
        });
    }
};

const deleteNote = (noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
        const noteRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);
        noteRef.remove();
    }
};

const editNote = (noteId) => {
    const editNoteModal = document.querySelector("#editNoteModal");
    const noteRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);
    noteRef.on("value", (snapshot) => {
        const note = snapshot.val();
        document.querySelector('#editTitleInput').value = note.title;
        document.querySelector('#editTextInput').value = note.text;
        document.querySelector('#noteId').value = noteId;
        editNoteModal.classList.toggle('is-active');
    });
};

const closeEditModal = (noteId) => {
    const editNoteModal = document.querySelector("#editNoteModal");
    editNoteModal.classList.toggle('is-active');
};

const saveEditedNote = () => {
    const newTitle = document.querySelector('#editTitleInput').value;
    const newText = document.querySelector('#editTextInput').value;
    const noteId = document.querySelector('#noteId').value;
    firebase.database().ref(`users/${googleUserId}/${noteId}`).update({
        title: newTitle,
        text: newText
    });
    const editNoteModal = document.querySelector("#editNoteModal");
    editNoteModal.classList.toggle('is-active');
};