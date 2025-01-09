import { myContext } from "@/App";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
// import { Button } from "./ui/button"
import { Trash2, Pencil } from 'lucide-react';
// import {  } from 'lucide-react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToolTip } from "./Tooltip";
  
  
  export function TableDemo() {
    const [hovered, setHovered] = useState();
    const{stocks, setModifyStock, deleteStock} = useContext(myContext);
    const navigation = useNavigate();
    function handleEdit(stock){
      setModifyStock(stock);
      navigation("./addStock");
      // console.log(stock);
    }
    function handleDelete(stock){
      const res = deleteStock(stock);
      // console.log(stock);
    }
    return (
      <Table>
        <TableCaption>A list of your recent Stocks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Stock</TableHead>
            {/* <TableHead>Ticker</TableHead> */}
            <TableHead>Quantity</TableHead>
            <TableHead>Invested Amount</TableHead>
            <TableHead>Current Amount</TableHead>
            <TableHead className="text-center">P&L</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.ticker} onMouseEnter={e => {
              setHovered(stock.ticker);
          }}
          onMouseLeave={e => {
              setHovered(undefined);
          }}>
           {/* {let p = (stock.quantity * stock.current_price) - (stock.quantity * stock.buying_price)} */}
              {/* <div > */}
                <TableCell className="font-medium">{stock.stockName}</TableCell>
                {/* <TableCell className="font-medium">{stock.ticker}</TableCell> */}
                <TableCell className="text-center">{stock.quantity}</TableCell>
                <TableCell className="text-center">{stock.investedValue * stock.quantity}</TableCell>
                <TableCell className="text-center">
                  <div className="flex p-px">
                    {`${(stock.currentValue * stock.quantity).toFixed(2)} `}
                    {stock.errorMessage && <ToolTip message={stock.errorMessage} />}
                  </div>
                </TableCell>
                <TableCell className={`text-center ${(stock.currentValue * stock.quantity) - (stock.investedValue * stock.quantity)   > 0? "text-green-500" : "text-red-500"}`}>
                  <div>
                    <p>{((stock.currentValue * stock.quantity) - (stock.investedValue * stock.quantity)).toFixed(2)}</p>
                    <p>({(((stock.currentValue - stock.investedValue) / stock.investedValue) * 100) .toFixed(2)} % )</p>
                  </div>  
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex p-px" style={{visibility: hovered === stock.ticker ? "visible" : "hidden"}} >
                      <div className="p-1" onClick={() =>{handleEdit(stock)}}><Pencil className="w-4 h-4" /></div>
                      <div className="p-1" onClick={()=>{handleDelete(stock)}}><Trash2 className="w-4 h-4" /></div>
                  </div>
                </TableCell>
              {/* </div> */}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }
  