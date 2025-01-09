import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ToolTip } from "./Tooltip";

export function DataCard({ className, title, data,  ...props }) {
  let bgColor = "";
  if(title === "P&L"){
    if(data > 0){
      bgColor += "text-green-500"
    }
    else if(data < 0){
      bgColor += "text-red-500"
    }
  } 
  return (
    <Card className={cn("w-[210px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        
        <div>
              <div className="space-x-1 flex">
                <div className={`text-sm font-medium leading-none ${bgColor}`}>
                $ {data}
                </div>
                {data === 0 && <ToolTip message={"Unable to fetch current stock prices"} />}
              
              </div>
        </div>
      </CardContent>
    </Card>
  )
}
