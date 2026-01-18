import React from "react";
import { useNavigate } from "react-router-dom";

const Assessment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-200 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Experiment Complete!
        </h2>
        <p className="text-gray-600">
          You've successfully performed the Neutralization reaction. Now, let's
          test your knowledge!
        </p>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => alert("Quiz starting...")}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            Start Assessment
          </button>

          <button
            onClick={() => navigate("/dashboard/chemistry")}
            className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold border border-gray-200 active:scale-95 transition-transform"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
