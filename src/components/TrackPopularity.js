import React from "react";
import { Bar } from "react-chartjs-2";

const TrackDanceability = ({ data }) => {
  const topTracks = data.slice(0, 10); // Select top 10 tracks
  return (
    <div>
      <h3>Track Danceability</h3>
      <Bar
        data={{
          labels: topTracks.map((track) => track.name),
          datasets: [
            {
              label: "Danceability",
              data: topTracks.map((track) => track.danceability), // Using danceability as the parameter
              backgroundColor: "rgba(153, 102, 255, 0.6)", // Light purple color
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
              datalabels: {
                display: false, // Disable datalabels
              },
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true, // Start the y-axis from zero
              title: {
                display: true,
                text: "Danceability", // Label for the y-axis
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TrackDanceability;
