import {useEffect, useState} from "react";
import {Link} from "react-router-dom"

function DriverInfo({backendActor, isAuthenticated}) {
    const [driver, setDriver] = useState(null);

    function getDriverInfo() {
        backendActor.get_driver_info().then(res => {
            if(res.ok) {
                console.log(res.ok);
                setDriver(res.ok)
            } else {
                console.log(res.err);
            }
        })
    }
    useEffect(() => {
      getDriverInfo();
    },[])

  return (
     <>
      {isAuthenticated && !driver && (
        <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto mt-10">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                </div>
                <div className="h-1 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAuthenticated && driver && (
        <div className="p-6 flex justify-center items-center h-full">
          <div className="md:grid md:grid-cols-4 gap-2 bg-gray-900 p-4 rounded-xl">
            <div className="md:col-span-3 h-70 shadow-xl space-y-8 p-3">
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Name:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={driver.driver.username}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Contact:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={driver.driver.phone_number}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Car:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={driver.car.name}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Plate Number:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={driver.car.license_plate_number}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Color:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={driver.car.color}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Reviews:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value="3.3"
                  readOnly
                />
              </div>
              <Link
                to="/"
                className="block rounded-lg py-2 px-6 m-12 font-medium text-gray-300 transition-colors hover:bg-gray-600 bg-blue-800 disabled:opacity-50 mt-4 uppercase tracking-widest text-center"
              >
              ⬅️ Return 
            </Link> 
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DriverInfo