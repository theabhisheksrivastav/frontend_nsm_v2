import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';


const RegisterForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
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
  const handleSubmit = async (formData) => {
    const user = await register(formData.username, formData.name, formData.email, formData.password);
    if (user.success) {
      toast.success('OTP sent succesfully')
      navigate('/otp-verify', { state: { email: formData.email, name: formData.name, username: formData.username, password: formData.password } });
    } else {
      toast.error('User All Ready exist')
    }
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
      {/* <div className="mb-4">
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
      </div> */}

       {/* Email Input */}
       <CustomInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      {/* Phone Number Input */}
      <CustomInput
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
      />

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
