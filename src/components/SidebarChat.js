import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import db from "../firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleCreateChat = () => {
    const roomName = prompt("Enter name for chat");
    if (roomName) {
      if (roomName.trim().length === 0) return;

      db.collection("rooms").add({
        name: roomName.trim(),
      });
    }
  };

  return !addNewChat ? (
    <NavLink to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {messages.length === 0 ? (
            <p style={{ color: "#adadad", fontSize: "12px" }}>
              No Conversation
            </p>
          ) : (
            <p>{messages[0]?.message}</p>
          )}
        </div>
      </div>
    </NavLink>
  ) : (
    <div className="sidebarChat" onClick={handleCreateChat}>
      <h2>Add a new chat</h2>
    </div>
  );
}

export default SidebarChat;
