import React, { useState, useEffect, useCallback, useRef } from "react";
import "../App.css";

const Passwordgenerator = () => {
  const [Password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [char, setChar] = useState(false);
  const [num, setNum] = useState(false);
  const InputElem = useRef();

  const generatePassword = useCallback(() => {
    console.log("comp rendered");
    let temp_Password = "";
    let finalPass = "";
    let str = "AbCdEfGhIjKlMnOwXyZ";
    let characters = "!@#$%^&*_";
    let numbers = "123456789";
    temp_Password += str;
    if (char) {
      temp_Password += characters;
    }

    if (num) {
      temp_Password += numbers;
    }
    for (let i = 0; i < length; i++) {
      const RandomNum = Math.floor(Math.random() * temp_Password.length);
      console.log(RandomNum);
      finalPass += temp_Password.charAt(RandomNum);
    }
    setPassword(finalPass);
  }, [length, char, num]);

  const copy = (e) => {
    window.navigator.clipboard.writeText(Password);
    passwordInput.select();
    InputElem.current.classList.remove("hidden");
    InputElem.current.classList.add("myAnimatedElement", "block");

    setTimeout(() => {
      e.target.innerHTML = "Copy";
      window.navigator.clipboard.writeText("Copy");
      InputElem.current.classList.add("hidden");
      InputElem.current.classList.remove("myAnimatedElement", "block");
    }, 2000);
  };
  useEffect(() => {
    generatePassword();
  }, [length, char, num]);

  return (
    <div className="max-w-[800px] py-14 md:py-20 mx-auto  sm:px-4">
      <div className="flex flex-col justify-between md:h-36 h-40 lg:h-40 bg-blue-700 py-4 sm:px-6 px-2 sm:rounded-xl">
        <div className="flex w-full py-2 sm:py-0">
          <div className="w-[80%] bg-purple-800 h-10  pt-2  rounded-xl rounded-r-none   ">
            <p className="relative  inline text:lg md:text-xl  left-[10%]">
              {Password}
              <p
                ref={InputElem}
                className="absolute hidden top-0 text-4xl text-white  "
              >
                {Password}
              </p>
            </p>
          </div>

          <button
            className="bg-blue-500 w-[20%] rounded-l-none rounded-xl "
            onClick={(e) => copy(e)}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between  gap-4  sm:px-4">
          <input
            type="range"
            className="w-[40%]"
            min={8}
            max={16}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <div className="flex  flex-1 text-2xl">
            <p className="flex-1"> Lenght({length})</p>
            <p className="className flex-1">
              Char <input type="checkbox" onChange={() => setChar(!char)} />
            </p>
            <p className="flex-1 flex gap-2">
              <input
                className="text-left"
                type="checkbox"
                id="passwordInput"
                onChange={() => setNum(!num)}
              />
              Number
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passwordgenerator;
