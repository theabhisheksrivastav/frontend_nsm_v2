import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyOTP, register } from '../../services/authService';


const OTPForm = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const name = location.state?.name
  const username = location.state?.username
  const password = location.state?.password

  const handleOtpSubmit = async (otp, email) => {
    try {
      const response = await verifyOTP(username, name, email, password, otp);
      if (response.ok) {
        toast.success('OTP verified');
        navigate('/login');
      } else {
        console.error('OTP verification failed');
        toast.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      console.log('Username:', username);
      console.log('Fullname:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      const response = await register(username, name, email, password);
      console.log('Response:', response);
      if (response.success) {
        toast.success('OTP sent successfully');
      } else {
        console.error('Failed to resend OTP');
        toast.error('Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Error resending OTP');
    }
  };

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
        <p className="mb-6 text-sm text-center text-blue-600">
          I have not received my code ? <button
            onClick={handleResendOtp}
            className="text-blue-primary hover:underline"
          >
            Resend OTP
          </button>
        </p>

        <CustomButton type="submit">Continue</CustomButton>
      </form>


    </div>
  );
};

export default OTPForm;
