import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Robot from "../assets/robot.gif";
import classes from "./Welcome.module.css";

const Welcome = (currentUser) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <div className={classes.container}>
      <img src={Robot} alt="Robot" />
      <p>
        Welcome, Message to strangers
      </p>
      <p className={classes.subtext}>You're now chatting with a random stranger.</p>
      <p className={classes.subtext}>Please select a chat to start messaging.</p>
    </div>
  );
};

export default Welcome;
