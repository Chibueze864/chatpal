"use client"

import { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simulate a response (you'd replace this with actual API call)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thanks for your message. We'll get back to you soon!", sender: 'agent' }]);
      }, 1000);
    }
  };

  return (
    <div id="chat" className="section relative pb-20 bg-white ">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap flex-row -mx-4 justify-center">
          <div className="max-w-full px-4 w-full lg:w-8/12">
            <div className="bg-gray-50 border-b border-gray-100 w-full p-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
              {/* Chat header */}
              <header className="text-center mx-auto mb-12 lg:px-20">
                <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
                  <span className="font-light">Chat with</span> Us
                </h2>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 60" style={{margin: '0 auto', height: '35px'}} xmlSpace="preserve">
                  <circle cx="50.1" cy="30.4" r="5" className="stroke-primary" style={{fill: 'transparent', strokeWidth: 2, strokeMiterlimit: 10}}></circle>
                  <line x1="55.1" y1="30.4" x2="100" y2="30.4" className="stroke-primary" style={{strokeWidth: 2, strokeMiterlimit: 10}}></line>
                  <line x1="45.1" y1="30.4" x2="0" y2="30.4" className="stroke-primary" style={{strokeWidth: 2, strokeMiterlimit: 10}}></line>
                </svg>
                <p className="text-gray-600 leading-relaxed font-light text-xl mx-auto pb-2">
                  Have questions? Chat with our support team.
                </p>
              </header>

              {/* Chat messages */}
              <div className="mb-6 h-96 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-black text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="w-full leading-5 relative py-3 px-5 rounded text-gray-800 bg-white border-b border-gray-100 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                  placeholder="Type your message..."
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="py-2.5 px-10 inline-block text-center leading-normal text-gray-100 bg-black border border-black hover:text-white hover:ring-0 focus:outline-none focus:ring-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" className="inline-block mr-1" fill="currentColor" viewBox="0 0 512 512">
                      <rect x="48" y="96" width="416" height="320" rx="40" ry="40" style={{fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px'}}/>
                      <polyline points="112 160 256 272 400 160" style={{fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px'}}/>
                    </svg>
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;