import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SelectLocation({ backendActor, isAuthenticated }) {
  const [_from, setFrom] = useState("");
  const [_to, setTo] = useState("");
  const [price, setPrice] = useState("");

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
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="from" className="block mb-2">
            FROM:
          </label>
          <select
            id="from"
            className="bg-gray-200 border border-gray-400 rounded py-2 px-4 w-full"
            value={_from}
            onChange={handleFromChange}
          >
            <option value="">-</option>
            <option value="UniversityCampus">University</option>
            <option value="HarareCityCentre">Harare City</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="to" className="block mb-2">
            TO:
          </label>
          <select
            id="to"
            className="bg-gray-200 border border-gray-400 rounded py-2 px-4 w-full"
            value={_to}
            onChange={handleToChange}
          >
            <option value="">-</option>
            <option value="UniversityCampus">University</option>
            <option value="HarareCityCentre">Harare City</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            PRICE:
          </label>
          <input
            type="number"
            id="price"
            className="bg-gray-200 border border-gray-400 rounded py-2 px-4 w-full"
            value={price}
            onChange={handlePriceChange}
            step="0.01" // Allow float numbers
            min="0" // Minimum value
          />
        </div>
      </div>
      <button
        className="bg-blue-700 text-white py-2 px-4 rounded shadow-md mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
