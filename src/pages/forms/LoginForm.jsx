import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import { login as authLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { login as loginService } from '../../services/authService';
import toast from 'react-hot-toast'

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginService(formData.username, formData.email, formData.password);
      dispatch(authLogin({ userData }));
      console.log('Login successful:', userData);
      if (userData) {
        toast.success('user Loged in successful ')
        navigate('/', { state: { email: formData.email } });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login fail')
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
