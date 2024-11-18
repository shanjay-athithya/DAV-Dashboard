import React from "react";
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
} from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LinePlot = ({ data }) => {
  // Preparing data for the chart
  const chartData = {
    labels: data.map((track) => track.release_date), // X-axis as release dates
    datasets: [
      {
        label: "Valence over Time", // Chart label for valence
        data: data.map((track) => track.valence), // Y-axis as valence (emotion parameter)
        fill: false, // No fill below the line
        borderColor: "rgba(75, 192, 192, 1)", // Line color (emotional tone)
        tension: 0.1, // Smoothness of the line
        borderWidth: 2, // Line width
        pointRadius: 2, // Set point radius to 2 for smaller dots
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        datalabels: {
          display: false, // Disable datalabels
        },
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Valence Over Time (Emotion)",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Valence: ${context.raw.toFixed(2)}`; // Display valence value on tooltip
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Release Date",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Valence",
        },
        min: 0,
        max: 1, // Valence usually ranges from 0 to 1
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-black">
        Valence Over Time (Emotion)
      </h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LinePlot;
