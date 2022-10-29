import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import classes from "./ChatContainer.module.css";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className={classes.container}>
          <div className={classes.chatheader}>
            <div className={classes.userdetails}>
              <div className={classes.avatar}>
                <img
                  src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiMwMGEwOGQ7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojQzc4NzNBOyIvPjxwYXRoIGQ9Ik02MS4xMSwyMDUuNTlsMy40OSwzLjY5LTYuMjYsNi42QTExNS40NSwxMTUuNDUsMCwwLDAsNzIsMjIyLjUxdi0yMmExMTUuMTksMTE1LjE5LDAsMCwwLTEwLjg1LDUuMVoiIHN0eWxlPSJmaWxsOiNlMDAwY2I7Ii8+PHBhdGggZD0iTTkzLjI0LDIyOC44NVYxOTlsLTQtNEExMTQuNDMsMTE0LjQzLDAsMCwwLDcyLDIwMC40OXYyMmExMTQuNDMsMTE0LjQzLDAsMCwwLDIxLjI4LDYuMzRaIiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Im0xNTkgMjIyLjUxdi0yMmExMTQuNjMgMTE0LjYzIDAgMCAwLTE3LjI1LTUuNTFsLTQgNHYyOS44NmExMTQuMTYgMTE0LjE2IDAgMCAwIDIxLjI1LTYuMzV6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Im0xNjkuODkgMjA1LjU5LTMuNDkgMy42OSA2LjI2IDYuNmExMTUuNDUgMTE1LjQ1IDAgMCAxLTEzLjY2IDYuNjN2LTIyYTExNS4xOSAxMTUuMTkgMCAwIDEgMTAuODUgNS4xeiIgc3R5bGU9ImZpbGw6I2UwMDBjYjsiLz48cGF0aCBkPSJNMTE1LjUsMjE5LjYyQTI4LjUsMjguNSwwLDAsMSw4Ny4yNSwxOTVjMi45My0uNzQsNS45Mi0xLjM2LDguOTQtMS44N2ExOS40MSwxOS40MSwwLDAsMCwzOC42MiwwYzMsLjUxLDYsMS4xMyw4Ljk0LDEuODdhMjguNDksMjguNDksMCwwLDEtMjguMjUsMjQuNjNaIiBzdHlsZT0iZmlsbDojZmZjZTFjOyIvPjxwYXRoIGQ9Im01Mi4xMDcgNTcuMjkzYy0xLjM0MTEgMTQuODM5LTMuODcwNyA1Mi43NzEgMS4zMTQ1IDcyLjcxNS0wLjY3NTcyLTQzLjgyOSAxMi4zODktNzAuMTc3IDYyLjA3OC03MC4xODcgNDkuNjg5IDAuMDEwMDYxIDYyLjc1NCAyNi4zNTkgNjIuMDc4IDcwLjE4NyA1LjE4NTItMTkuOTQ0IDIuNjU1Ni01Ny44NzYgMS4zMTQ1LTcyLjcxNWgtNjMuMzkzLTYzLjM5M3oiIHN0eWxlPSJmaWxsOiM1M2ZmZmY7Ii8+PHBhdGggZD0ibTUyLjMzOSAzMC42MjljLTEuMzgyNSAyNC40NDgtMi4xMjE2IDQ1LjkwNS0xLjQ0OTcgNjYuNTE3IDkuNDY0My00OC4zMDQgMTEyLjc3LTU0LjkxNiAxMjkuMjIgMCAwLjY3MTkxLTIwLjYxMi0wLjM3OTgtNDcuMjU2LTEuNDkyOC02Ni41MTctMzIuMjQxIDE0LjI5Ni05MS4zNDYgMTguODYxLTEyNi4yOCAweiIgc3R5bGU9ImZpbGw6IzUzZmZmZjsiLz48cGF0aCBkPSJtMTE1LjUgMjQuOTJjLTIyLjI1IDAtNDQuNSA0LjIyOTYtNTYuNzIgMTIuNjktMy4zMiAyLjMtNS4wNjAyIDYuNDM5Mi01LjU5MDMgMTAuMjY5LTAuNDUyNzUgMy4yMy0wLjg0MDQzIDYuNzU2MS0xLjE3ODUgMTAuNDYxaDEyNi45OGMtMC4zMzcwNC0zLjcwNDctMC43MjQ5Mi03LjIzMDYtMS4xNzc1LTEwLjQ2MS0wLjUzMDA5LTMuODMwMS0yLjI2OTctNy45OTkyLTUuNTg5Ny0xMC4yNjktMTIuMjItOC40NjAxLTM0LjQ3LTEyLjY5LTU2LjcyLTEyLjY5eiIgc3R5bGU9ImZpbGw6bm9uZTsiLz48cGF0aCBkPSJtNzYuNTIxIDM5LjEzOWMyMS4yMzMgMy4zOTY1IDMzLjExNi0xMy4zOTIgMzcuNTktMzEuNzIgNC4zNjE0IDE3LjE1OCAxNC4xNzUgMzQuOTY4IDM2LjU3NyAzMS41ODQtMzMuOTIxIDIwLjU5NC01Ny42NDYgMTEuNTk0LTc0LjE2NyAwLjEzNDV6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im04My41MjcgMTAzLjk4djEwaDEwdi0xMGgtMTB6bTUzLjk0NSAwdjEwaDEwdi0xMGgtMTB6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im01Ni42MjEgOTQuOTA2djExLjY4OGg1LjM0MTh2Ni40OTIyaDUuMzQxOHY2LjEwNTVoNS4zMjIzdjYuMjMyNGgyNi44NDZ2LTYuMjMyNGg1LjMwNDd2LTYuMTA1NWg1LjE0NDV2LTYuMDAzOWgxMS4xNTR2Ni4wMDM5aDUuMTQ0NnY2LjEwNTVoNS4zMDY2djYuMjMyNGgyNi44NDZ2LTYuMjMyNGg1LjMyMDN2LTYuMTA1NWg1LjM0Mzh2LTYuNDkyMmg1LjM0MTh2LTExLjY4OHoiIHN0eWxlPSJmaWxsOiMwMDA7Ii8+PHBhdGggZD0ibTY3LjM4NyAxMDAuNjV2NS45Mzk0aDUuMTk5MnYtNS45Mzk0em01LjE5OTIgNS45Mzk0djYuNDkyMmg1LjQyMzh2LTYuNDkyMnptNS40MjM4IDBoNS4xOTkydi01LjkzOTRoLTUuMTk5MnptNS4xOTkyIDB2Ni40OTIyaDUuNDI1OHYtNi40OTIyem01LjQyNTggNi40OTIydjYuMTA1NWg1LjE0MjZ2LTYuMTA1NXptLTEwLjYyNSAwdjYuMTA1NWg1LjE0NDV2LTYuMTA1NXptNDguMjgxLTEyLjQzMnY1LjkzOTRoNS4xOTkydi01LjkzOTR6bTUuMTk5MiA1LjkzOTR2Ni40OTIyaDUuNDIzOHYtNi40OTIyem01LjQyMzggMGg1LjE5OTJ2LTUuOTM5NGgtNS4xOTkyem01LjE5OTIgMHY2LjQ5MjJoNS40MjU4di02LjQ5MjJ6bTUuNDI1OCA2LjQ5MjJ2Ni4xMDU1aDUuMTQyNnYtNi4xMDU1em0tMTAuNjI1IDB2Ni4xMDU1aDUuMTQ0NXYtNi4xMDU1eiIgc3R5bGU9ImZpbGw6I2ZmZjsiLz48cGF0aCBkPSJtMTIzLjA3IDE1NC4wNWExMC42MSAxMC42MSAwIDAgMS0xNSAwLjE0bC0wLjE0LTAuMTQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo2LjNweDtzdHJva2U6IzAwMDsiLz48cGF0aCBkPSJtMTIwLjEgMTQyLjIyIDAuMTktMC4xMWMzLTEuODcgNS40NS0yLjQgNy4zLTEuNDYgMi4xNSAxLjEgMy4xMiAzLjg0IDQuODQgNS41YTUuMTggNS4xOCAwIDAgMCA2LjY4IDAuNzNtLTI4LjIxLTQuNjYtMC4xOS0wLjExYy0zLTEuODctNS40NS0yLjQtNy4zLTEuNDYtMi4xNSAxLjEtMy4xMiAzLjg0LTQuODQgNS41YTUuMTggNS4xOCAwIDAgMS02LjY4IDAuNzMiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo1Ljk5OThweDtzdHJva2U6IzRkNGQ0ZDsiLz48L3N2Zz4=`}
                />
              </div>
              <div className={classes.username}>
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className={classes.chatmessages}>
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`${classes.message} ${
                      message.fromSelf ? classes.sended : classes.recieved
                    }`}
                  >
                    <div className={classes.content}>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
