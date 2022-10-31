import React, { useState } from "react";
import classes from "./ChatInput.module.css";
import { BiSend } from "react-icons/bi";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.inputcontainer} onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className={classes.submit}>
          <BiSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
