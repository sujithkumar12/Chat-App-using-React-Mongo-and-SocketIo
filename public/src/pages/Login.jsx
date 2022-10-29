import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import Logo from "../assets/logo.png";
import MainLogo from "../assets/acc.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

function Login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(() => {
  //   if (localStorage.getItem("chat-app-user")) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
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
          <div className={classes.mainlogo}>
            <img src={MainLogo} alt="" />
          </div>
          <div className={classes.brand}>
            <img src={Logo} alt="" />
            <h2>Chat App</h2>
          </div>
          <TextField
            sx={{ m: 1, width: "100%" }}
            name="username"
            label="Username"
            type="text"
            onChange={(e) => handleChange(e)}
            min="3"
            inputProps={{ style: { fontFamily: "poppins" } }}
            InputLabelProps={{ style: { fontFamily: "poppins" } }}
          />
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel sx={{ fontFamily: "poppins" }}>Password</InputLabel>
            <OutlinedInput
              type={isPasswordShown ? "text" : "password"}
              onChange={(e) => handleChange(e)}
              name="password"
              inputProps={{ style: { fontFamily: "poppins" } }}
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
          <button type="submit" className={classes.button}>
            Login
          </button>
          <span>
            Need an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
