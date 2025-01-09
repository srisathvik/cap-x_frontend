import { Link } from "react-router-dom"
import { TableDemo } from "./StockTable"
import {Overview } from "./Overview"
import { Button } from "./ui/button"
import SearchableTable from "./SearchableTable"
export function Portfolio(){
    return(
        <div className="flex flex-col justify-center">
           <div>
           <Overview />
           <div className="py-3">
                <Link to="./addstock"><Button>Add Stock</Button></Link>
           </div>
           
            </div> 
            <div className="">
                {/* <TableDemo /> */}
                <SearchableTable />
            </div>
            
        </div>
    )
}