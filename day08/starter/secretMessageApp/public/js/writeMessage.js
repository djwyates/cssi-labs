const messageInput = document.querySelector('#message');
const passwordInput = document.querySelector('#passcode');

const sendMessage = () => {
    let key = 1; // randomly generate key?
    let update = {};
    update[messageIndex] = {
        message: messageInput.value,
        password: passwordInput.value
    };
    firebase.database().ref().set(update);
}