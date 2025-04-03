const messagesContainer = document.getElementById("messages");

// default response logic
const responses = {
    "Hello Songsong~": "Hello, my Xuanxuan~",
    "What are you doing now?": "I am traing now~",
    "I am so miss you": "Mee too, my Lunlun~",
    "I am uncomfortable": "Are you okay? Do you want me to take you to the doctor?",
    "No, just rest": "Okay, if you need anything, just let me know~",
    "What time do you updating your tiktok?": "Um... I have no time, I recently have a lot of training",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "default": "Sorry, I don't understand your question"
}
// Send Message function
function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput === "") return;

    // Display user message
    displayMessage(userInput, "user");

    // Get bot response
    const botResponse = getBotResponse(userInput);

    // Simulate bot response delay
    setTimeout(() => {
        displayMessage(botResponse, "bot", true);
    }, 500);

    // Clear input box
    document.getElementById("userInput").value = "";
}

// Display message on screen
function displayMessage(message, sender, isHTML = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    if (typeof message === "function") {
        message = message();
    }
    if (isHTML) {
        messageElement.innerHTML = message;
    } else {
        messageElement.textContent = message;
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // auto scroll to bottom
}
// Get response based on user input
function getBotResponse(input) {
    return responses[input] || responses["default"];
}
// Listen for input box key events
document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
