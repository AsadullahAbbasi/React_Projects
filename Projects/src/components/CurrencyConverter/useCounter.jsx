import { useState,useEffect } from "react";

const useCounter =  (fromCur, toCur) => {
  console.log(fromCur,"fr");
  const [curVal, setCurVal] = useState("0.0035808864");
 let   currencyUpdater ;
  useEffect(() => {
     currencyUpdater =  () => {
     
         fetch(
          `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCur}.min.json`
        )
        .then((Response)=>Response.json())
        .then((response)=> {
          setCurVal(response[fromCur][toCur])    
        })

        
      };
      
      currencyUpdater(); 
    
  }, [fromCur, toCur]);

  return [curVal];
};

export default useCounter;