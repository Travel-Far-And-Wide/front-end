import axios from "axios";

export default function axiosAuth() {
  const token = window.localStorage.getItem("token");
  return axios.create({
    headers: { Authorization: `${token}` },
    baseURL: "https://travel-far-and-wide-backend.herokuapp.com/",
  });
}
