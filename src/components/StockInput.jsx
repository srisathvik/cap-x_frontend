
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DayPicker } from "react-day-picker"
import "./react-day-picker.css";

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
  stock_name: z.string().min(2, {
    message: "stock_name must be at least 2 characters."
  }),
  ticker: z.string().min(2, {
    message: "ticker must be at least 2 characters."
  }),
  quantity: z.coerce.number().min(1, {message: "The quantity must be atleast 1"}),
  buying_price: z.coerce.number().min(1, {message: "The Buying Price must be atleast 1"}),
  buying_date: z.date({
    required_error: "Buying Date is required",
  }),
})


export function StockInput() {
  // ...
  const {modifyStock, addStock, setModifyStock, updateStock} = useContext(myContext);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock_name: modifyStock?.stock_name || "",
      ticker: modifyStock?.ticker || "",
      quantity:modifyStock?.quantity || "",
      buying_price: modifyStock?.buying_price || "",
      buying_date: modifyStock? new Date(modifyStock.buying_date) : "",
      
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.buying_date = `${values.buying_date}`;
    // console.log(typeof(values.buying_date));
    // values.JSON.stringify(values.buying_date);

    values.p_and_l = 200;
    // values.id = Math.floor(Math.random() * (100 - 3 + 1) + 3);
    values.currentPrice = 400;
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
    // console.log(values)
    form.reset();
    navigate("../")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="stock_name"
          render={({ field }) => (
            <>
                <FormItem>
                    <FormLabel>Stock Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter Your buying stock Name" {...field} />
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
                        <Input placeholder="Enter Your stock ticker" {...field} />
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
          name="buying_price"
          render={({ field }) => (
            <>
                <FormItem>
                    <FormLabel>Buying Price</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter Your buying_price Amount" {...field} />
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
          name="buying_date"
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
                  <DayPicker
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
  )
}
