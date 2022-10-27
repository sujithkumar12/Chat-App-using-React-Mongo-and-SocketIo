import React from "react";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import classes from "./Logout.module.css";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button className={`${classes.button} ${props.className}`} onClick={handleClick}>
      <FiLogOut />
    </button>
  );
};

export default Logout;
