import LoginForm from './forms/LoginForm';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-blue.png';
import AuthLayout from '../layout/AuthLayout';

const LoginPage = () => {

  const handleSubmit = (formData) => {
    console.log('Form data submitted:', formData);
  };

  return (
    <AuthLayout>
      <SignUpCard>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <LoginForm handleSubmit={handleSubmit} />

        <p className="mt-4 text-sm text-center">
          Create an Account? <a href="/register" className="text-blue-primary">Register here</a>
        </p>
        <p className="mt-6 text-sm text-center text-gray-500">
          Powered by North Star Metrics
        </p>
      </SignUpCard>
    </AuthLayout>
  );
};

export default LoginPage;

