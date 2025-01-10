import './App.css'
import { StockInput } from './components/StockInput'
import { Portfolio } from './components/Portfolio'
import { Route, Routes } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import apis from './apis/apiService'
import { useToast } from './hooks/use-toast.js';

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
  const[isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  useEffect(()=>{
    getData("stocks");
    getData("portfolio");
  }, []);

  async function getData(name) {
    setIsLoading(true);
    const res = await apis.get(name);
    setIsLoading(false);
    if(name === "stocks"){
      setStocks(res);
    }
    else if(name === "portfolio"){
      setOverViewData(res);
    }
    
  }
  

  async function handleAddStocks(stock){
    setIsLoading(true);
    const res =  await apis.add(stock);
    setIsLoading(false);
    getData("portfolio");
    setStocks([res, ...stocks]);
  }

  async function handleUpdateStock(stock){
    setIsLoading(true);
    const res = await apis.update(stock);
    setIsLoading(false);
    getData("stocks");
    getData("portfolio");
  }
  async function handleStockDelete(stock){
    let updatedStocks = stocks.filter((currStock) => currStock.ticker !== stock.ticker);
  
    const res= await apis.remove(stock.ticker);
    setIsLoading(false);
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
  if(isLoading){
    return(
      <div className='flex justify-center items-center w-screen h-screen'>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
      
    )
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
