"use client";

import MoodDistribution from "../components/MoodDistribution";
import TrackDanceability from "../components/TrackPopularity";
import DanceabilityEnergy from "../components/DanceabilityEnergy";
import ReleaseYearAnalysis from "../components/ReleaseYearAnalysis";
import CorrelationMatrix from "../components/CorrelationMatrix";
import NormalizationChart from "../components/BoxCoxChart";
import ZTest from "../components/ZTest";
import EnergyDistributionChart from "../components/ValenceDistributionChart";
import TwoWayANOVA from "../components/TwoWayANOVA";
import LinePlot from "../components/LinePlot";
import data from "../../public/data_moods.json.json";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Register necessary chart elements for chart.js
Chart.register(
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Home() {
  const populationMean = 50; // Example hypothesized population mean for Z-Test (can be adjusted)

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-100">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500">
        🎵 Music Analytics Dashboard
      </h1>

      {/* Grid layout for the first row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <MoodDistribution data={data} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <TrackDanceability data={data} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <DanceabilityEnergy data={data} />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 md:col-span-2">
          <ReleaseYearAnalysis data={data} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 md:col-span-1">
          <CorrelationMatrix data={data} />
        </div>
      </div>

      {/* Remaining components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <NormalizationChart data={data} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <ZTest data={data} populationMean={populationMean} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <TwoWayANOVA data={data} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <LinePlot data={data} />
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <EnergyDistributionChart data={data} />
        </div>
      </div>
    </div>
  );
}
