import React, { useState } from 'react';

const LiveChat = () => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // L'envoi et la récupération des messages seront gérés par une API ultérieurement
  };

  return (
    <div className="live-chat flex flex-col h-full">
      <div className="messages flex-1 overflow-y-auto">
        {/* Les messages seront récupérés via une API ultérieurement */}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="Votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default LiveChat;
