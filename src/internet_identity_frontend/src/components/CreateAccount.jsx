import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount({
  handleSubmit,
  setFormData,
  formData,
  setErrors,
  errors,
}) {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   phoneNumber: "",
  // });
  // const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when the user starts typing in the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // const validate = () => {
  //   const newErrors = {};
  //   if (!formData.username.trim()) {
  //     newErrors.username = "Full name is required";
  //   }
  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Email is invalid";
  //   }
  //   if (!formData.phoneNumber.trim()) {
  //     newErrors.phoneNumber = "Phone number is required";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     // Form submission logic goes here
  //     console.log("Form submitted:", formData);
  //     backendActor.create_user_acc(formData).then((result) => {
  //       if (result.err) {
  //         console.log(result.err);
  //         throw new Error(result.err);
  //       } else {
  //         console.log(result.ok);
  //       }
  //     });
  //     // Reset the form fields after submission
  //     setFormData({
  //       username: "",
  //       email: "",
  //       phoneNumber: "",
  //     });
  //   }
  //   navigate("/account");
  // };

  return (
    <div className="flex items-center bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              New Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please fill in your details to create an account.
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="0771212234"
                  className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
