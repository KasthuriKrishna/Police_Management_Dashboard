import React, { createContext, useContext, useEffect, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const sendMessage = (msg) => {
    setMessage((prevMessages) => [...prevMessages, msg]);
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(message));
  }, [message]);

  const clearMessages = () => {
    localStorage.removeItem('messages'); // Clear the messages from local storage
    setMessage([]); // Clear the messages state
  };

  return (
    <MessageContext.Provider value={{ message, sendMessage, clearMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
