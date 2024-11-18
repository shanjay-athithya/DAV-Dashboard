"use client";

import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EnergyDistributionChart = ({ data }) => {
  // Extract energy values
  const energyValues = data.map((track) => track.energy);

  // Compute histogram data
  const histogramData = (values) => {
    const bins = 10;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / bins;

    let histogram = new Array(bins).fill(0);
    values.forEach((value) => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex]++;
    });

    return {
      labels: Array.from({ length: bins }, (_, i) =>
        (min + i * binWidth).toFixed(2)
      ),
      data: histogram,
    };
  };

  const histogram = histogramData(energyValues);

  // KDE Calculation (using a simple density estimation)
  const kde = (values, bandwidth = 0.1) => {
    const density = [];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const step = (max - min) / 100;
    for (let x = min; x <= max; x += step) {
      let sum = 0;
      values.forEach((value) => {
        sum += Math.exp(-0.5 * Math.pow((x - value) / bandwidth, 2));
      });
      density.push({
        x,
        y: sum / (values.length * bandwidth * Math.sqrt(2 * Math.PI)),
      });
    }
    return density;
  };

  const kdeData = useMemo(() => kde(energyValues), [energyValues]);

  // Chart data for the histogram and KDE line
  const chartData = {
    labels: histogram.labels,
    datasets: [
      {
        label: "Energy Histogram",
        data: histogram.data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        type: "bar",
        yAxisID: "y",
      },
      {
        label: "KDE Line",
        data: kdeData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        type: "line",
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Energy Distribution with KDE Line",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.type === "bar") {
              return `Energy: ${context.raw}`;
            }
            return `Density: ${context.raw.y.toFixed(2)}`;
          },
        },
      },
      datalabels: {
        display: false, // Disable datalabels
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Energy",
        },
      },
      y: {
        title: {
          display: true,
          text: "Frequency (Histogram)",
        },
      },
      y1: {
        title: {
          display: true,
          text: "Density (KDE)",
        },
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-black">
        Energy Distribution with KDE
      </h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default EnergyDistributionChart;
