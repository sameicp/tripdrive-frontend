import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SelectLocation({ backendActor, isAuthenticated }) {
  const [_from, setFrom] = useState("");
  const [_to, setTo] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    const rideDetails = {
      from: { [_from]: null },
      to: { [_to]: null },
      price: parseFloat(price), // Convert price to float
    };
    // Here you can use rideDetails as needed, for example, send it to the backendActor
    console.log("Ride details:", rideDetails);
    backendActor.create_request(rideDetails).then((request_id) => {
      console.log(request_id);
    });

    // Clear input fields after submission
    setFrom("");
    setTo("");
    setPrice("");
    navigate("/request/update");
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="w-full md:w-3/4 lg:w-1/2">
        <div className="mb-4">
          <label htmlFor="from" className="block text-lg mb-2 font-semibold">
            FROM:
          </label>
          <select
            id="from"
            className="input-field"
            value={_from}
            onChange={handleFromChange}
          >
            <option value="">Select From</option>
            <option value="UniversityCampus">University Campus</option>
            <option value="HarareCityCentre">Harare City Centre</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="to" className="block text-lg mb-2 font-semibold">
            TO:
          </label>
          <select
            id="to"
            className="input-field"
            value={_to}
            onChange={handleToChange}
          >
            <option value="">Select To</option>
            <option value="UniversityCampus">University Campus</option>
            <option value="HarareCityCentre">Harare City Centre</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg mb-2 font-semibold">
            PRICE:
          </label>
          <input
            type="number"
            id="price"
            className="input-field"
            value={price}
            onChange={handlePriceChange}
            step="0.50" // Allow float numbers
            min="0" // Minimum value
            placeholder="Enter Price"
          />
        </div>
      </div>
      <button
        className="bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md mt-4 font-semibold hover:bg-blue-800 transition duration-300"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
