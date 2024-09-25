import React from 'react';
import RegisterForm from './forms/RegisterForm';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-border.png';
import AuthLayout from '../layout/AuthLayout';

const RegisterPage = () => {

  const handleSubmit = (formData) => {
    console.log('Form data submitted:', formData);
  };

  return (
    <AuthLayout>
      <SignUpCard>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
        <RegisterForm handleSubmit={handleSubmit} />

        <p className="mt-4 text-sm text-center">
          Already have an Account? <a href="/login" className="text-blue-primary">Login here</a>
        </p>
        <p className="mt-6 text-sm text-center text-gray-500">
          Powered by North Star Metrics
        </p>
      </SignUpCard>
    </AuthLayout>
  );
};

export default RegisterPage;
