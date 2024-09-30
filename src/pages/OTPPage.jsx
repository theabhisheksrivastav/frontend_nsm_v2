import OTPForm from './forms/OTPForm';
import AuthLayout from '../layout/AuthLayout';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-blue.png';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { verifyOTP } from '../services/authService';




const OTPPage = () => {
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

  return (
    <AuthLayout>
      <SignUpCard>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">Login Verification</h2>
        <OTPForm handleOtpSubmit={handleOtpSubmit} email={email} />
        <p className="mt-6 text-sm text-center text-gray-500">
          Powered by North Star Metrics
        </p>
      </SignUpCard>
    </AuthLayout>
  );
};

export default OTPPage;
