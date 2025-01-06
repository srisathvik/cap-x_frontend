import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

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
              <div className="space-y-1">
                <p className={`text-sm font-medium leading-none ${bgColor}`}>
                ₹ {data}
                </p>
              </div>
        </div>
      </CardContent>
    </Card>
  )
}
