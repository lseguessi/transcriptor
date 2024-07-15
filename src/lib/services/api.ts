
import axios from "axios";
import { getToken, getTokenCookie } from "./storage/app-storage";
const token = getTokenCookie() || getToken();

axios.interceptors.request.use(
    config => {
        config.baseURL = 'https://transcriptor-peru-backend-frbusqtp6a-uc.a.run.app'
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error)
)

export default axios;
