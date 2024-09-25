import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import { login as authLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { login as loginService } from '../../store/authSlice';

const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const onSubmit = async (formData) => {
    try {
      const userData = await loginService(formData.username, formData.email, formData.password);
      dispatch(authLogin({ userData }));
      navigate('/otp-verify');
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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

      <CustomButton type="submit">Login</CustomButton>
    </form>
  );
};

export default LoginForm;
