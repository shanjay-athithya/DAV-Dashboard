"use client";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  MatrixController,
  MatrixElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  ChartDataLabels
);

// Helper: Calculate Correlation Coefficient
const calculateCorrelation = (x, y) => {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  const numerator = x.reduce(
    (sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY),
    0
  );
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) *
      y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0)
  );
  return numerator / denominator;
};

// Calculate Correlation Matrix
const getCorrelationMatrix = (data, keys) => {
  const matrix = keys.map((key1) =>
    keys.map((key2) => {
      const x = data.map((item) => item[key1]);
      const y = data.map((item) => item[key2]);
      return calculateCorrelation(x, y);
    })
  );
  return matrix;
};

export default function CorrelationMatrix({ data }) {
  const [matrixData, setMatrixData] = useState(null);

  useEffect(() => {
    const keys = [
      "popularity",
      "danceability",
      "acousticness",
      "energy",
      "instrumentalness",
      "liveness",
      "valence",
      "loudness",
      "speechiness",
      "tempo",
    ];
    const matrix = getCorrelationMatrix(data, keys);
    setMatrixData({ keys, matrix });
  }, [data]);

  if (!matrixData) return <p>Loading...</p>;

  const { keys, matrix } = matrixData;

  const chartData = {
    datasets: [
      {
        label: "Correlation Matrix",
        data: matrix.flatMap((row, i) =>
          row.map((value, j) => ({
            x: keys[j],
            y: keys[i],
            v: value,
          }))
        ),
        backgroundColor: (context) => {
          const value = context.raw.v;
          const intensity = Math.abs(value) * 255;
          return `rgba(${value > 0 ? intensity : 0}, ${
            value < 0 ? intensity : 0
          }, 100, 0.85)`; // Smooth gradient
        },
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.1)", // Subtle borders
        width: 30, // Fixed cell width
        height: 30, // Fixed cell height
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (items) => `${items[0].raw.x} vs ${items[0].raw.y}`,
          label: (item) => `Correlation: ${item.raw.v.toFixed(2)}`,
        },
        backgroundColor: "rgba(0,0,0,0.7)", // Darker tooltip
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 12 },
      },
      legend: { display: false },
      datalabels: {
        color: "#FFFFFF", // White text for better contrast
        font: { size: 12, weight: "bold" }, // Bold and readable
        formatter: (value) => value.v.toFixed(2),
      },
    },
    scales: {
      x: {
        type: "category",
        title: { display: true, text: "Attributes" },
        grid: { display: false },
        ticks: { font: { size: 12 } }, // Enhance tick visibility
      },
      y: {
        type: "category",
        title: { display: true, text: "Attributes" },
        grid: { display: false },
        ticks: { font: { size: 12 } }, // Enhance tick visibility
      },
    },
    elements: {
      rectangle: {
        borderRadius: 4, // Rounded corners for cells
      },
    },
  };

  return (
    <div className="relative h-96 w-full bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold text-center mb-2 text-black" >
        Correlation Matrix
      </h3>
      <Chart type="matrix" data={chartData} options={options} />
    </div>
  );
}
