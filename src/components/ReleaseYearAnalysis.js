import React from "react";
import { Line } from "react-chartjs-2";

const ReleaseYearAnalysis = ({ data }) => {
  const releaseCounts = data.reduce((acc, track) => {
    const year = new Date(track.release_date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h3>Release Year Analysis</h3>
      <Line
        data={{
          labels: Object.keys(releaseCounts),
          datasets: [
            {
              label: "Tracks Released",
              data: Object.values(releaseCounts),
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
            },
          ],
        }}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
};

export default ReleaseYearAnalysis;
