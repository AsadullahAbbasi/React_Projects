import React, { useEffect, useState } from "react";
import useCounter from "./useCounter.jsx";
import Icon from "./icons/icon01.png";
import Select from "react-select";
import flags from "./flagData.js";

const Amount = () => {

  const [curList, setCurList] = useState([]);
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const currenciesList = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
      )
        .then((Response) => Response.json())
        .then((Response) => setCurList(Object.keys(Response)));
      setTimeout(() => {}, 3000);
    };

    fetcher();
  }, []);

  const currencies = curList.map((val) => ({ value: val, label: val }));
  const [flagfrom, setFlagFrom] = useState(
    "https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/pkr.svg"
  );
  const [flagto, setFlagto] = useState(
    "https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/usd.svg"
  );
  const [displayAmount, setDisplayAmount] = useState(0);
  const [fromCur, setFromCur] = useState("pkr");
  const [toCur, setToCur] = useState("usd");
  const [curVal] = useCounter(fromCur, toCur);

  const [userAmount, setUSerAmount] = useState(0);
  const handleAmount = (e) => {
    setUSerAmount("");
    if (e.target.value !== "") {
      const newAmount = parseFloat(e.target.value);
      if (swap === false) {
        setUSerAmount(newAmount);
        setDisplayAmount((curVal * newAmount).toFixed(3));
      } else {
        setDisplayAmount(newAmount);
        setUSerAmount((curVal * newAmount).toFixed(3));
      }
    } else {
      setDisplayAmount("");
    }
  };

  const handleFrom = async ({ value }) => {
    setFromCur(value);
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${value.toLowerCase()}.svg`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch currency flag");
      }
      const flagUrl = `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${value.toLowerCase()}.svg`;
      setFlagFrom(flagUrl);
    } catch (error) {
      console.log(error);
      setFlagFrom(
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTg2LWZyb3duaW5nZmFjZS0wM18zLWw5ZDNieHByLnBuZw.png"
      );
    }

    setUSerAmount("");
    setDisplayAmount("");
  };

  const handleTo = async ({ value }) => {
    setToCur(value);
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${value.toLowerCase()}.svg`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch currency flag");
      }
      const flagUrl = `https://raw.githubusercontent.com/Lissy93/currency-flags/master/assets/flags_svg/${value.toLowerCase()}.svg`;
      setFlagto(flagUrl);
    } catch (error) {
      console.log(error);
      setFlagto(
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTg2LWZyb3duaW5nZmFjZS0wM18zLWw5ZDNieHByLnBuZw.png"
      );
    }

    setUSerAmount("");
    setDisplayAmount("");
  };

  const swaper = () => {
    setSwap(!swap);
    const tempCur = fromCur;
    setFromCur(toCur);
    setToCur(tempCur);
    setDisplayAmount(0);
    setUSerAmount(0);
    // Call handleFrom and handleTo with updated values
    handleFrom({ value: toCur });
    handleTo({ value: fromCur });
  };

  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto text-center px-4">
        <div className="m1 max-w-[400px] sm:max-w-[520px] mx-auto px-3 sm:px-5 bg-[#FFF]  rounded-lg py-5">
          <div>
            <p className="text-[#989898] font-roboto text-[15px] mb-[14px]  hidden sm:block">
              Amount
            </p>
            <div className="flex justify-between gap-6 sm:gap-4 sm:flex-row flex-col-reverse">
              <div className="flex  gap-[13px] sm:justify-center  justify-between  ">
                <img
                  className="rounded-full w-[45px] h-[45px]  object-cover"
                  src={flagfrom}
                  alt=""
                />
                <Select
                  onFocus={() => {
                    setFromCur("");
                  }}
                  options={currencies}
                  value={{ value: fromCur, label: fromCur.toLocaleUpperCase() }}
                  className="text-[#26278D] font-medium max-w-[175px] flex-1  text-xs sm:text-lg"
                  maxMenuHeight={60}
                  onChange={handleFrom}
                  openMenuOnClick
                  styles={{
                    input: (provided) => ({
                      ...provided,
                      minWidth: "100px",
                    }),
                  }}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-[#989898] font-roboto text-lg flex items-center     sm:hidden ">
                  Amount
                </p>
                <input
                  type="number"
                  className="outline-none bg-[#EFEFEF] rounded-lg  py-[10px] max-h-10 max-w-[175px] sm:max-w-[] pr-[28px]  text-right  "
                  onChange={handleAmount}
                  value={swap ? displayAmount : userAmount}
                  onClick={() => {
                    if (userAmount === 0) {
                      setUSerAmount("");
                      setDisplayAmount("");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="sm:mt-12 sm:mb-6 mt-10 mb-4 relative">
            <p className="bg-[#E7E7EE] border-b-2 "></p>
            <button>
              <img
                onClick={swaper}
                src={Icon}
                alt="icon"
                className="absolute left-[45%] top-[-20px]"
              />
            </button>
          </div>
          <div>
            <p className="text-[#989898] font-roboto text-[15px] mb-[14px]  hidden sm:block">
              Converted Amount
            </p>
            <div className="flex justify-between gap-6 sm:gap-4 sm:flex-row flex-col-reverse  ">
              <div className=" flex  gap-[13px] sm:justify-center  justify-between ">
                <img
                  className="rounded-full w-[45px] h-[45px]  object-cover"
                  src={flagto}
                  alt=""
                />
                <Select
                  onFocus={() => {
                    setToCur("");
                  }}
                  onChange={handleTo}
                  options={currencies}
                  // placeholder="Select a currency"
                  value={{ value: toCur, label: toCur.toLocaleUpperCase() }}
                  className="text-[#26278D] font-medium max-w-[175px] text-xs sm:text-lg "
                  maxMenuHeight={100}
                  openMenuOnClick
                  styles={{
                    input: (provided) => ({
                      ...provided,
                      minWidth: "120px",
                    }),
                  }}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-[#989898] font-roboto text-sm flex flex-col items-center   sm:hidden ">
                  Converted Amount
                </p>
                <input
                  value={swap ? userAmount : displayAmount}
                  type="text"
                  readOnly
                  className="outline-none bg-[#EFEFEF] rounded-lg  py-[10px] max-h-10 max-w-[175px] sm:max-w-[] pr-[28px]  text-right  "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-0 pt-5">
          <p className="text-[#A1A1A1] font-roboto text-sm  md:text-2xl ">
            Indicative Exchange Rate
          </p>
          <p className="text-black font-medium text-sm md:text">
            1 {fromCur} = {curVal} {toCur}{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Amount;
