import { Link } from "react-router-dom"
import { TableDemo } from "./StockTable"
import {Overview } from "./Overview"
import { Button } from "./ui/button"
export function Portfolio(){
    return(
        <div>
            
            <Overview />
            <Link to="./addstock"><Button>Add Stock</Button></Link>
            <TableDemo />
        </div>
    )
}