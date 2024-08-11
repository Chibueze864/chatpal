"use client"
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const ChatComponent = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatboxRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  // Initialize Gemini
  const genAI = new GoogleGenerativeAI("AIzaSyCbYe-M5c_qOmiTr4K9UlqJe4o004F3EUE" );

  // Simulated knowledge base (replace with your actual data)
  
  useEffect(() => {
    fetch('../customer_support_tickets.txt')
      .then(response => response.text())
      .then(data => {
        const entries = data.split('\n'); // Assuming each entry is on a new line
        setKnowledgeBase(entries);
      });
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      addUserMessage(userInput);
      await respondToUser(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const addUserMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { type: 'user', content: message }]);
  };

  const addBotMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { type: 'bot', content: message }]);
  };

  const respondToUser = async (userMessage) => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // Implement basic RAG
      const relevantInfo = await retrieveRelevantInfo(userMessage);
      const prompt = `Please answer the user's question: "${userMessage}"  and remember the previous history of: "${messages.join(",")}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      addBotMessage(text);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      addBotMessage("Sorry, I'm having trouble responding right now. Please try again later.");
    }
    setIsLoading(false);
  };

  const retrieveRelevantInfo = async (query) => {
    // In a real-world scenario, you'd use a vector database for efficient similarity search
    // For this example, we'll use a simple keyword matching approach
    const relevantPieces = knowledgeBase.filter(piece => 
      query.toLowerCase().split(' ').some(word => piece.toLowerCase().includes(word))
    );
    return relevantPieces.join(" ");
  };

  return (
    <div >
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-10">
        <button onClick={toggleChatbox} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span className="hidden sm:inline">Chat with Support</span>
        </button>
      </div>
      {isChatboxOpen && (
        <div style={{marginBottom:"10vh"}}  className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-96 max-w-full z-20">
          <div className="bg-white shadow-md rounded-t-lg sm:rounded-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Diet/Fitness Customer Support</p>
              <button onClick={toggleChatbox} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div ref={chatboxRef} className="p-4 h-64 sm:h-80 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <p className={`${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg py-2 px-4 inline-block max-w-[75%]`}>
                    {message.content}
                  </p>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <p className="text-gray-500">Support is typing...</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;