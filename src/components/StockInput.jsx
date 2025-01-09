
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { myContext } from "@/App"
import { Link } from "react-router-dom"






// import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
 
import { cn } from "@/lib/utils"
// import { toast } from "@/components/hooks/use-toast"
// import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"




const formSchema = z.object({
  stockName: z.string().min(2, {
    message: "stockName must be at least 2 characters."
  }),
  ticker: z.string().min(2, {
    message: "ticker must be at least 2 characters."
  }),
  quantity: z.coerce.number().min(1, {message: "The quantity must be atleast 1"}),

  investedValue: z.coerce.number().min(1, {message: "The Buying Price must be atleast 1"}),

  purchaseDate: z.date({
    required_error: "Buying Date is required",
  }),
})


export function StockInput() {
  // ...
  const {modifyStock, addStock, setModifyStock, updateStock} = useContext(myContext);
  const navigate = useNavigate();
  console.log(modifyStock);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockName: modifyStock?.stockName || "",
      ticker: modifyStock?.ticker || "",
      quantity:modifyStock?.quantity || "",
      investedValue: modifyStock?.investedValue || "",
      purchaseDate: modifyStock? new Date(modifyStock.purchaseDate) : "",
      
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    values.purchaseDate = values.purchaseDate.toISOString().split('T')[0];
    values.userId = 1;
    console.log(values);

    if(modifyStock){
        //make appi call to edit the stock
        let newStock = {...modifyStock, ...values};
        updateStock(newStock);
        setModifyStock(undefined);
    }

    else{
        //make api call to add the stock.
        addStock(values);
    }

    form.reset();
    navigate("../")
  }

  return (
    <div className="flex flex-col">
        <Link className="py-5" to="../">{"< Back"}</Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="stockName"
              render={({ field }) => (
                <>
                    <FormItem>
                        <FormLabel>Stock Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Your buying stock Name" {...field} disabled={modifyStock !== undefined}/>
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                </>
                
              )}
            />
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <>
                    <FormItem>
                        <FormLabel>Stock Ticker</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Your stock ticker" {...field} disabled={modifyStock !== undefined}/>
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                </>
                
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <>
                    <FormItem>
                        <FormLabel>Stock quantity</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Your buying stock quantity" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                </>
                
              )}
            />
            <FormField
              control={form.control}
              name="investedValue"
              render={({ field }) => (
                <>
                    <FormItem>
                        <FormLabel>Buying Price</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Your invested Value Amount" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                </>
                
              )}
            />
            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <>
                    <FormItem className="flex flex-col">
                  <FormLabel>Date of buying date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-100" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {/* <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      /> */}
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="bg-white"
                        // footer={
                        //   selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                        // }
                        disabled={date =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <FormMessage />
                </FormItem>
                </>
                
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
    </div>
    
  )
}