import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Request from "../components/Request";
import RideInfo from "../components/RideInfo";

export default function FrontPage({ driverStatus, backendActor, principal }) {
  const [request, setRequest] = useState("");
  const [rideDetails, setRideDEtails] = useState([]);
  const [rideInformation, setRideInformation] = useState({});
  const navigate = useNavigate();

  function getRequest() {
    backendActor.get_request().then((request) => {
      if (request.ok) {
        setRequest(request.ok[0]);
      }
    });
  }

  function getRideInformation() {
    backendActor.driver_rides().then(res => {
      if (res.ok) {
        setRideDEtails(res.ok);
      } else {
        console.error(res.err);
      }
    });

    backendActor.get_ride_information().then(res => {
      if(res) {
        setRideInformation(res);
      }
    })
  }

  function passengerOnboarded(rideId) {
    backendActor.passenger_onboarded(rideId).then(res => {
      if (res.err) {
        console.log(res.err);
      } else {
        console.log("Have a safe journey");
      }
    })
  }

  function paymentBTC() {
    backendActor.finished_ride(riderId, requestId).then(res => {
      if (res.err) {
        console.error("failed to make a payment");
        toast.error('failed to make a payment.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      } else {
        toast.success('payment was successfull', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
    })
  }

  function cancelRequest(id) {
    const input = {
      request_id: BigInt(id),
    };
    backendActor.cancel_request(input).then((request) => {
      if (request.err) {
        throw new Error(request.err);
      } else {
        toast.success('cancelled successful', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
    });
    navigate("/");
  }

  useEffect(() => {
    getRequest();
    getRideInformation();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-lg p-5 my-10">
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
            <div className="flex flex-col justify-center items-center space-y-4 mt-6 w-full sm:flex-row sm:justify-between sm:w-3/4">
              {!request ? (
                // <MapComponent />
              rideDetails.length === 0 ? <Link
                to="/createRequest"
                className="w-full sm:w-auto block rounded-lg py-2 px-6 font-medium text-white transition-colors hover:bg-gray-600 bg-blue-600 disabled:opacity-50 tracking-widest text-center"
              >
                Book ride
              </Link> : rideDetails.map(ride => <RideInfo ride={ride} passengerOnboarded={passengerOnboarded} backendActor={backendActor} key={ride.ride_id.ride_id}/>) 
              ) : (
                <Request request={request} cancelRequest={cancelRequest} />
              )}
              <Link
                to={(request && Object.keys(request.status)[0] === "Accepted") ? "driverinfo" : "/account"}
                className="w-full sm:w-auto block rounded-lg py-2 px-6 font-medium text-white transition-colors hover:bg-gray-600 bg-blue-600 disabled:opacity-50 tracking-widest text-center"
              >
                {(request && Object.keys(request.status)[0] === "Accepted") ? "View Driver Details" :'View Profile'}
              </Link>
              {rideInformation?.ok && 
                Object.keys(rideInformation?.ok?.ride_status)[0] === "RideStarted" && 
                String(rideInformation?.ok?.user_id) === principal &&
                <button
                  onClick={paymentBTC}
                  className="w-full sm:w-auto block rounded-lg py-2 px-6 font-medium text-white transition-colors hover:bg-gray-600 bg-blue-600 disabled:opacity-50 tracking-widest text-center"
                >
                  Pay for the trip
                </button>
              }
            </div>
          </>
        )}
        {driverStatus.err && !request && (
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
        {driverStatus.ok && !(rideInformation?.ok) && (
          <div className="font-semibold text-center mt-6">
            <div>Hey, welcome. Are you in the mood to drive today?</div>
            <div>If yes, then check the requests and find passengers.</div>
            <Link
              to="/checkRequests"
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
