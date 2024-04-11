import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Request from "../components/Request";
import CreateAccount from "../components/CreateAccount";
import Loader from "../components/Loading";

export default function Dashboard({ isAuthenticated, backendActor }) {
  const [account, setAccount] = useState({
    ok: {},
    err: "",
  });

  function getAccount() {
    try {
      backendActor.get_account().then((account) => {
        setAccount(account);
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      {account.ok ? (
        <Request {...{ backendActor, isAuthenticated }} />
      ) : (
        <CreateAccount backendActor={backendActor} />
      )}
    </>
  );
}
