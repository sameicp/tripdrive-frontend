import React from "react";
import HomePage from "./page/HomePage";
import RideHistory from "./components/RideHistory";
import Account from "./components/Account";
import NavBar from "./components/NavBar";
import Dashboard from "./page/Dashboard";
import ErrorPage from "./components/ErrorPage";
import CreateRequest from "./components/CreateRequest";
import CheckRequests from "./components/CheckRequests";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "declarations/internet_identity_backend";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateAccount from "./components/CreateAccount";
import Request from "./components/Request";
import RegisterVehicle from "./components/RegisterVehicle";

const env = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const livehost = "https://icp0.io";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);

  const login = async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: 1000 * 60 * 30,
        disableDefaultIdleCallback: true,
      },
    });
    await authClient.login({
      identityProvider:
        env === "local"
          ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
          : "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        checkAuth();
      },
    });
  };

  const checkAuth = async () => {
    try {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true);
      }
      const id = authClient.getIdentity();
      setIdentity(id);
    } catch (error) {
      console.log("Error on check auth ", error);
    }
  };

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const principal = identity?.getPrincipal().toString();

  let agent = new HttpAgent({
    host: env === "local" ? localhost : livehost,
    identity: identity,
  });

  //Only use agent.fetchRootKey() in development mode, in production remove this line
  agent.fetchRootKey();

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_INTERNET_IDENTITY_BACKEND,
  });

  return (
    <Router>
      <div className=" bg-gray-900  text-gray-500 min-h-screen">
        <NavBar
          {...{ login, logout, isAuthenticated, principal, backendActor }}
        />
        <div className="mx-auto pt-16">
          {" "}
          {/* Add top padding to push content below NavBar */}
          <Routes>
            <Route
              path="/"
              element={
                <HomePage {...{ backendActor, isAuthenticated, login }} />
              }
            />
            <Route
              path="/createRequest"
              element={<CreateRequest {...{ backendActor, isAuthenticated }} />}
            />
            <Route 
              path="/checkRequests" 
              element={<CheckRequests {...{backendActor, isAuthenticated}} />} 
            />
            <Route
              path="/ride/history"
              element={<RideHistory {...{ backendActor, isAuthenticated }} />}
            />
            <Route
              path="/account"
              element={<Account {...{ backendActor, isAuthenticated }} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard {...{ backendActor, isAuthenticated }} />}
            />
            <Route
              path="/signup"
              element={<CreateAccount {...{ backendActor, isAuthenticated }} />}
            />
            <Route
              path="/register"
              element={
                <RegisterVehicle {...{ backendActor, isAuthenticated }} />
              }
            />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
