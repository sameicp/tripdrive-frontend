import { useEffect, useState } from "react";
import Loader from "./Loading";

export default function Account({ backendActor, isAuthenticated }) {
  const [account, setAccount] = useState(null);

  function getAccountInfo() {
    try {
      backendActor.get_account().then((account) => {
        setAccount(account?.ok);
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <>
      {isAuthenticated && !account && (
        <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto mt-10">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-gray-700 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-gray-700 rounded col-span-2"></div>
                  <div class="h-2 bg-gray-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAuthenticated && account && (
        <div className="p-6 flex justify-center items-center h-full">
          <div className="md:grid md:grid-cols-4 gap-2 bg-gray-900 p-4 rounded-xl">
            {/* <div className="h-52 shadow-xl">
            <div className="flex w-full h-full">
              <img
                src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                className="w-36 h-36 m-auto"
                alt=""
              />
            </div>
      </div> */}
            <div className="md:col-span-3 h-70 shadow-xl space-y-8 p-3">
              <div>{console.log("Account here, ", account)}</div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Name:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={account.username}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Email:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={account.email}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  number:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={account.phone_number}
                  readOnly
                />
              </div>
              <div className="flex">
                <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 text-gray-700 whitespace-no-wrap w-2/6">
                  Role:
                </span>
                <input
                  className="px-4 border-l-0 cursor-default border-gray-300 text-gray-700 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                  type="text"
                  value={"Passenger"}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
