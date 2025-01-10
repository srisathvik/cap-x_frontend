import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption,  } from "@/components/ui/table"
import { myContext } from "@/App";
import { Trash2, Pencil } from 'lucide-react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToolTip } from "./Tooltip";


export default function StockTable({}) {
    const [hovered, setHovered] = useState();
    const{stocks, setModifyStock, deleteStock} = useContext(myContext);
    const [searhchableData, setSearchableData] = useState("");
    const [timer, setTimer] = useState(null);
    
    const navigation = useNavigate();

    function handleEdit(stock){
      setModifyStock(stock);
      navigation("./addStock");
    }
    function handleDelete(stock){
      const res = deleteStock(stock);
    }

    function handleSearch(data){
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
          }
          setTimer(
            setTimeout(() => {
              setSearchableData(data);
            }, 750)
          );
    }

    const fiteredStocks = stocks.filter((stock)=> stock.stockName.toLowerCase().includes(searhchableData.toLowerCase()));
    return (
        <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
            <div className="flex flex-col gap-4">
                <form className="grid gap-4">
                <div className="space-y-2">
                    <Input id="search" placeholder="Search stocks..." onChange={(e)=>{handleSearch(e.target.value)}}/>
                </div>

                </form>
            </div>
            <div className="grid gap-6 md:gap-8">
                
                <Table>
                    <TableCaption>A list of your recent Stocks.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Stock</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Invested Amount</TableHead>
                                <TableHead>Current Amount</TableHead>
                                <TableHead className="text-center">P&L</TableHead>
                                <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fiteredStocks.map((stock) => (
                            <TableRow key={stock.ticker} onMouseEnter={e => {
                            setHovered(stock.ticker);
                        }}
                        onMouseLeave={e => {
                            setHovered(undefined);
                        }}>
                        
                                <TableCell className="font-medium">{stock.stockName}</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </div>
        </div>
        </main>
    )
}
