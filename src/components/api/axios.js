import axios from "axios";
import { WebApiUrl } from "../../constants/constants";

const token = JSON.parse(localStorage.getItem('login'))
export default axios.create({
    baseURL: WebApiUrl,
    headers: token.token
}
)