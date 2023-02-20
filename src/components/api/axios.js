import axios from "axios";
import { WebApiUrl } from "../../constants/constants";

export default axios.create({
  baseURL: WebApiUrl,
});
