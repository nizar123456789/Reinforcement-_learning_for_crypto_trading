import { Box, Button, TextField } from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React from 'react';
import {Link}from  "react-router-dom";





const Login = () => {
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setName(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }


  async function handleSubmit(event) {
    event.preventDefault();
  
    const response = await fetch("http://localhost:5000/api/users/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });

    if (response.ok) {
      navigate("/dashboard");
      console.log("correct password "); // Redirect to another page
    } else {
      setError("Invalid username or password");
    }
  }


  const isNonMobile = useMediaQuery("(min-width:600px)");

  
  return (
    
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

    
          <form onSubmit={handleSubmit} >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={handleUsernameChange}
                placeholder="name"
                name="firstName"
           
                sx={{ gridColumn: "span 4" }}
              />
              
             
              
              
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
           
                onChange={handlePasswordChange}
         
                name="password"
        
                sx={{ gridColumn: "span 4" }}
              />
            
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained"  >
                Login
              </Button>
              <p>{error}</p>

              
            
            </Box>
            <Link to="/register"> <Button type="submit" color="secondary" variant="contained"  >
                you dont have an account !!
              </Button></Link>
           
          </form>
        
    
    </Box>
  );
};




export default Login;