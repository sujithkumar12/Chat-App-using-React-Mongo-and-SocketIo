import { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "./Contacts";
import { io } from "socket.io-client";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import classes from "../pages/Chat.module.css";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#ccc" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ contacts, currentUser, changeChat }) => {
  const [open, setOpen] = useState(false);
//   const socket = useRef();
//   const navigate = useNavigate();
//   const [contacts, setContacts] = useState([]);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!localStorage.getItem("chat-app-user")) {
//         navigate("/login");
//       } else {
//         setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
//         setIsLoaded(true);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (currentUser) {
//       socket.current = io(host);
//       socket.current.emit("add-user", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//       setContacts(data.data);
//     };
//     if (currentUser) {
//       fetchData();
//     }
//   }, [currentUser]);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <Contacts
        open={open}
        contacts={contacts}
        currentUser={currentUser}
        changeChat={changeChat}
      />
    </>
  );
};

export default Burger;
