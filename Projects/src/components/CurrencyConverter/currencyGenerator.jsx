import React, { useEffect, useState, useCallback } from "react";
import useCounter from "./useCounter";
import Amount from "./Amount.jsx";
import Intro from "./Intro.jsx";
const CurrencyGenerator = () => {
  return (
    <div className="lg:py-20 py-4">
      <Intro />
      <Amount />
    </div>
  );
};

export default CurrencyGenerator;
