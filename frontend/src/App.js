import React, { useState } from "react";

const App = () => {
  const [country, setCountry] = useState("");
  const [season, setSeason] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    if (country && season) {
      const response = await fetch(
        `http://localhost:8000/recommendations?country=${country}&season=${season}`
      );
      const data = await response.json();
      setRecommendations(data.recommendations);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-5">
            Travel Recommendations
          </label>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              placeholder="Canada"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="season"
            >
              Season
            </label>
            <input
              required
              className={`shadow appearance-none border ${
                recommendations.length === 1 ? "border-red-500" : ""
              }  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="text"
              type="season"
              placeholder="Spring"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            />
            {recommendations.length === 1 ? (
              <p className="text-red-500 text-xs italic">{recommendations}</p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={fetchRecommendations}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Get Recommendations
            </button>
          </div>
          <div className="flex flex-col items-center mt-10">
            {recommendations.length > 1 &&
              recommendations.map((recommendation, index) => (
                <ul
                  key={index}
                  className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 mt-6 p-3 shadow-md rounded "
                >
                  {recommendation.split("\n").map((element, index) => {
                    if (element.trim() !== "") {
                      return (
                        <li key={index} className="p-2">
                          {element}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
