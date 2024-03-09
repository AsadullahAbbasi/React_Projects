import React, { useState, useCallback, useEffect } from 'react';

const Test = () => {
  const [state, setState] = useState(0);

  // Declare originalFunction before using it
  const originalFunction = () => {
    console.log("Original Function");
  };
  const change = originalFunction
  const [currentFunction, setCurrentFunction] = useState(() => originalFunction);

  const handleClick = useCallback(() => {
    console.log('Button clicked!');
    setState((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (currentFunction !== change) {
      console.log("Function reference has changed after render");
    }
  }, [currentFunction]);

  console.log(handleClick);

  return (
    <div>
      <h1>Parent Component</h1>
      <button onClick={handleClick}>Click {state}</button>
    </div>
  );
};

export default Test;
