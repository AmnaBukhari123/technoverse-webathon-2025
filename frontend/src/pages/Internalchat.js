import React, { useState, useEffect } from 'react';
import './Internalchat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const departments = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Engineering' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Sales' },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeDept, setActiveDept] = useState(null);
  const [userName, setUserName] = useState('John Doe');

  useEffect(() => {
    socket.on('receive-message', (message) => {
      if (message.department === activeDept) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
  }, [activeDept]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        department: activeDept,
        text: newMessage,
        user: userName,
        timestamp: new Date(),
      };

      socket.emit('send-message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  const handleDeptSelect = (deptId) => {
    setActiveDept(deptId);
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <h3>Departments</h3>
        <ul>
          {departments.map((dept) => (
            <li
              key={dept.id}
              className={activeDept === dept.id ? 'active' : ''}
              onClick={() => handleDeptSelect(dept.id)}
            >
              {dept.name}
            </li>
          ))}
        </ul>
      </aside>

      <section className="chat-window">
        <div className="chat-header">
          {activeDept ? `Chat: ${departments.find((d) => d.id === activeDept).name}` : 'Choose a Department'}
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user === userName ? 'sent' : 'received'}`}>
              <div className="message-meta">
                <span className="message-user">{msg.user}</span>
                <span className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>

        {activeDept && (
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Chat;
