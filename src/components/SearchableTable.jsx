/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GlJLFuwziKM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption,  } from "@/components/ui/table"


import { myContext } from "@/App";

// import { Button } from "./ui/button"
import { Trash2, Pencil } from 'lucide-react';
// import {  } from 'lucide-react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToolTip } from "./Tooltip";


export default function SearchableTable({}) {
    const [hovered, setHovered] = useState();
    const{stocks, setModifyStock, deleteStock} = useContext(myContext);
    const [searhchableData, setSearchableData] = useState("");
    const [timer, setTimer] = useState(null);
    
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

    function handleSearch(data){
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
          }
          setTimer(
            setTimeout(() => {
              setSearchableData(data);
            }, 1500)
          );
    }
    const fiteredStocks = stocks.filter((stock)=> stock.stockName.toLowerCase().includes(searhchableData.toLowerCase()));
    return (
        <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
            <div className="flex flex-col gap-4">
                {/* <h1 className="text-2xl font-bold tracking-tight">Data Table</h1> */}
                <form className="grid gap-4">
                <div className="space-y-2">
                    {/* <Label htmlFor="search">Search</Label> */}
                    <Input id="search" placeholder="Search stocks..." onChange={(e)=>{handleSearch(e.target.value)}}/>
                </div>
                {/* <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="filter">
                    <AccordionTrigger className="text-base">Filter</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-2">
                        <Label className="flex items-center gap-2 font-normal">
                            <Checkbox id="filter-1" /> Filter 1
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                            <Checkbox id="filter-2" /> Filter 2
                        </Label>
                        <Label className="flex items-center gap-2 font-normal">
                            <Checkbox id="filter-3" /> Filter 3
                        </Label>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion> */}
                </form>
            </div>
            <div className="grid gap-6 md:gap-8">
                {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="grid gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Data Table</h1>
                    <p className="text-gray-500 dark:text-gray-400">Filter, sort, and search the data.</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto shrink-0">
                        <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                        Sort by
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]" align="end">
                    <DropdownMenuRadioGroup value="column1">
                        <DropdownMenuRadioItem value="column1">Column 1</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="column2">Column 2</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="column3">Column 3</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div> */}
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
                        {fiteredStocks.map((stock) => (
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
                </Table>
            </div>
            </div>
        </div>
        </main>
    )
}
