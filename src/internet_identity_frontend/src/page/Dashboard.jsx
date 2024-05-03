import { useEffect, useState } from "react";
import CreateAccount from "../components/CreateAccount";
import FrontPage from "./Frontend";

export default function Dashboard({ isAuthenticated, backendActor }) {
  const [account, setAccount] = useState({
    ok: {},
    err: "",
  });

  const [driverStatus, setDriverStatus] = useState({
    ok: "",
    err: "",
  });

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
        <CreateAccount backendActor={backendActor} />
      )}
    </>
  );
}
