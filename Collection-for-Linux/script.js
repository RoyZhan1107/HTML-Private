const messagesContainer = document.getElementById("message");

function sendMessage(){
    const userInput = document.getElementById("userInput").value.trim();
    if(userInput === "") return;

    // Display user message
    displayMessage(userInput, "user");
    // Clear input box
    document.getElementById("userInput").value = "";
}
// Display message in the monitor
function displayMessage(message, sender, isHTML = false){
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    
    const textElement = document.createElement("span");
    textElement.textContent = message;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.addEventListener("click", () => {
        messageElement.remove(); // Delete message
    });

    messageElement.appendChild(textElement);
    messageElement.appendChild(deleteBtn);
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Automatic scroll bottom
}
// Listening input box click things
document.getElementById("userInput").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});

document.getElementById("sendBtn").addEventListener("click", sendMessage);