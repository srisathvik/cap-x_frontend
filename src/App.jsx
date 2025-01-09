import './App.css'
import { StockInput } from './components/StockInput'
import { Portfolio } from './components/Portfolio'
import { Route, Routes } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import apis from './apis/apiService'
import { useToast } from './hooks/use-toast.js';
import { StockApi } from './apis/StockAPI'
// import { title } from 'process'

// import { resolve } from 'path'
// const temp = {stockName: 'asdf', ticker: 'asdf', quantity: 1, price: 1};

export const myContext = createContext({
  stocks:[],
  overViewData:{},
  addStock:()=>{},
  modifyStock: undefined,
  setModifyStock: ()=>{},
  updateStock: ()=>{},
  deleteStock: ()=>{},
  getCurrentPrice: ()=>{},
})
function App() {
  // console.log(initialStocks);
  const[stocks, setStocks] = useState([]);
  const[overViewData ,setOverViewData] = useState();
  const[modifyStock, setModifyStock] = useState(undefined);
  const { toast } = useToast();
  // const[shouldRender, setShouldRender] = useState(true);
  useEffect(()=>{
    getData("stocks");
    getData("portfolio");
  }, []);
// console.log(stocks);

  async function getData(name) {
    const res = await apis.get(name);
    if(name === "stocks"){
      setStocks(res);
    }
    else if(name === "portfolio"){
      setOverViewData(res);
    }
    
  }
  

  async function handleAddStocks(stock){
    const res =  await apis.add(stock);
    getData("portfolio");
    setStocks([res, ...stocks]);
  }

  async function handleUpdateStock(stock){
    const res = await apis.update(stock);
    getData("stocks");
    getData("portfolio");
  }
  async function handleStockDelete(stock){
    let updatedStocks = stocks.filter((currStock) => currStock.ticker !== stock.ticker);
    // console.log(updatedStocks);
    // setStocks(updatedStocks);
    const res= await apis.remove(stock.ticker);
    setStocks(updatedStocks);
    getData("portfolio");
    // getData();
  }

  const ctxValue = {
    stocks,
    overViewData,
    addStock: handleAddStocks,
    modifyStock,
    setModifyStock,
    updateStock: handleUpdateStock,
    deleteStock: handleStockDelete,
  }

  return (
    <myContext.Provider value={ctxValue}>
      <div className='flex w-screen justify-center'>
        
          {/* <div className='outer'> */}
            <Routes>
              <Route path='/' element={ <Portfolio /> } />
              <Route path='/addstock' element={ <StockInput /> } />
            </Routes>
          {/* </div> */}
          
        {/* <StockInput prev_stock={temp}/> */}
      </div>
    </myContext.Provider>
    
  )
}

export default App
