import React, { useState, useRef } from 'react';

// Country options for phone numbers
const countryCodes = [
  { code: '+1', name: 'USA' },
  { code: '+91', name: 'India' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  // Add more countries here as needed
];

// Email validation function
const validateEmail = (email) => {
  const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'rediff.com'];
  const emailParts = email.split('@');
  return emailParts.length === 2 && validDomains.includes(emailParts[1]);
};

const CustomInput = ({ type, name, value, onChange, placeholder }) => {
  const [selectedCountry] = useState(countryCodes[0].code); // Default country code
  const [verified, setVerified] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState(''); // State for OTP error message
  const [showVerifyButton, setShowVerifyButton] = useState(false);

  const otpInputRef = useRef(null);

  // Input validation logic for both email and phone number
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(e);

    if (type === 'email' && validateEmail(inputValue)) {
      setShowVerifyButton(true);  // Show verify button for valid email
    } else if (type === 'number' && /^[0-9]{10}$/.test(inputValue)) {
      setShowVerifyButton(true);  // Show verify button for valid phone number
    } else {
      setShowVerifyButton(false);  // Hide verify button if not valid
    }
  };

  // Handle verification submission for email/phone number
  const handleVerification = async () => {
    if (!value) {
      setError('Field cannot be empty');
      return;
    }

    const isValid = await fakeApiCallToValidateInput(value);
    if (isValid) {
      setVerified(true); // Input verified, OTP field visible
      setOtpVisible(true);
      setError('');
    } else {
      setError('Validation failed. Try again.');
      setOtpVisible(false);
    }
  };

  // Handle OTP input change and clear error on typing
  const handleOtpChange = (e) => {
    const inputOtp = e.target.value;
    setOtp(inputOtp);

    if (otpError && inputOtp.length === 6) {
      setOtpError(''); // Clear error if the OTP length becomes valid
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = () => {
    if (otp.length < 6) {
      setOtpError('OTP must be 6 digits long'); // Show error if OTP is less than 6 digits
    } else {
      alert('OTP submitted successfully!');
      setOtpError('');
    }
  };

  // Simulate API call for validation
  const fakeApiCallToValidateInput = (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(input.trim() !== ''); // Simple fake validation check
      }, 1000); // Simulate a delay for API response
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

      <div className="relative">
        {/* Input field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required
        />

        {/* Show "Verify Now" button if validation passes */}
        {showVerifyButton && !verified && (
          <button
            onClick={handleVerification}
            className="absolute right-2 top-2 bg-blue-primary hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Verify Now
          </button>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* OTP input field */}
      {otpVisible && (
        <div className="relative flex items-center">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={handleOtpChange}
            ref={otpInputRef}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
            required
          />
          <button
            onClick={handleOtpSubmit}
            className="absolute right-2 top-2 bg-blue-primary hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit OTP
          </button>
        </div>
      )}

      {/* OTP error message */}
      {otpError && <p className="text-red-500 mb-4">{otpError}</p>}
    </div>
  );
};

export default CustomInput;
