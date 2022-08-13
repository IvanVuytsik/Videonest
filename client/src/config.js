import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://videonest-tsq.herokuapp.com/api/"
})