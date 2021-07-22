console.log("The writeMessage script is running");

const passcodeInput = document.querySelector("#passcode"),
      messageInput = document.querySelector("#message"),
      submitMessageForm = document.querySelector("#submitMsgButton");

const submitMessage = () => {
    console.log("in submitMessage function");
    firebase.database().ref().push({
        message: messageInput.value,
        passcode: passcodeInput.value
    });
    passcodeInput.value = "";
    messageInput.value = "";
}

submitMessageForm.addEventListener("click", submitMessage);