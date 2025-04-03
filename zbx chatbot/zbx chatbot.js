const messagesContainer = document.getElementById("messages");

// 預設回答邏輯
const responses ={
    "翔翔你好呀": "你好呀，我的軒寶~",
    "Hello, Xiangxiang~": "Hello, My Lunlun~",
    "Hello, Xiangxiang": "Hello, My Lunlun~",
    "你在做什麼呢": "我在打傳說~",
    "What are you doing now":"I am playing Area of valor~",
    "我人不舒服": "你還好嗎?要不要我帶你去看醫生",
    "I am uncomfortable": "Are you okay? Do you want me to take you to the doctor?",
    "不用了，休息就可以了": "那好，要是需要什麼就跟我說唷~",
    "No, just rest": "Okay, if you need anything, just let me know~",
    "我想你了": "我也想你了，綸寶~",
    "I miss you": "I miss you too, Lunlun~",
    "什麼時候才可以見到你啊": "很快呀，只要你回來宿舍，我沒有比賽的時候就可以見到我了",
    "When can I see you": "Very soon, as long as you come back to the dormitory, you can see me when I don't have a match",
    "翔寶~": "怎麼了呀~",
    "Xiangbao~":"What's wrong~",
    "翔翔~": "怎麼了呀~",
    "Xiangxiang": "What's wrong~",
    "我愛你": "我也愛你，我的綸綸寶貝",
    "I love you": "I love you too, My Lunlun baby",
    "還記得我送你的史迪奇嗎": "當然記得呀，我把他收在宿舍陪著我",
    "Do you remember the Stitch I gave you?": "Of course I remember, I keep him in the dormitory with me",
    "你有沒有想我": "有啊，我每天都想你",
    "Do you miss me?": "Yes, I think of you every day",
    "default": "Sorry, I don't understand your question"
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