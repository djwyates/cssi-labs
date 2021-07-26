let googleUser, userId;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(`Logged in as: ${user.displayName}`);
            googleUser = user;
            userId = googleUser.uid;
        } else {
            window.location = "index.html";
        }
    });
};

const submitNote = () => {
    const titleInput = document.querySelector("#noteTitle");
    const noteInput = document.querySelector("#noteText");
    firebase.database().ref("users/" + userId).push({
        title: titleInput.value,
        note: noteInput.value
    });
    titleInput.value = "";
    noteInput.value = "";
};