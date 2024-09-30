import React from 'react';
import RegisterForm from './forms/RegisterForm';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/nsm-logo-blue.png';
import AuthLayout from '../layout/AuthLayout';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'

const RegisterPage = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const handleSubmit = async (formData) => {
    const user = await register(formData.username, formData.name, formData.email, formData.password);
    console.log('User registered:', user);
    console.log('Form data submitted:', formData);
   
    if (user.success) {
        
       toast.success('OTP sent succesfully')
        
        navigate('/otp-verify', { state: { email: formData.email , name:formData.name,username:formData.username,password:formData.password} });
      

    }else{
      toast.error('User All Ready exist')
    }
   
   
    

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
