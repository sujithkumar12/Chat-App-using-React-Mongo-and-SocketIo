import React, { useState } from "react";
import classes from "./ChatInput.module.css";
import { BiSend } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.buttoncontainer}>
        <div className={classes.emoji}>
          <BsEmojiSmile onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
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
