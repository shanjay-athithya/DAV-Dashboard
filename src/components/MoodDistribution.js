import React from "react";
import { Pie } from "react-chartjs-2";

const MoodDistribution = ({ data }) => {
  // Group tracks by valence
  const valenceCategories = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  // Classifying the valence values into Low, Medium, High
  data.forEach((track) => {
    if (track.valence <= 0.33) {
      valenceCategories.Low += 1;
    } else if (track.valence <= 0.66) {
      valenceCategories.Medium += 1;
    } else {
      valenceCategories.High += 1;
    }
  });

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Valence Distribution
      </h3>
      <div className="relative w-[250px] h-[250px]">
        {" "}
        {/* Adjusted size */}
        <Pie
          data={{
            labels: Object.keys(valenceCategories),
            datasets: [
              {
                data: Object.values(valenceCategories),
                backgroundColor: [
                  "#FF6384", // Low valence (negative mood)
                  "#36A2EB", // Medium valence (neutral mood)
                  "#FFCE56", // High valence (positive mood)
                ],
                hoverBackgroundColor: [
                  "#FF6384", // Hover color for Low
                  "#36A2EB", // Hover color for Medium
                  "#FFCE56", // Hover color for High
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const { index } = context;
                    return `${Object.keys(valenceCategories)[index]}: ${
                      context.raw
                    }`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MoodDistribution;
