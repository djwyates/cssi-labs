const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            const userId = user.uid;
            window.location = "writeNote.html";
        }).catch(err => {
            console.error(err);
        });
};