import { Link } from "react-router-dom";
import model1 from "../../public/cyber_truck.jpg";

import Dashboard from "./Dashboard";

export default function HomePage({ backendActor, isAuthenticated, login, principal }) {
  return (
    <>
      {isAuthenticated ? (
        <Dashboard {...{ backendActor, isAuthenticated, principal }} />
      ) : (
        <>
        <div className="flex flex-col items-center justify-center bg-gray-900 mt-20">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-bold mb-8">
              Welcome to{" "}
              <span className="uppercase text-blue-gray-600 tracking-widest">
                Tripdrive
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 uppercase tracking-widest">
             Let us share a ride.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={login}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-300"
              >
                Log in
              </button>
            </div>
          </div> 
        </div>
        <div className="flex justify-center items-center m-8 h-80">
          <img 
            src={model1}
            alt="Tesla car image" 
          />
        </div>
        
      </>
      )}
    </>
  );
}
