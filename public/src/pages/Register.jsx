import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const emailValidation = (email) => {
    const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return expression.test(String(email).toLowerCase())
}

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 4) {
      toast.error(
        "Username should be greater than 4 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (!emailValidation(values.email)) {
      toast.error("Invalid Email", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setavatar");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <>
      <div className={classes.formcontainer}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className={classes.brand}>
            <img src={Logo} alt="" />
            <h2>Chat App</h2>
          </div>
          <TextField
            sx={{ m: 1, width: "25ch" }}
            name="username"
            label="Username"
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            sx={{ m: 1, width: "25ch" }}
            name="email"
            label="Email"
            type="email"
            onChange={(e) => handleChange(e)}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={isPasswordShown ? "text" : "password"}
              onChange={(e) => handleChange(e)}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={isPasswordShown ? "text" : "password"}
              onChange={(e) => handleChange(e)}
              name="confirmPassword"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <button type="submit" className={classes.button}>
            Register
          </button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
