import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function RideList({ request, cancelRequest }) {
  const [destination, setDestination] = useState("");
  const [btc, setBtc] = useState(1);

  function onCancel() {
    const request_id = Number(request.request_id.request_id);
    console.log(request_id);
    cancelRequest(request_id);
  }

  async function getLocation() {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${request.destination.lat}&lon=${request.destination.lng}&format=json&apiKey=113acb9c495f4e7cb3c2d503b2c363c0`)
    const data = await res.json()
    setDestination(data.results[0].formatted)
  }

  async function getBitcoinPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const btcPriceUSD = data.bitcoin.usd;
       setBtc(btcPriceUSD); 
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
  }

  useEffect(()=>{
    getLocation()
    getBitcoinPrice();
  }, [])
  console.log(request)

  return (
     <div className="p-4 mt-6 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Status : {Object.keys(request.status)[0]}
          </h3>
          <button
            onClick={onCancel}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            {Object.keys(request.status)[0] === "Accepted" ? "Open Map" : "Cancel"}
          </button>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="w-80 text-base font-semibold text-gray-900 truncate dark:text-gray-400">
                    To: {destination}
                  </p>
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0 text-base font-semibold text-gray-900">
                 USD: {parseFloat(request.price).toFixed(2)}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  BTC: {(request.price / btc).toFixed(8)}
                </div>
              </div>
            </li>
          </ul>
        </div>
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
      </div>);
}
