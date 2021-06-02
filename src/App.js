import logo from './logo.svg';
// import eu from './eu.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL_CODES = 'https://v6.exchangerate-api.com/v6/eb1f59571b8e084790d86afe/codes'
const BASE_URL = 'https://v6.exchangerate-api.com/v6/eb1f59571b8e084790d86afe/latest/EUR'
const CUSTOM_URL = 'https://v6.exchangerate-api.com/v6/eb1f59571b8e084790d86afe/latest/'

// https://v6.exchangerate-api.com/v6/eb1f59571b8e084790d86afe/latest/USD

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  // console.log(currencyOptions)

  // From currency
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  // console.log(exchangeRate)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  // ES5
  // const distinct = (value, index, self) => {
  //   return self.indexOf(value) === index;
  // }
  // const distinctValues = currencyOptions.filter(distinct);
  // console.log(distinctValues)

  // ES6 - Need to filter the Array for Distinct Values or error will occur with duplicate keys as EUR was in twice in the array [ uncomment console.log(currencyOptions) to see ]
  const distinctValues = [...new Set(currencyOptions)];
  // console.log(distinctValues)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const firstCurrency = Object.keys(data.conversion_rates)[47]
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        setExchangeRate(data.conversion_rates[firstCurrency])
      }
      )
  }, [])

  // Anytime the value from fromCurrency, or toCurrency changes create new fetch 
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://v6.exchangerate-api.com/v6/eb1f59571b8e084790d86afe/latest/${fromCurrency}`)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.conversion_rates)[47]
          setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
          setFromCurrency(data.base_code)
          setToCurrency(firstCurrency)
          setExchangeRate(data.conversion_rates[firstCurrency])

          setExchangeRate(data.conversion_rates[toCurrency])
          console.log(data)
        })
      console.log({ fromCurrency })
    }

  }, [fromCurrency, toCurrency])



  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
    // console.log(e.target.value)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    // Need to wrap in fragments, otherwise will not render.
    <>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Global Currency Converter</h1>
      <h2>in React</h2>
      <CurrencyRow
        // Pass in as props 
        // Put in distinctValues - as filtered from above function- NEEDS TO BE UNIQUE KEY VALUE
        currencyOptions={distinctValues}
        selectedCurrency={fromCurrency}
        // Inline function for CurrencyRow for onSelect, update of the select button . e.target = (just the select)
        onchangeCurrency={e => setFromCurrency(e.target.value,
          console.log(e.target.value)
        )}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currencyOptions={distinctValues}
        selectedCurrency={toCurrency}
        // Inline function for CurrencyRow for onSelect, update of the select button . e.target = (just the select)
        onchangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
      <p>Copyright <a href="http://www.michaelogrady.net">Michael O'Grady</a> &copy; 2021</p>
    </>

  );
}

export default App;
