import React from 'react'

const Intro = () => {
  return (
    <section className="w-full">
    <div className="max-w-[1440px] mx-auto px-3 sm:px-0 mb-2 sm:mb-4">
      <div className="headings text-center flex items-center flex-col  md:gap-3">
        <h1 className="text-[#1F2261] font-roboto text-2xl font-bold text-center md:text-4xl">
          Currency Converter
        </h1>
        <p className="text-[#808080] font-normal text-c text-md md:text-xl  max-w-[447px] ">
          Effortlessly convert currencies with this user-friendly{" "}
          <span className="hidden md:inline-block ">and intuitive </span>{" "}
          currency converter tool
        </p>
      </div>

      
    </div>
  </section>
  )
}

export default Intro
