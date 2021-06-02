import React from 'react'
// take in props variable
export default function CurrencyRow(props) {
    const {
        currencyOptions, selectedCurrency, onchangeCurrency, onChangeAmount, amount
    } = props
    return (
        <div>
            {/* Cast the value to a string */}
            <input type="number" className='input' value={String(amount)} onChange={onChangeAmount} />
            {/* onChange event important, otherwise when you aren't able to select any other option! 
            need to push in a function*/}
            <select value={selectedCurrency} onChange={onchangeCurrency}>
                {currencyOptions.map(option => (
                    //  Each child in a list should have a unique "key" prop [key={option}] - unique value for each child
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
