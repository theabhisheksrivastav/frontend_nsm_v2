import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation after login
import CustomButton from '../../components/CustomButton';
import { authService } from '../../services/authService'; // import your authService

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    password: ''
  });
  const [error, setError] = useState(''); // for handling login errors
  const navigate = useNavigate(); // for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from authService with email and password
      const user = await authService.login(formData.email, formData.password);

      // If login is successful, redirect to the OTP verification page
      navigate('/otp-verify');
    } catch (error) {
      // Handle any login errors
      setError('Login failed. Please check your email or password.');
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
