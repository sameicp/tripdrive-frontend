# TripDrive Application

## About TripDrive
- TripDrive is a decentralized ride sharing application hosted on the internet computer,
- The application is compatible with mobile phones.
- The payment process for the application is done using Testnet Bitcoun 
- The addresses for the users are created and managed by the backend canister

## Ride matching proccess
- First I calculate the distance between two coordinates in this case which are driver's and passengers
- When I get the distance in Km then I select requests that are within 5km radius with the driver
- Return a list of possible request to the driver that are within the radius

## Authentication
- For Authentication I used Internet Indentity canister so that applications users are authenticated when they are using the application

## Bitcoin Address Management Canister
- Since most of the users do not need to be tangled into the procees of creating their addresses
- our application generates an address for the user and the user can put their bitcoins into the addresses generarted for them
- The bitcoins are the one used for payment when the trip has finished
- The click here for [Bitcoin management Candid UI]("https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=z3c53-4iaaa-aaaap-qhj7q-cai")
- can look up the canister on the Internet computer canister dashboard.
- the github repo for the code implementation is givem below

NB. Some of the addresses generated are not working when I tried to send test net Bitcoin.

## How to run the project on your machine

NB. Its quite important to note that because of the BitCoin Address management canister which is hosted live the canisters are not able to deploy on localhost

But below is the Link of the live application on the internet computer

[TripDrive Application]("https://evxow-6yaaa-aaaap-qhlyq-cai.icp0.io/")