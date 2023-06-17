import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faComment } from '@fortawesome/free-solid-svg-icons';
import { getMe } from "../../Api/usersApi";
import "../../Styles/index.css";

const socketUrl = "http://localhost:3000";

function LiveChat({ videoId }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    socketRef.current = io(socketUrl, {
      path: "/socket.io",
      withCredentials: true,
    });

    const socket = socketRef.current;

    if (user) {
      socket.emit("joinTchat", videoId, user);
    }

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("userJoined", (users) => {
      setConnectedUsers(users);
    });

    socket.on("userLeft", (users) => {
      setConnectedUsers(users);
    });

    return () => {
      if (user) {
        socket.emit("leaveTchat", videoId);
      }
      socket.disconnect();
    };
  }, [user, videoId]);

  const handleNewMessageSubmit = (event) => {
    event.preventDefault();

    if (draftMessage !== "" && socketRef.current && user) {
      socketRef.current.emit("message", {
        videoId: videoId,
        author: user.name,
        content: draftMessage,
        timestamp: new Date().toISOString(),
      });
      setDraftMessage("");
    }
  };

  const [Menu, setMenu] = useState(false);

  return (
    <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-xl h-96 relative flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Chat</h2>
        <div className="flex items-center">
          {!Menu ? (
            <>
              <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-blue-500 cursor-pointer" onClick={() => setMenu(!Menu)} />
              <span className="text-lg ml-2 font-semibold text-blue-500 cursor-pointer" onClick={() => setMenu(!Menu)}>
                {connectedUsers.length}
              </span>
            </>
          ) : (
            <FontAwesomeIcon icon={faComment} className="h-6 w-6 text-blue-500 cursor-pointer" onClick={() => setMenu(!Menu)} />            
          )}
        </div>
      </div>

      {!Menu ? (
        <div className="flex flex-col flex-1">
          <ul className="message-list overflow-auto flex-1 mb-1 bg-gray-50 p-2 rounded-md" style={{maxHeight: "250px", overflowY: "auto"}}>
            {messages.map((message, index) => (
                <li key={index} className="mb-2">
                    <p className="text-sm">
                        <span className="font-semibold mr-1">{message.author}:</span>
                        {message.content}
                    </p>
                </li>
              ))}
          </ul>

          {user ? (
            <form className="flex border-t border-gray-300 pt-3" onSubmit={handleNewMessageSubmit}>
              <input
                className="flex-1 p-2 outline-none"
                type="text"
                placeholder="Envoyer un message"
                value={draftMessage}
                onChange={(e) => setDraftMessage(e.target.value)}
              />
              <button className="bg-blue-500 text-white rounded-md px-4" type="submit">
                Envoyer
              </button>
            </form>
          ) : (
            <div className="flex border-t border-gray-300 pt-3 px-2 text-gray-500">
              Connectez-vous pour envoyer des messages
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-auto">
          <ul className="p-2">
            {connectedUsers.map((user, index) => (
              <li key={index} className="mb-2">
                <p className="text-sm font-semibold">{user.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LiveChat;
