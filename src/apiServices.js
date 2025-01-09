import axios from 'axios';
import urls from "./env.js";
// import { useToast } from './hooks/use-toast.js';
// import { Toaster } from './components/ui/toaster.jsx';

// const url_base = 

async function fetchAllStocks(){
  const res = await axios.get("https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv");
  console.log(res);
}


// async function get(datatype) {
  
// }







async function getStocks() {

  const currUrl = urls.BASE_URL + urls.EXTENSION + "/stocks?email=" + urls.USER_EMAIL;
  // console.log(currUrl);
  const res = await axios.get(currUrl);
  console.log(res.data);
  // const data = res.data;
  if(res.status === 200){
    // Toaster
    return res.data;
  }
  else{
    return res.data.message;
  }
}

async function post(value) {

  console.log(value);
  const currUrl = urls.BASE_URL + urls.EXTENSION + "/addStock";
  const res = await axios.post(currUrl, value);
  console.log(res);
  if(res.status === 201){
    return res;
  }
  
}
async function patch(value) { 


  const currUrl = urls.BASE_URL + urls.EXTENSION + `/updateStock`;
  // console.log(currUrl);
  console.log(value);
  const res = await axios.patch(currUrl, value);
  return res;
}



async function remove(ticker) {

  const currUrl = urls.BASE_URL + urls.EXTENSION + `/deleteStock?userId=${urls.USER_ID}&ticker=${ticker}`;
  const res = await axios.delete(currUrl);
  console.log(res);
  if(res.ok){
    return data;
  }
}

export default {
    getStocks,
    getPortfolio,
    post,
    put: patch,
    delete: remove,
    loadStocks: fetchAllStocks,
}