// MessageContext.js
import React, { createContext, useContext, useState } from 'react';

const MessageContext2 = createContext();

export const useMessage2 = () => useContext(MessageContext2);

export const MessageProvider2 = ({ children }) => {
  const [message2, setMessage2] = useState([]);

  const addMessage2 = (msg) => {
    setMessage2((prevMessage)=>[...prevMessage,msg]);
  };
  console.log(message2);
  return (
    <MessageContext2.Provider value={{ message2, addMessage2 }}>
      {children}
    </MessageContext2.Provider>
  );
};