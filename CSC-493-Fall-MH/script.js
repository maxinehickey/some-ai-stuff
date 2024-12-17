const toggleMenuClicked = () => {
    const body = document.body;
    const openIcon = document.getElementById("open-icon");
    const closeIcon = document.getElementById("close-icon");
  
    body.classList.toggle("open");
  
    if (body.classList.contains("open")) {
      openIcon.style.display = "none";
      closeIcon.style.display = "flex";
    } else {
      openIcon.style.display = "flex";
      closeIcon.style.display = "none";
    }
  };
  



function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatContainer = document.getElementById('chat-container');

    // Display user message
    chatContainer.innerHTML += `<p>You: ${userInput}</p>`;

    // Replace this with your chatbot logic
    const chatbotResponse = getChatbotResponse(userInput);

    // Display chatbot response
    chatContainer.innerHTML += `<p>Chatbot: ${chatbotResponse}</p>`;

    // Clear user input
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getChatbotResponse(userInput) {
    // Replace this function with your actual chatbot logic
    // You might use an external API or library for chatbot functionality
    // For simplicity, we'll return a simple response here
    if (userInput.toLowerCase().includes("hello")) {
        return "Hi there! How can I assist you?";
    } else {
        return "I'm not sure how to respond to that.";
    }
}

