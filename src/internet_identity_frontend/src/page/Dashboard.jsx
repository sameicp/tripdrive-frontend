import { useEffect, useState } from "react";
import CreateAccount from "../components/CreateAccount";
import FrontPage from "./Frontend";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

export default function Dashboard({ isAuthenticated, backendActor }) {
  const [account, setAccount] = useState({
    ok: {},
    err: "",
  });

  const [driverStatus, setDriverStatus] = useState({
    ok: "",
    err: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createAccount = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form submission logic goes here
      console.log("Form submitted:", formData);
      backendActor.create_user_acc(formData).then((result) => {
        if (result.err) {
          console.log(result.err);
          toast.error('failed to create an account', {
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
          setIsCreated(true);
           toast.success('Account was created succeccfully', {
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
      // Reset the form fields after submission
      setFormData({
        username: "",
        email: "",
        phoneNumber: "",
      });
    }
    // navigate("/account");
  };

  function getAccount() {
    try {
      backendActor.get_account().then((account) => {
        setAccount(account);
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  function checkDriver() {
    try {
      backendActor.get_driver().then((status) => {
        setDriverStatus(status);
      });
    } catch (e) {
      console.error("Driver one, " + e.message);
    }
  }

  useEffect(() => {
    getAccount();
    checkDriver();
  }, []);

  return (
    <>
      {account.ok ? (
        <FrontPage driverStatus={driverStatus} backendActor={backendActor} />
      ) : (
        <CreateAccount
          handleSubmit={createAccount}
          setFormData={setFormData}
          formData={formData}
          setErrors={setErrors}
          isCreated={isCreated}
          errors={errors}
        />
      )}
    </>
  );
}
