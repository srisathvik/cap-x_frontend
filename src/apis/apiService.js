import { apiClient } from "./apiClient"
import urls from "../env"
import { notification } from "antd"

function displaySuccessMessage(message){
    notification.success({
        placement: "bottomRight",
        description: message,
    })
}
function displayErrorMessage(message){
    notification.error({
        placement: "bottomRight",
        description: message,
    })
}

async function get(type){
    try{
        const res = await apiClient.get(`/${type}?email=` + urls.USER_EMAIL)
        console.log(res);
        if(res && res.data){
            return res.data;
        }
        
    }
    catch(err){
        console.log(err);
        if(err.response){
            displayErrorMessage(err.response.data.errorMessage);
        }
        else{
            displayErrorMessage(err.message)
        }
        
    }
}

async function update(stock) {
    try{
        const res = await apiClient.patch("updateStock", stock);
        if(res && res.data){
           displaySuccessMessage("stock updated successfully");
        }
    }
    catch(err){
        console.log(err);
        if(err.response){
            displayErrorMessage(err.response.data.errorMessage)
        }
        else{
            displayErrorMessage(err.message)
        }
    }
}

async function add(stock){
    try{
        console.log(stock);
        const res = await apiClient.post("addStock", stock);
        console.log(res);
        if(res && res.data){
           displaySuccessMessage("stock added successfully")
            return res.data;
        }
    }
    catch(err){
        if(err.response){
            displayErrorMessage(err.response.data.errorMessage)
        }
        else{
            displayErrorMessage(err.message)
        }
    }
}
async function remove(ticker) {
    try{
        const res = await apiClient.delete(`/deleteStock?userId=${urls.USER_ID}&ticker=${ticker}`)
        console.log(res);
        if(res && res.data){
            displaySuccessMessage(res.data)
            // return data;
        }
    }
    catch(err){
        console.log(err);
        if(err.response){
            displayErrorMessage(err.response.data.errorMessage)
        }
        else{
            displayErrorMessage(err.message)
        }
    }
}
export default {
    get,
    add, 
    remove, 
    update
}