import { useState, useEffect } from "react";

const useCounter = (fromCur, toCur) => {
  const [curVal, setCurVal] = useState("0.0035808864");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCur}.min.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }
        const data = await response.json();
        setCurVal(data[fromCur][toCur]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, [fromCur, toCur]);

  return [curVal];
};

export default useCounter;
