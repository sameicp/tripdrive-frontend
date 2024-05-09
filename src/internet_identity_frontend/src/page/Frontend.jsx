import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectLocation from "../components/SelectLocation";
import Request from "../components/Request";

export default function FrontPage({ driverStatus, backendActor }) {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  function getRequest() {
    backendActor.get_requests().then((requests) => {
      if (requests.ok) {
        setRequests(requests.ok);
      }
    });
  }

  function createRequest(rideDetails) {
    backendActor.create_request(rideDetails).then((request_id) => {
      console.log(request_id);
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
    <>
      <div className="flex flex-col items-center justify-center rounded-lg p-8 my-10">
        {(driverStatus.err || driverStatus.ok) === "" && (
          <div className="w-full mt-6 flex flex-col items-center bg-gray-900 shadow-sm rounded-xl">
            <div className="flex justify-center p-4 md:p-5">
              <div
                className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {(driverStatus.err || driverStatus.ok) && (
          <>
            <div className="mt-8 text-center">
              <h1 className="text-4xl">Welcome, book and enjoy</h1>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 mt-6 w-full sm:flex-row sm:justify-between sm:w-3/4">
              {requests.length === 0 ? (
                <SelectLocation
                  createRequest={createRequest}
                  //className="w-full sm:w-auto block rounded-lg border border-green-700 bg-green-600 py-2 px-6 font-medium text-white transition-colors hover:bg-gray-600 active:bg-green-800 disabled:opacity-50 tracking-widest text-center"
                />
              ) : (
                <Request requests={requests} cancelRequest={cancelRequest} />
              )}
              <Link
                to="/account"
                className="w-full sm:w-auto block rounded-lg py-2 px-6 font-medium text-white transition-colors hover:bg-gray-600 bg-blue-600 disabled:opacity-50 tracking-widest text-center"
              >
                View Profile
              </Link>
            </div>
          </>
        )}
        {driverStatus.err && (
          <div className="font-semibold text-center mt-6">
            <div>Do you own a car and need to earn some money?</div>
            <div>If yes, then click the link below to register your car.</div>
            <Link
              to="/register"
              className="block rounded-lg py-2 px-6 font-medium text-gray-300 transition-colors hover:bg-gray-600 bg-blue-800 disabled:opacity-50 mt-4 uppercase tracking-widest text-center"
            >
              Register here
            </Link>
          </div>
        )}
        {driverStatus.ok && (
          <div className="font-semibold text-center mt-6">
            <div>Hey, welcome. Are you in the mood to drive today?</div>
            <div>If yes, then check the requests and find passengers.</div>
            <Link
              to="/select/requests"
              className="block rounded-lg py-2 px-6 font-medium text-gray-300 transition-colors hover:bg-gray-600 bg-blue-800 disabled:opacity-50 mt-4 uppercase tracking-widest text-center"
            >
              Ride Requests Available
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
