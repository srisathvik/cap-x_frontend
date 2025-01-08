import './App.css'
import { StockInput } from './components/StockInput'
import { Portfolio } from './components/Portfolio'
import { Route, Routes } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import apis from './apiServices'
import { useToast } from './hooks/use-toast.js';
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
    getData();
    // apis.loadStocks();
  }, []);


  async function getData() {
    console.log('requested')
    const stocksRes = await apis.getStocks();
    // const getOverview  = await apis.getPortfolio();
    getPortfolio();

    // const currPrice = await apis.currentPrice("IBM");
    // toast({
    //   message: stocksRes.message,
    // })
    setStocks(stocksRes);
    
  }
  
  async function getPortfolio() {
    const getOverview  = await apis.getPortfolio();
    setOverViewData(getOverview);
    return getOverview; 
  }

  async function handleAddStocks(stock){
    const res =  await apis.post(stock);
    console.log(res);
    // if(res.status === 200){
    //   toast({
    //     title: Success,
    //       message: "Stock added sucessfully",
    //     })
    // }
    // again fetching the updated data.
    getData();
  }
  async function handleUpdateStock(modifyStock){
    await apis.put(modifyStock);
    getData();
    // setStocks([...updatedStocks]);
  }
  async function handleStockDelete(stock){
    let updatedStocks = stocks.filter((currStock) => currStock.ticker !== stock.ticker);
    console.log(updatedStocks);
    setStocks(updatedStocks);
    const res= await apis.delete(stock.ticker);
    getPortfolio();
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
