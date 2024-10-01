import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';

const OTPForm = ({ email, handleOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    handleOtpSubmit(otpCode, email);
  };

  return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-center mb-2">
          We've sent you a six-digit code. Check your email <strong>{email}</strong> for the OTP. It could also be in your spam folder.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <div className="grid grid-cols-6 gap-2 mb-6">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()} // auto-select content on focus
              />
            ))}
          </div>

          <CustomButton type="submit">Continue</CustomButton>
        </form>

        
      </div>
  );
};

export default OTPForm;
