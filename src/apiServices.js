import axios from 'axios';
import urls from "./env.js";

const BASE_URL = 'http://localhost:9192'
var ext = '/stocks'

// const axios = require('axios');

async function fetchAllStocks(){
  const res = await axios.get("https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv");
  console.log(res);
}
async function getStocks() {

    // return new Promise(function(resolve){ resolve(initialStocks)})


  const currUrl = BASE_URL + ext + "/all";
  console.log(currUrl);
  const res = await axios.get(currUrl);
  console.log(res);
  const data = res.data;
  console.log(data);
  if(res.status === 200){
    return data;
  }
}
async function getOverview() {

    // return new Promise(function(resolve){ resolve(initialStocks)})


  const currUrl = BASE_URL + ext + "/overview";
  const res = await axios(currUrl)
  const data = res.data;
  // console.log(data);

  if(res.status === 200){
    return data;
  }
}

async function currentPrice(symbol) {
  
  const ext = "&interval=5min&apikey=";
  const currUrl = urls.currPriceURL + symbol + ext + urls.key2;
  console.log(currUrl);
  const res = await axios.get(currUrl);
  const data = res.data["Time Series (5min)"][0]["4. close"];
  // console.log(res.data);
  if(res.status === 200){
    return data;
  }
  // console.log(res.data.TimeSeries);

}

async function post(value) {

    // initialStocks.unshift(value);



  console.log(value);
  const currUrl = BASE_URL + ext + "/add";
  const res = await axios.post(currUrl, value);
  // const data = await res;
  console.log(res);
  // if(res.ok){
  //   return data;
  // }
  
}
async function put(value) { 


  const currUrl = BASE_URL + ext + `/tasks/update`;
  // console.log(currUrl);
  // console.log(value);
  const res = await axios.put(currUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value),
  })
  const data = await res.json();
  // console.log(data);
  if(res.ok){
    return data;
  }
}


async function patch(url, body) {

}


async function remove(id) {
  // console.log(id);
  const currUrl = BASE_URL + ext + `/delete/${id}`;
  const res = await axios.delete(currUrl);
  // const data = res.json();
  if(res.ok){
    return data;
  }
}

export default {
    getStocks,
    getOverview,
    post,
    put,
    patch,
    delete: remove,
    loadStocks: fetchAllStocks,
    currentPrice
}