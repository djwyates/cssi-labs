console.log("The writeMessage script is running");

const passcodeInput = document.querySelector("#passcode"),
      messageInput = document.querySelector("#message"),
      submitMessageForm = document.querySelector("#submitMsgButton");

const submitMessage = () => {
    if (messageInput.value.length > 150) {
        alert("This message is too long (max. 150 characters)");
        return;
    }
    for (let i=0; i<passcodeInput.value.length; i++) {
        console.log(passcodeInput.value.substring);
    }
    firebase.database().ref().push({
        message: messageInput.value,
        passcode: passcodeInput.value
    });
    passcodeInput.value = "";
    messageInput.value = "";
}

submitMessageForm.addEventListener("click", submitMessage);