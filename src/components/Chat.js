import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  SearchOutlined,
  MoreVert,
  InsertEmoticon,
} from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Chat.css";
import firebase from "firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      const unsubscribe = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          );
        });

      return () => unsubscribe();
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (input.trim().length === 0) return false;

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input.trim(),
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {/* <p>
              Last seen at{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </p> */}
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`chat__message ${
              msg.data.name === user.displayName ? "message__receive" : ""
            }`}
          >
            {msg.data.message}
            <span className="chat__name">{msg.data.name}</span>
            {msg.data.timestamp && (
              <span className="chat__timestamp">
                {new Date(msg.data.timestamp?.toDate()).toLocaleString()}
              </span>
            )}
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon className="emoticon" />

        <input
          type="text"
          className="chat__input"
          placeholder="write your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="chat__sendBtn">
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
