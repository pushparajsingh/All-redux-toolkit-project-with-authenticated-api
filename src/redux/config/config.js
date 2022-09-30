import axios from "axios";
const pass = sessionStorage.getItem("token");
const token = JSON.parse(pass);
console.log(123, token);

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SECRET_NAME,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : null,
  },
});
