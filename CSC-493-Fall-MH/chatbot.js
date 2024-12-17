function chatbot(input) {
    input = input.toLowerCase();

    switch (input) {
        case "hello":
            return "Hi there! How can I assist you today?";
        case "how are you":
            return "I'm just a computer program, but thanks for asking!";
        case "what's your name":
            return "I'm a chatbot. You can call me ChatGPT.";
        case "bye":
            return "Goodbye! Feel free to return if you have more questions.";
        default:
            return "I'm not sure how to respond to that. Try asking something else.";
    }
}

// Chat loop
while (true) {
    const userInput = prompt("You: ");
    if (userInput === null) {
        break; // Exit the chat loop if the user cancels the prompt.
    }

    const response = chatbot(userInput);
    console.log("Chatbot:", response);
}
