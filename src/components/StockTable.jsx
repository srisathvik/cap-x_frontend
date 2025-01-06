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
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

  
  
  export function TableDemo() {
    const [hovered, setHovered] = useState();
    const{stocks, setModifyStock, deleteStock, getCurrentPrice} = useContext(myContext);
    const navigation = useNavigate();
    function handleEdit(stock){
      setModifyStock(stock);
      navigation("./addStock");
      // console.log(stock);
    }
    function handleDelete(stock){
      const res = deleteStock(stock).then(alert);
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
            <TableHead>Curent Amount</TableHead>
            <TableHead className="text-center">P&L</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id} onMouseEnter={e => {
              setHovered(stock.id);
          }}
          onMouseLeave={e => {
              setHovered(undefined);
          }}>
           {/* {let p = (stock.quantity * stock.current_price) - (stock.quantity * stock.buying_price)} */}
              {/* <div > */}
                <TableCell className="font-medium">{stock.stock_name}</TableCell>
                {/* <TableCell className="font-medium">{stock.ticker}</TableCell> */}
                <TableCell className="text-center">{stock.quantity}</TableCell>
                <TableCell className="text-center">{stock.buying_price * stock.quantity}</TableCell>
                <TableCell className="text-center">{(stock.current_price) * stock.quantity}</TableCell>
                <TableCell className={`text-center ${stock.p_and_l   > 0? "text-green-500" : "text-red-500"}`}>
                  <div>
                    <p>{stock.p_and_l}</p>
                    <p>({(100 * stock.p_and_l / stock.buying_price).toFixed(2)} % )</p>
                  </div>  
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex p-px" style={{visibility: hovered === stock.id ? "visible" : "hidden"}} >
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
  