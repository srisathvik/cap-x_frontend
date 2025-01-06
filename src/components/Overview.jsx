import { DataCard } from "./DataCard";
import { myContext } from "@/App";
import { useContext } from "react";


export function Overview(){
    const {overViewData} = useContext(myContext);
    return(
        <div className="inline-flex justify-between max-w-full">
            <DataCard title={"Invested"} data={overViewData? overViewData.initialPrice : 20000} />
            <DataCard title={"Current"} data={overViewData? overViewData.currentPrice : 30000} />
            <DataCard title={"P&L"} data={overViewData? overViewData.pAndL : 10000} />
        </div>
    )
}