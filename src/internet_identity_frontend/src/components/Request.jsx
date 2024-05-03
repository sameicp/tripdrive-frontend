import React from "react";
import { useState, useEffect } from "react";
import RideList from "./RideList";
import { useNavigate } from "react-router-dom";

export default function Request({ backendActor }) {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  function getRequest() {
    backendActor.get_requests().then((requests) => {
      if (requests.ok) {
        setRequests(requests.ok);
      }
    });
  }

  function cancelRequest(id) {
    const input = {
      request_id: BigInt(id),
    };
    backendActor.cancel_request(input).then((request) => {
      if (request.err) {
        throw new Error(request.err);
      }
    });
    navigate("/");
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-20 min-w-90">
      <div className="max-w-screen-md md:w-3/4 mx-auto">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RideList
              request={request}
              cancelRequest={cancelRequest}
              key={request.request_id.request_id}
            />
          ))
        ) : (
          <div>No requests yet</div>
        )}
      </div>
    </div>
  );
}
