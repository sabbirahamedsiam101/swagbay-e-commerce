import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router";

const ErrorMessage = ({
  message = "Something went wrong",
  showBackButton = true,
  showHomeButton = true,
  className = "",
  minHeight = "min-h-[300px]",
}) => {
  const navigate = useNavigate();

  return (
    <div className="py-[5%] px-4 flex justify-center bg-gray-100">
      <div
        className={`w-full max-w-lg flex flex-col justify-center items-center text-red-700 bg-red-50 border border-red-300 rounded-xl px-6 py-6 text-center ${minHeight} ${className}`}
        role="alert"
      >
        <FiAlertCircle size={40} className="mb-2 text-red-600" />
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="text-sm text-red-800 max-w-md mb-4">{message}</p>

        <div className="flex gap-4 flex-wrap justify-center">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="bg-white border border-red-400 text-red-700 hover:bg-red-100 px-4 py-2 rounded"
            >
              Go Back
            </button>
          )}

          {showHomeButton && (
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
            >
              Return Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
