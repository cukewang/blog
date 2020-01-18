// 配置axios，没什么好说的奥
import axios from "axios";

const instance = axios.create({
  baseURL: `http://${process.env.HOST || "localhost"}:${process.env.PORT ||
    3000}`,
  timeout: 2000,
  headers: {}
});

export default instance;
