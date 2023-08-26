import { Box, Button, Icon, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
//import EmailIcon from "@mui/icons-material/Email";
//import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
//import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { ModeStandbySharp, MoneyOutlined, MoneyRounded, MoneySharp } from "@mui/icons-material";
import React, { useState } from 'react';
import { Input } from '@mui/material';
import Sidebar from "../global/Sidebar";
//import Topbar from "../global/Topbar";
import BitcoinChart from "../../components/f";
import Barchart from "../../components/BarChart";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';



const Dashboard = () => {
  
  const [initialBalance, setInitialBalance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/my-flask-api?initial_balance=${initialBalance}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        // do something with the response data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };





  
  const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false); // Add state for modal visibility

    const handleRunResult = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/get_result'); // Update the URL to match your Flask route
            setResult(response.data.result);
            setShowModal(true); // Show modal on successful result retrieval
        } catch (error) {
            console.error('Error retrieving result:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal when close button is clicked
    };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const [isSidebar, setIsSidebar] = useState(true);
  
    const [amount, setAmount] = useState("");
  
    const handleAmountChange = event => {
      setAmount(event.target.value);
    };
    


  return (

    
    
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
   

    <Box m="60px">
      
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />


        
        <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleRunResult}
            >
              <TrafficIcon sx={{ mr: "10px" }} />
              Start Trading
            </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box 
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Input
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.primary[400],
              color: colors.grey[200],
              fontSize: "35px",
              padding: "30px 30px",
              border: "#E2AC0D",
              borderRadius: "10px",
              textAlign: "center"
            }}

            placeholder="Write the amount to start trading $"
            value={amount}
            onChange={handleAmountChange} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361 $"
            subtitle="Your amount in dollars"
            progress="0.75"
            increase="+14%"
            icon={<MoneySharp
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225$"
            subtitle="Your gain in dollars since the last trading process"
            fontSize="5px"
            progress="0.50"
            increase=""
            icon={<MoneyOutlined
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441$"
            subtitle=" Your total gain "
            progress="0.30"
            increase="+5%"
            icon={<ModeStandbySharp
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>


        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
            
          </Box>
          <Box
         
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 30px" }}
          >
            BITCOIN VALUE IN DOLLARS          </Typography>
          <Box height="250px" mt="-20px">
            <Barchart isDashboard={true} />
          </Box>
        </Box>
       
       
          

      
        
        </Box>

      </Box>
    </Box>
  </div>
  

);
};


export default Dashboard;