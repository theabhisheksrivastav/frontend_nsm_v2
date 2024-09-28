import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import axios from 'axios'
import { login as authLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { login as loginService } from '../../services/authService';

const RegisterForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    username: '', 
    name: '',
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    

    
  };

  const validateEmail = (email) => {
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'rediff.com'];
    const emailDomain = email.split('@')[1];
    return validDomains.includes(emailDomain);
  };

 

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setError('Email must be from Gmail, Yahoo, Outlook, or Rediff');
      return;
    }
   if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    handleSubmit(formData);
  };

  return (
    
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm" htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Enter your username"
          autoComplete="on"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm" htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Enter your name"
          autoComplete="on"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm" htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Enter your email"
          autoComplete="on"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm" htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm" htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Confirm your password"
          required
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <CustomButton type="submit">Register</CustomButton>

      
    </form>

    
  );
};

export default RegisterForm;
