import React, { useState } from 'react';

// Country options for phone numbers
const countryCodes = [
  { code: '+1', name: 'USA' },
  { code: '+91', name: 'India' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  // Add more countries here as needed
];

const CustomInput = ({ type, name, value, onChange, placeholder }) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0].code);
  const [verified, setVerified] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [error, setError] = useState('');

  // Handle validation and show "Verify Now" button
  const handleSubmit = async () => {
    if (!value) {
      setError('Field cannot be empty');
      return;
    }

    // Placeholder for API call
    const isValid = await fakeApiCallToValidateInput(value);

    if (isValid) {
      setVerified(true); // Input is verified, show OTP input
      setOtpVisible(true);
      setError('');
    } else {
      setError('Validation failed. Try again.');
      setOtpVisible(false); // Hide OTP field if failed
    }
  };

  // Fake API validation logic
  const fakeApiCallToValidateInput = (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (input) resolve(true);
        else resolve(false);
      }, 1000); // Simulate an API response delay
    });
  };

  return (
    <div className="custom-input-container">
      {type === 'number' && (
        <div className="country-selector mb-4">
          <select
            className="border rounded-lg p-2"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} {country.code}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="relative w-full mb-4">
        {/* Input field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required
        />

        {/* Render "Verify Now" button inside the input field */}
        {!verified && (
          <button
            onClick={handleSubmit}
            className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Verify Now
          </button>
        )}

        {/* If OTP is visible, render OTP input inside the input field */}
        {otpVisible && (
          <input
            type="text"
            className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
            required
          />
        )}
          
          {!verified && (
            <button
              onClick={handleSubmit}
              className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Verify Now
            </button>
          )}
          
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
};

export default CustomInput;
