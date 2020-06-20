import axios from "axios";

const orderInstance = axios.create({
  baseURL: "https://yanburger-ad068.firebaseio.com/",
});

export default orderInstance;
