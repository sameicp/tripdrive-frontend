import { useEffect, useState } from "react";
import ListRequest from "./ListRequest";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function CheckRequests({ backendActor, isAuthenticated }) {
  const [requests, setRequests] = useState([]);

  function getRequest() {
    navigator.geolocation.getCurrentPosition(function (location) {
      const currentPosition = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      backendActor.get_requests(currentPosition).then((requests) => {
        if (requests.ok) {
          setRequests(requests.ok);
        }
      });
    }); 
  }

  function acceptRequest(request_id) {
    backendActor.select_passenger({
      request_id: request_id,
      }, BigInt(Date.now())).then(result => {
      if (result.ok) {
        console.log(result.ok);
        toast.success('request selected successfull', {
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
        console.log(result.err);
      }
    })
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
     {requests.length !== 0 &&
      requests.map(request => <ListRequest request={request} acceptRequest={acceptRequest} key={request.request_id.request_id} />) }
      <Link
            to="/"
            className="block rounded-lg py-2 px-6 m-12 font-medium text-gray-300 transition-colors hover:bg-gray-600 bg-blue-800 disabled:opacity-50 mt-4 uppercase tracking-widest text-center"
          >
          ⬅️ Home 
        </Link>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}
