import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function CreateRequest({ backendActor, isAuthenticated }) {
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0.0,
    lng: 0.0,
  });
  const [onSuccess, setOnSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      setCurrentPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  }, []);

  async function createRequest(location, price) {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=113acb9c495f4e7cb3c2d503b2c363c0`
    );
    const data = await res.json();
    const { lat, lon } = data.results[0];

    const requestData = {
      depature: {
        lat: currentPosition.lat,
        lng: currentPosition.lng,
      },
      destination: {
        lat: lat,
        lng: lon,
      },
      price: Number.parseFloat(price),
    };
    console.log(requestData);
    try {
      backendActor.create_request(requestData).then((result) => {
        console.log(result);
        if (result.err) {
          console.log(result.err);
          toast.error('failed to create a request', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
          throw new Error(result.err);
        } else {
          console.log(result.ok);
          setOnSuccess(true)
         toast.success('successfully made the request', {
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
    } catch (e) {
      console.error(e.message);
    }
    setDestination("");
    setPrice("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", destination, price);
    createRequest(destination, price);
  };

  return (
    <>
    <div className="p-4">
      {!onSuccess ? <form onSubmit={handleSubmit}>
        <label className="block mb-2">Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 rounded-md border"
          placeholder="Enter destination"
        />

        <label className="block mt-4 mb-2">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded-md border"
          placeholder="Enter price"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form> 
        : 
        <Link
            to="/"
            className="block rounded-lg py-2 px-6 m-12 font-medium text-gray-300 transition-colors hover:bg-gray-600 bg-blue-800 disabled:opacity-50 mt-4 uppercase tracking-widest text-center"
          >
          ⬅️ Home 
        </Link> }
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
    </>
  );
}
