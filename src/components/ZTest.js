import React, { useState } from "react";
import * as ss from "simple-statistics";

const ZTest = ({ data, populationMean }) => {
  const [zResult, setZResult] = useState(null);
  const [isTested, setIsTested] = useState(false);

  const handleZTest = () => {
    // Example: Testing "popularity" against a hypothesized population mean
    const sampleData = data.map((track) => track.popularity);
    const sampleMean = ss.mean(sampleData);
    const sampleStdDev = ss.standardDeviation(sampleData);
    const sampleSize = sampleData.length;

    // Z-test calculation
    const zScore =
      (sampleMean - populationMean) / (sampleStdDev / Math.sqrt(sampleSize));

    setZResult(zScore);
    setIsTested(true);
  };

  const inference = (zResult) => {
    if (zResult > 1.96) {
      return "The sample mean is significantly different from the population mean (95% confidence).";
    } else if (zResult < -1.96) {
      return "The sample mean is significantly lower than the population mean (95% confidence).";
    } else {
      return "The sample mean is not significantly different from the population mean.";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
        Z-Test for Popularity
      </h3>
      <div className="text-center mb-4 text-gray-600">
        <p className="text-lg mb-2">
          This test checks if the average popularity of tracks differs
          significantly from a hypothesized population mean.
        </p>
        <p className="text-md">
          Click below to run the Z-Test and get the result.
        </p>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleZTest}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Run Z-Test
        </button>
      </div>
      {isTested && (
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold text-gray-800">
            Z-Score: {zResult.toFixed(2)}
          </p>
          <p className="mt-2 text-gray-700 text-lg">{inference(zResult)}</p>
        </div>
      )}
    </div>
  );
};

export default ZTest;
