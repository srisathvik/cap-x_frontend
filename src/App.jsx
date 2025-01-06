import './App.css'
import { StockInput } from './components/StockInput'
import { Portfolio } from './components/Portfolio'
import { Route, Routes } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import apis from './apiServices'
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
  // const[shouldRender, setShouldRender] = useState(true);
  useEffect(()=>{
    getData();
    // apis.loadStocks();
  }, []);


  async function getData() {
    const StocksRes = await apis.getStocks();
    // const currPrice = await apis.currentPrice("IBM");
    setStocks(StocksRes);
  }
  
  async function getCurrentPrice(symbol) {
    const currPrice = await apis.currentPrice(symbol);
    return currPrice; 
  }

  async function handleAddStocks(stock){
    await apis.post(stock);

    // again fetching the updated data.
    getData();
  }
  async function handleUpdateStock(modifyStock){
    let updatedStocks = stocks.map((currStock)=>{
      if(currStock.id === modifyStock.id){

        return modifyStock;
      }
      else{
        return currStock
      }
      
    })
    setStocks([...updatedStocks]);
  }
  async function handleStockDelete(stock){
    let updatedStocks = stocks.filter((currStock) => currStock.id !== stock.id);
    setStocks([...updatedStocks]);
    const res= await apis.delete(stock.id);
  }
  const ctxValue = {
    stocks,
    overViewData,
    addStock: handleAddStocks,
    modifyStock,
    setModifyStock,
    updateStock: handleUpdateStock,
    deleteStock: handleStockDelete,
    getCurrentPrice,
  }
  return (
    <myContext.Provider value={ctxValue}>
      <div>
        <Routes>
            <Route path='/' element={ <Portfolio /> } />
            <Route path='/addstock' element={ <StockInput /> } />
          </Routes>
        {/* <StockInput prev_stock={temp}/> */}
      </div>
    </myContext.Provider>
    
  )
}

export default App
