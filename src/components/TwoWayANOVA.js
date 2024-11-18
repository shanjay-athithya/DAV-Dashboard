import React, { useState } from "react";
import * as ss from "simple-statistics";
import jStat from "jstat";

const TwoWayANOVA = ({ data }) => {
  const [anovaResult, setAnovaResult] = useState(null);
  const [isTested, setIsTested] = useState(false);

  // Helper function to calculate mean
  const mean = (arr) => ss.mean(arr);

  // Helper function to calculate sum of squares
  const sumOfSquares = (arr, mean) => {
    return arr.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0);
  };

  const handleANOVA = () => {
    // Group the data by 'mood' and 'release_year'
    const groupedByMood = {};
    const groupedByReleaseYear = {};

    data.forEach((track) => {
      if (!groupedByMood[track.mood]) groupedByMood[track.mood] = [];
      groupedByMood[track.mood].push(track.popularity);

      if (!groupedByReleaseYear[track.release_year])
        groupedByReleaseYear[track.release_year] = [];
      groupedByReleaseYear[track.release_year].push(track.popularity);
    });

    const moods = Object.values(groupedByMood);
    const releaseYears = Object.values(groupedByReleaseYear);

    // Calculate Total Sum of Squares (SST)
    const allData = [].concat(...moods, ...releaseYears);
    const totalMean = mean(allData);
   

    // Calculate Sum of Squares Between (SSB) and Sum of Squares Within (SSW)
    const SSB = moods.reduce((acc, group) => {
      const groupMean = mean(group);
      return acc + group.length * Math.pow(groupMean - totalMean, 2);
    }, 0);

    const SSW = moods.reduce((acc, group) => {
      return acc + sumOfSquares(group, mean(group));
    }, 0);

    // Calculate Mean Squares
    const dfB = moods.length - 1; // Degrees of freedom between groups
    const dfW = allData.length - moods.length; // Degrees of freedom within groups
    const MSB = SSB / dfB;
    const MSW = SSW / dfW;

    // Calculate F-statistic
    const F = MSB / MSW;

    // Calculate p-value using jStat for F-distribution
    const pValue = 1 - jStat.ftest(F, dfB, dfW); // Using F-distribution

    setAnovaResult({
      F: F,
      pValue: pValue,
      SSB: SSB,
      SSW: SSW,
      dfB: dfB,
      dfW: dfW,
      MSB: MSB,
      MSW: MSW,
    });
    setIsTested(true);
  };

  const inference = (result) => {
    if (!result) return "";

    const { pValue } = result;

    // Basic inference based on p-value
    if (pValue < 0.05) {
      return "There is a significant interaction effect between the mood and release year on popularity.";
    } else {
      return "There is no significant interaction effect between the mood and release year on popularity.";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
        2-Way ANOVA: Popularity by Mood
      </h3>
      <div className="text-center mb-4 text-gray-600">
        <p className="text-lg mb-2">
          This test evaluates whether **mood** and **release year** have a
          significant effect on the **popularity** of tracks.
        </p>
        <p className="text-md">
          Click below to run the ANOVA test and get the results.
        </p>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleANOVA}
          className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-300"
        >
          Run 2-Way ANOVA
        </button>
      </div>

      {isTested && (
        <div className="mt-6">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              ANOVA Results
            </p>
            <table className="min-w-full bg-gray-50 table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-black">Metric</th>
                  <th className="px-4 py-2 text-left text-black">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    F-Statistic
                  </td>
                  <td className="px-4 py-2 text-black">
                    {anovaResult.F.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">p-Value</td>
                  <td className="px-4 py-2 text-black">
                    {anovaResult.pValue.toExponential(3)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    SSB (Sum of Squares Between)
                  </td>
                  <td className="px-4 py-2 text-black">
                    {anovaResult.SSB.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    SSW (Sum of Squares Within)
                  </td>
                  <td className="px-4 py-2 text-black">
                    {anovaResult.SSW.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    dfB (Degrees of Freedom Between)
                  </td>
                  <td className="px-4 py-2 text-black">{anovaResult.dfB}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    dfW (Degrees of Freedom Within)
                  </td>
                  <td className="px-4 py-2 text-black">{anovaResult.dfW}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    MSB (Mean Squares Between)
                  </td>
                  <td className="px-4 py-2 text-black">
                    {anovaResult.MSB.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-black">
                    MSW (Mean Squares Within)
                  </td>
                  <td className="px-4 py-2 text-black">
                    {anovaResult.MSW.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="mt-4 text-lg text-gray-700">
              {inference(anovaResult)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoWayANOVA;
