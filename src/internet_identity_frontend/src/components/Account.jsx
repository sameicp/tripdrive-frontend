import { useEffect, useState } from "react";

export default function Account({ backendActor, isAuthenticated }) {
  const [account, setAccount] = useState({
    username: "",
    email: "",
    phone_number: "",
  });

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
    <div className="p-6 flex justify-center items-center h-full">
      {isAuthenticated && (
        <div className="md:grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl">
          <div className="h-52 shadow-xl">
            <div className="flex w-full h-full">
              <img
                src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                className="w-36 h-36 m-auto"
                alt=""
              />
            </div>
          </div>
          <div className="md:col-span-3 h-48 shadow-xl space-y-2 p-3">
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Name:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={account?.username ? account.username : "loading..."}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Email:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={account?.email ? account.email : "loading..."}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                number:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={
                  account?.phone_number ? account.phone_number : "loading..."
                }
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Role:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={account?.phone_number ? "Passenger" : "loading..."}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
