import {useState} from "react";
import {Link} from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Axios from "axios";





const Register = () => {


  const [name,setName]=useState("");

  const [Account,setAccount]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post("http://localhost:5000/api/users/Register", {
      name: name,
    Account:Account,
    email:email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

    
          <form action="POST" >
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
                onChange={(e)=>{
                  setName(e.target.value);
                }}
                placeholder="name"
                name="firstName"
           
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Account"
                placeholder="Account"
                onChange={(e)=>{
                  setAccount(e.target.value);
                }}
                name="Account"
           
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
              
                name="email"
          
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
           
                onChange={(e)=>{
                  setPassword(e.target.value);
                }}
         
                name="password"
        
                sx={{ gridColumn: "span 4" }}
              />
            
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
             <Link to="/dashboard"> <Button type="submit" color="secondary" variant="contained" onClick={register} >
                Create New User
              </Button></Link>
            </Box>
           
          </form>
        
    
    </Box>
  );
};




export default Register;
