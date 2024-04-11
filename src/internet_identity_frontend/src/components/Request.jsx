import React from "react";
import { useState, useEffect } from "react";

export default function Request({ backendActor, isAuthenticated }) {
  const [request, setRequest] = useState({
    from: "",
    to: "",
    price: 0,
    status: "",
    request_id: null,
  });

  function getRequest() {
    backendActor.get_requests().then((requests) => {
      if (requests.ok) {
        const request = requests.ok[0];
        setRequest({
          from: Object.keys(request.from)[0],
          to: Object.keys(request.to)[0],
          price: request.price,
          status: Object.keys(request.status)[0],
          request_id: Number(request.request_id.request_id),
        });
      }
    });
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="h-screen max-w-2xl mx-auto mt-6 space-y-20">
      <div className="max-w-screen-md md:w-3/4 mx-auto">
        <div className="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full p-4 bg-blue-800 rounded-xl">
          <p className="w-full text-2xl font-semibold text-white">
            Status of your request:{" "}
            {request.status ? request.status : "loading..."}
          </p>
          <p className="w-full text-sm tracking-wide leading-tight text-white">
            You have made a request with the following Details
          </p>
          <p className="w-full text-sm tracking-wide leading-tight text-white">
            From : {request.from ? request.from : "loading..."}
          </p>
          <p className="w-full text-sm tracking-wide leading-tight text-white">
            To : {request.to ? request.to : "loading..."}
          </p>
          <p className="w-full text-sm tracking-wide leading-tight text-white">
            Request Id : {request.request_id}
          </p>

          <div className="rounded mr-auto">
            <div className="opacity-95 border rounded-lg border-white px-4">
              <div className="m-auto inset-0 text-sm font-medium leading-normal text-center text-white py-2">
                Your price bid:
                {request.price
                  ? " $ " + parseFloat(request.price).toFixed(2)
                  : "loading..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
