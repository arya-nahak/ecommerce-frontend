import axios from "axios";

let myToken = JSON.parse(sessionStorage.getItem("user"));
console.log(myToken,"mytoken");

const InterCeptor = axios.create({
  baseURL: "https://real-pear-fly-kilt.cyclic.app",
});

InterCeptor.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = `Bearer ${myToken.jwtToken}`;
    console.log("request sent");
    return request;
  },
  (error) => {
    //to handle or save data in cloud
    return Promise.reject(error);
  }
);

InterCeptor.interceptors.response.use(
  (response) => {
    console.log("got response");
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default InterCeptor;
