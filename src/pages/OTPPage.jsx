import OTPForm from './forms/OTPForm';
import AuthLayout from '../layout/AuthLayout';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-blue.png';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import conf from '../../config/conf.js'


const OTPPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const name = location.state?.name
  const username = location.state?.username
  const password = location.state?.password

  console.log(username,password,name);
  
  const handleOtpSubmit = async (otpCode,email) => {
    console.log(otpCode);

   
    
    
    try {
      const response = await fetch(`${conf.backendUrl}/users/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode ,username,password,fullname:name}),
      });

      console.log(response.ok);
      

      if (response.ok) {
        const data = await response.json();
        console.log('OTP verified:', data);
        toast.success('OTP verified')
        navigate('/login');
      } else {
        console.error('OTP verification failed');
        toast.error('OTP verification failed')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
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
