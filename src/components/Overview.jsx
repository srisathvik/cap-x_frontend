import { DataCard } from "./DataCard";
import { myContext } from "@/App";
import { useContext } from "react";


export function Overview(){
    const {overViewData} = useContext(myContext);
    return(
        <div className="flex flex-wrap justify-stretch max-w-full">
            <DataCard title={"Invested"} data={overViewData? overViewData.investedValue : "..."} />
            <DataCard title={"Current"} data={overViewData? overViewData.currentValue : "..."} />
            <DataCard title={"P&L"} data={overViewData? overViewData.profitLoss : "..."} />
        </div>
    )
}