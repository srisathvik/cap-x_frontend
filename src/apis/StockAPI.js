import { api } from "./axiosConfig"
import { defineCancelApiObject } from "./axiosUtils"
import urls from "../env"

export const StockApi ={
    get: async function (name, cancel = false) {
        const response = await api.request({
            url: `/${name}?email=${urls.USER_EMAIL}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(StockApi)
