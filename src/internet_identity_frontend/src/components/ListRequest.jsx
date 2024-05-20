import {useState, useEffect} from "react";
import Map from "./Map";

function ListRequest({request, acceptRequest}) {
    const [destination, setDestination] = useState("");
    const [curLocation, setCurLocation] = useState("");
    const [btc, setBtc] = useState(1);
    const [viewOnMap, setViewOnMap] = useState(false);

    async function getLocation() {
        const cur_location = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${request.depature.lat}&lon=${request.depature.lng}&format=json&apiKey=113acb9c495f4e7cb3c2d503b2c363c0`)
        const destination = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${request.destination.lat}&lon=${request.destination.lng}&format=json&apiKey=113acb9c495f4e7cb3c2d503b2c363c0`)
        const data1 = await cur_location.json()
        const data2 = await destination.json();
        setCurLocation(data1.results[0].formatted)
        setDestination(data2.results[0].formatted)
    }

    function selectPassenger() {
      acceptRequest(request.request_id.request_id);
    }

    async function getBitcoinPrice() {
    try {
        // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        // const data = await response.json();
        // const btcPriceUSD = data.bitcoin.usd;
       setBtc(67400.43); 
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
  }
    useEffect(()=>{
        getLocation();
        getBitcoinPrice();
    }, [])

  return (
    <>
    {!viewOnMap ? <div className="p-4 mt-6 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {request.passenger_details.username}
          </h3>
          <button
            onClick={selectPassenger}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Accept
          </button>
          <button
            onClick={()=>setViewOnMap(viewOnMap => !viewOnMap)}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View on Map
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
                  <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                    From: {curLocation} 
                  </p>
                  <p className="text-base font-semibold text-gray-900 truncate dark:text-gray-400">
                    To: {destination}
                  </p>
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0 text-base font-semibold text-gray-900">
                 USD: {request.price}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  BTC: {(request.price / btc).toFixed(8)}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>: <div>
        <Map request={request}/>
        <button onClick={()=>setViewOnMap(viewOnMap=>!viewOnMap)}>back</button>
        </div>}
      </>
  )
}

export default ListRequest