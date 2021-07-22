const passwordInput = document.querySelector('#passcode');
const messageDisplay = document.querySelector('#message');
const button = document.querySelector('#viewMsg');

let incorrectPwdAttempts = 0;

const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let numMessagesWithPwd = 0;
        if (incorrectPwdAttempts >= 3) {
            alert("You have tried to guess a password too many times! Wait 3 minutes before trying again.");
            setTimeout(() => {
                incorrectPwdAttempts = 0;
            }, 3000*60);
            return;
        }
        for (const key in data) {
            if (data[key].password === passwordInput.value) {
                renderMessageHTML(data[key].message);
                numMessagesWithPwd++;
            }
        }
        if (numMessagesWithPwd === 0) {
            alert("Incorrect Password");
            passwordInput.value = '';
            incorrectPwdAttempts++;
        }
    });
}

const renderMessageHTML = (message) => {
    passwordInput.value = '';
    messageDisplay.innerHTML = message;
    button.innerText = 'View other message';
}