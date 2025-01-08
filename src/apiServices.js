import axios from 'axios';
import urls from "./env.js";
// import { useToast } from './hooks/use-toast.js';
// import { Toaster } from './components/ui/toaster.jsx';


async function fetchAllStocks(){
  const res = await axios.get("https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv");
  console.log(res);
}


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
async function getPortfolio() {

    const currUrl = urls.BASE_URL + urls.EXTENSION + "/portfolio?email=" + urls.USER_EMAIL;
    console.log(currUrl);
    const res = await axios.get(currUrl);
    console.log(res);
    const data = res.data;
    console.log(data);
    if(res.status === 200){
      return data;
    }
}

// async function currentPrice(symbol) {
  
//   const ext = "&interval=5min&apikey=";
//   const currUrl = urls.CURRENT_PRICE_URL + symbol + ext + urls.KEY_2;
//   console.log(currUrl);
//   const res = await axios.get(currUrl);
//   const data = res.data["Time Series (5min)"][0]["4. close"];
//   // console.log(res.data);
//   if(res.status === 200){
//     return data;
//   }
//   // console.log(res.data.TimeSeries);

// }

async function post(value) {
  // const { toast } = useToast()
  console.log(value);
  const currUrl = urls.BASE_URL + urls.EXTENSION + "/addStock";
  const res = await axios.post(currUrl, value);
  console.log(res);
  if(res.ok){
    // toast({
    //   title: "Success",
    //   message: "Stock added sucessfully",
    // })
    return res;
  }
  
}
async function patch(value) { 


  const currUrl = urls.BASE_URL + urls.EXTENSION + `/updateStock`;
  // console.log(currUrl);
  console.log(value);
  const res = await axios.patch(currUrl, value);
  console.log(res);
  const data = await res.data;
  console.log(data);
  if(res.ok){
    return data;
  }
}


async function put(url, body) {

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