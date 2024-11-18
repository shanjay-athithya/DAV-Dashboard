"use client";

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { kernelDensityEstimation } from "simple-statistics";

const HistogramWithKDE = ({ data }) => {
  // Add validation for `data` here
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  const valenceValues = data.map((track) => track.valence);

  if (!valenceValues || valenceValues.length === 0) {
    return <div>No valid valence data available</div>;
  }

  const numberOfBins = 20;
  const maxValence = Math.max(...valenceValues);
  const minValence = Math.min(...valenceValues);
  const binWidth = (maxValence - minValence) / numberOfBins;
  const bins = Array(numberOfBins).fill(0);

  valenceValues.forEach((value) => {
    const binIndex = Math.floor((value - minValence) / binWidth);
    if (binIndex < bins.length) bins[binIndex] += 1;
  });

  const kde = kernelDensityEstimation();
  const densityValues = kde(
    valenceValues,
    bins.map((_, i) => minValence + i * binWidth),
    0.05
  );

  const histogramDataConfig = {
    labels: bins.map((_, i) => (minValence + i * binWidth).toFixed(2)),
    datasets: [
      {
        label: "Histogram of Valence",
        data: bins,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const kdeDataConfig = {
    labels: bins.map((_, i) => (minValence + i * binWidth).toFixed(2)),
    datasets: [
      {
        label: "KDE Line",
        data: densityValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
      title: {
        display: true,
        text: "Emotion Positivity Distribution with KDE",
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
          text: "Valence (Emotion Positivity)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Frequency / Probability",
        },
      },
    },
  };

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-black">
          Emotion Positivity (Histogram)
        </h3>
        <Bar data={histogramDataConfig} options={chartOptions} />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-black">
          Emotion Positivity (KDE Line)
        </h3>
        <Line data={kdeDataConfig} options={chartOptions} />
      </div>
    </div>
  );
};

export default HistogramWithKDE;
