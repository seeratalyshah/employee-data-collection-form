import React, { useState } from 'react';
import PropTypes from 'prop-types';

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  // Add more currencies as needed
];

const CustomDropdownInput = ({ value, onValueChange, onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleCurrencyChange = (event) => {
    const newCurrency = currencies.find(c => c.code === event.target.value);
    setSelectedCurrency(newCurrency);
    onCurrencyChange(newCurrency);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded pl-2">
      <select
        value={selectedCurrency.code}
        onChange={handleCurrencyChange}
        className="bg-white border-none focus:outline-none"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} {currency.code}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex-1 px-2 py-1 border-l-1 border-gray-300 focus:outline-none"
        placeholder="0.00"
      />
    </div>
  );
};

CustomDropdownInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValueChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};

CustomDropdownInput.defaultProps = {
  value: '',
};

export default CustomDropdownInput;
