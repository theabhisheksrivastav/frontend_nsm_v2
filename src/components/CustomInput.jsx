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
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0].code);
  const [verified, setVerified] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  
  const otpInputRef = useRef(null);

  // Handle validation and show "Verify Now" button for email
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(e);
  
    // Email validation logic
    if (type === 'email' && validateEmail(inputValue)) {
      setShowVerifyButton(true);  // Show verify button for valid email
    }
    // Phone number validation logic (10 digits and only 0-9)
    else if (type === 'number' && /^[0-9]{10}$/.test(inputValue)) {
      setShowVerifyButton(true);  // Show verify button for valid phone number
    } 
    // If neither valid, hide the verify button
    else {
      setShowVerifyButton(false);
    }
  };
  

  // Handle validation and show OTP input
  const handleSubmit = async () => {
    if (!value) {
      setError('Field cannot be empty');
      return;
    }

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

  // Handle OTP submission
  const handleOtpSubmit = () => {
    if (otp !== '') {
      alert('OTP submitted successfully!');
      setError(''); // Clear any previous error
    } else {
      setError('Please enter the OTP.');
    }
  };

  // Fake API validation logic
  const fakeApiCallToValidateInput = (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(input !== '');
      }, 1000); // Simulate an API response delay
    });
  };

  return (
    <div className="custom-input-container">
      <div className="relative">
        {/* Input field for email/number */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required
        />

        {/* "Verify Now" button (visible after valid email input) */}
        {showVerifyButton && !verified && (
          <button
            onClick={handleSubmit}
            className="absolute right-2 top-2 bg-blue-primary hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Verify Now
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* If OTP is visible, render OTP input next to the main input */}
      {otpVisible && (
        <div className="relative flex items-center">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            ref={otpInputRef}
            className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
            required
          />
          <button
            onClick={handleOtpSubmit}
            className="ml-3 bg-blue-primary hover:bg-blue-600 text-white font-semibold py-0 px-3 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
