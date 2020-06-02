import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [binary, setBinary] = useState();
  const [length, setLength] = useState();
  const [inputError, setInputError] = useState('');
  const [decimal, setDecimal] = useState();

  useEffect(() => {
    function validateInput(binary, length) {
      let bin = binary;
      if (!bin) return ' ';
      let leng = length;
      while (leng > 0) {
        if ((bin % 10) === 0 || (bin % 10) === 1) leng--;
        else return 'Input must be 0 or 1';
      }
    }
    setInputError(validateInput(binary, length));
  }, [binary, length]);

  const convertBinary = (binary, length) => {
    if (inputError) return;
    let digit, decimal = 0, exp = 0;
    let bin = parseInt(binary);
    let leng = length;

    while (leng > 0) {
      digit = parseInt(bin % 10);
      decimal = decimal + (digit * (2 ** exp));
      bin = bin / 10;
      leng--;
      exp++;
    }

    setDecimal(decimal);
  }


  const setValues = (input) => {
    setBinary(input);
    setLength(input.toString().length);
  }

  return (
    <div className="App">
      <h1>Binary to Decimal Converter</h1>
      <input type="text" placeholder="Enter a binary number" maxLength="8" onChange={(e) => { setValues(e.target.value) }}></input>
      <button onClick={() => { convertBinary(binary, length) }} disabled={inputError}>Convert</button>
      <span style={{ fontSize: 12, color: 'red', paddingLeft: 12 }}>{inputError}</span>
      <h1>{decimal}</h1>
    </div >
  );
}

export default App;
