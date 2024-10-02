import LoginForm from './forms/LoginForm';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-blue.png';
import AuthLayout from '../layout/AuthLayout';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  return (
    <AuthLayout>
      <SignUpCard>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <LoginForm />

        <p className="mt-4 text-sm text-center">
          Create an Account? <Link to="/register" className="text-blue-primary">Register here</Link>
        </p>
        <p className="mt-6 text-sm text-center text-gray-500">
          Powered by North Star Metrics
        </p>
      </SignUpCard>
    </AuthLayout>
  );
};

export default LoginPage;

