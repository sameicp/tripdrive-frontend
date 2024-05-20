import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterVehicle({ backendActor, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    license_plate_number: "",
    color: "",
    car_model: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      backendActor.register_car(formData).then((result) => {
        console.log(result);
        if (result.err) {
          console.log(result.err);
          toast.error('failed to register as driver', {
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
          toast.success('driver rigistered successfully', {
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
    setFormData({
      name: "",
      license_plate_number: "",
      color: "",
      car_model: "",
    });
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center p-12">
      {isAuthenticated && (
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Name of Car
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g Tesla"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="car_model"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Car Model
              </label>
              <input
                type="text"
                name="car_model"
                id="car_model"
                value={formData.car_model}
                onChange={handleChange}
                placeholder="e.g Plaid"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="license_plate_number"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Plate Number
              </label>
              <input
                type="text"
                name="license_plate_number"
                id="license_plate_number"
                value={formData.license_plate_number}
                onChange={handleChange}
                placeholder="e.g: xxx 0000"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="color"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Car Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g Black"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
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
    </div>
  );
}
