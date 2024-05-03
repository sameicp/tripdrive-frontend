import React from "react";

export default function RideList({ request, cancelRequest }) {
  function onCancel() {
    const request_id = Number(request.request_id.request_id);
    console.log(request_id);
    cancelRequest(request_id);
  }
  return (
    <div className="flex flex-col space-y-2 mt-4 mx-6 p-4 bg-gray-600 rounded-xl">
      <p className="text-2xl font-semibold text-white">
        Status of your request: {Object.keys(request.status)[0]}
      </p>
      <div className="flex flex-col space-y-1 text-sm text-white">
        <p className="leading-tight">
          You have made a request with the following details:
        </p>
        <p className="leading-tight">From: {Object.keys(request.from)[0]}</p>
        <p className="leading-tight">To: {Object.keys(request.to)[0]}</p>
        <p className="leading-tight">
          Request ID: {Number(request.request_id.request_id)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="opacity-95 rounded-lg px-4">
          <div className="text-l font-semibold leading-normal text-white py-2">
            Your price bid:{" "}
            {request.price
              ? "$" + parseFloat(request.price).toFixed(2)
              : "loading..."}
          </div>
        </div>
        <button
          className="hover:text-gray-800 bg-blue-600 text-white rounded py-1.5 px-4 font-medium"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
