import {useState, useEffect} from "react"

function RideInfo({ride}) {
    const [destination, setDestination] = useState("");
    const [curLocation, setCurLocation] = useState("");
    const [btc, setBtc] = useState(1);
    const [viewOnMap, setViewOnMap] = useState(false);

    async function getLocation() {
        const cur_location = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${ride.origin.lat}&lon=${ride.origin.lng}&format=json&apiKey=113acb9c495f4e7cb3c2d503b2c363c0`)
        const destination = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${ride.destination.lat}&lon=${ride.destination.lng}&format=json&apiKey=113acb9c495f4e7cb3c2d503b2c363c0`)
        const data1 = await cur_location.json()
        const data2 = await destination.json();
        setCurLocation(data1.results[0].formatted)
        setDestination(data2.results[0].formatted)
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
    <div className="p-4 mt-6 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {Object.keys(ride.payment_status)[0]}
          </h3>
          <button
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            {Object.keys(ride.payment_status)[0] === "Accepted" ? "Open Map" : "Not Picked Yet"}
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
                  <p className="w-80 text-base font-semibold text-gray-900 truncate dark:text-white">
                    From: {curLocation} 
                  </p>
                  <p className="w-80 text-base font-semibold text-gray-900 truncate dark:text-gray-400">
                    To: {destination}
                  </p>
                  <p className="w-80 text-base font-semibold text-gray-900 truncate dark:text-gray-400">
                    Name: Samuel Muto
                  </p>
                  <p className="w-80 text-base font-semibold text-gray-900 truncate dark:text-gray-400">
                    Cell number: 0771212234
                  </p>
                </div>
              </div>
            </li>

            <li className="pt-3 pb-0 sm:pt-4">
              {false ? <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0 text-base font-semibold text-gray-900">
                 USD: {parseFloat(ride.price).toFixed(2)}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  BTC: {(ride.price / btc).toFixed(8)}
                </div>
              </div> : 
                <button
                    className="block rounded-lg py-2 px-6 font-medium text-gray-300 transition-colors hover:bg-gray-600 bg-blue-800 disabled:opacity-50 mt-4 uppercase tracking-widest text-center"
                    >
                  Passenger has Boarded
                </button>}
            </li>
          </ul>
        </div>
        {/* <ToastContainer
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
        /> */}
      </div>
  )
}

export default RideInfo