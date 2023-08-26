import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

const Barchart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [btcData, setBtcData] = useState([]);

  useEffect(() => {
    const fetchBtcData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=30"
      );
      const data = await response.json();

      const btcData = data.Data.Data.map((item) => ({
        x: new Date(item.time * 1000).toISOString(),
        y: item.high,
      }));

      setBtcData(btcData);
    };

    fetchBtcData();
    const interval = setInterval(fetchBtcData, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveLine
      data={[
        {
          id: "bitcoin",
          data: btcData,
        },
      ]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      xScale={{ type: "time", format: "%Y-%m-%dT%H:%M:%S.%LZ", precision: "minute" }}
      xFormat="time:%H:%M"
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%H:%M",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Time (GMT)", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Price (USD)", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      role="application"
      ariaLabel="Bitcoin value over the last 30 minutes"
    />
  );
};

export default Barchart;
