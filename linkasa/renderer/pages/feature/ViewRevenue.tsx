import React from "react";
import { Container, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions 
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const ViewRevenue = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const revenues = Array.from({ length: 12 }, () => 
  Math.floor(Math.random() * (2000000 - 200000 + 1)) + 200000
);


  const expenses = Array.from({ length: 12 }, () => 
  Math.floor(Math.random() * (2000000 - 200000 + 1)) + 200000
);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Airport Revenue",
        data: revenues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Airport Expenses",
        data: expenses,
        fill: true,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "category",
        labels: months,
      },
    },
  };


  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2,
        mb: 4,
      }}
    >
      <Typography variant="h5" color="initial">
        Airport Revenue
      </Typography>
      <Line data={data} options={options} width={800} height={300} />
      <Typography variant="h5" color="initial">
        Airport Expenses
      </Typography>
      <Line data={data} options={options} width={800} height={300} />
    </Container>
  );
};

export default ViewRevenue;
