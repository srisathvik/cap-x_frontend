import axios from "axios"
import { notification } from "antd"
import urls from "../env";

export const api = axios.create({
    baseURL: `${urls.BASE_URL}${urls.EXTENSION}`,
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    console.log(error);
    const statusCode = error.response?.status

    if (error.code === "ERR_CANCELED") {
        notification.error({
            placement: "bottomRight",
            description: "API canceled!",
        })
        return Promise.resolve()
    }

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        console.error(error)
    }

    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})
