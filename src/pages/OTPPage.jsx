import OTPForm from './forms/OTPForm';
import AuthLayout from '../layout/AuthLayout';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-blue.png';

const OTPPage = () => {
  return (
    <AuthLayout>
      <SignUpCard>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">Login Verification</h2>
        <OTPForm />
        
        <p className="mt-6 text-sm text-center text-gray-500">
          Powered by North Star Metrics
        </p>
      </SignUpCard>
    </AuthLayout>
  );
};

export default OTPPage;
