import React from "react";
import { Scatter } from "react-chartjs-2";

const DanceabilityEnergy = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-center mb-4 text-black">
        Danceability vs. Energy
      </h3>
      <Scatter
        data={{
          datasets: [
            {
              label: "Danceability vs. Energy",
              data: data.map((track) => ({
                x: track.danceability,
                y: track.energy,
              })),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointRadius: 2, // Smaller points
              pointHoverRadius: 4, // Slightly larger on hover for visibility
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            datalabels: {
              display: false, // Disable datalabels
            },
            title: {
              display: true,
              font: {
                size: 16,
                weight: "bold",
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const { x, y } = context.raw;
                  return `Danceability: ${x.toFixed(2)}, Energy: ${y.toFixed(
                    2
                  )}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Danceability",
              },
            },
            y: {
              title: {
                display: true,
                text: "Energy",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DanceabilityEnergy;
