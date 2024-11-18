"use client";

import React from "react";
import { Bar } from "react-chartjs-2";

const NormalizationChart = ({ data }) => {
  // Extract "Energy" values
  const originalValues = data.map((track) => track.energy);

  // Normalize the data
  const min = Math.min(...originalValues);
  const max = Math.max(...originalValues);
  const normalizedValues = originalValues.map(
    (value) => (value - min) / (max - min)
  );

  // Chart data configurations
  const originalDataConfig = {
    labels: data.map((track, index) => `Track ${index + 1}`),
    datasets: [
      {
        label: "Original Energy",
        data: originalValues,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const normalizedDataConfig = {
    labels: data.map((track, index) => `Track ${index + 1}`),
    datasets: [
      {
        label: "Normalized Energy",
        data: normalizedValues,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false, // Disable datalabels
      },
      title: {
        display: true,
        text: "Energy Visualization",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tracks",
        },
      },
      y: {
        title: {
          display: true,
          text: "Energy",
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-black">Original Energy</h3>
        <Bar
          data={originalDataConfig}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: "Original Energy" },
            },
          }}
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-black">Normalized Energy</h3>
        <Bar
          data={normalizedDataConfig}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: {
                ...chartOptions.plugins.title,
                text: "Normalized Energy",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default NormalizationChart;
