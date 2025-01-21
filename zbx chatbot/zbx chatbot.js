const messagesContainer = document.getElementById("messages");

// 預設回答邏輯
const responses ={
    "翔翔你好呀": "你好呀，我的綸寶~",
    "你在做什麼呢": "我在打傳說~",
    "我人不舒服": "你還好嗎?",
    "我想你了": "我也想你了，綸寶~",
    "什麼時候才可以見到你啊": "很快呀，只要你回來宿舍，我沒有比賽的時候就可以見到我了",
    "翔寶~": "怎麼了呀~",
    "我愛你": "我也愛你，我的綸綸寶貝",
    "default": "抱歉，我不明白您的問題",
};

// 發送訊息函數
function sendMessage(){
    const userInput = document.getElementById("userInput").value .trim();
    if(userInput === "") return;

    // 顯示使用者訊息
    displayMessage(userInput, "user");

    // 取得機器人回應
    const botResponse = getBotResponse(userInput);

    // 模擬機器人延遲回應
    setTimeout(() => {
        displayMessage(botResponse, "bot", true);
    }, 500);

    // 清空輸入框
    document.getElementById("userInput").value = "";
}

// 顯示訊息在畫面上
function displayMessage(message, sender, isHTML = false){
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    if(typeof message === "function"){
        message = message();
    }
    if(isHTML){
        messageElement.innerHTML = message;
    }
    else{
        messageElement.textContent = message;
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; //自動捲動到底部
}

// 根據使用者輸入取得回應
function getBotResponse(input){
    return responses[input] || responses["default"];
}
// 監聽輸入框按鍵事件
document.getElementById("userInput").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});