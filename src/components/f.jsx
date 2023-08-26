import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const BitcoinChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://api.coinbase.com/v2/prices/BTC-USD/spot'
      );
      setData(data => [...data, result.data.data.amount]);
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => ''),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Bitcoin Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default BitcoinChart;
