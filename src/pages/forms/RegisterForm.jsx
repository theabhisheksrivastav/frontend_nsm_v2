import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({
    hasMinLength: false,
    hasLetter: false,
    hasCapitalLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  // Validate Password Requirements
  const validatePassword = (password) => {
    const requirements = {
      isValidLength: password.length >= 6 && password.length <= 20,
      hasLowercase: /^[a-z]/.test(password), // First character is a lowercase letter
      hasCapitalSecondLetter: password.length > 1 && /^[A-Z]/.test(password[1]), // Second character is a capital letter
      doesNotEndWithSymbolOrNumber: !/[0-9!@#$%^&*(),.?":{}|<>]$/.test(password) // Does not end with a number or symbol
   

    };
    setPasswordErrors(requirements);
  };

  // Handle input changes and validate password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const isPasswordValid = Object.values(passwordErrors).every(Boolean);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Validate Email
  const validateEmail = (email) => {
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'rediff.com'];
    const emailDomain = email.split('@')[1];
    return validDomains.includes(emailDomain);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    const user = await register(formData.username, formData.name, formData.email, formData.password);
    if (user.success) {
      toast.success('OTP sent successfully');
      navigate('/otp-verify', { state: { ...formData } });
    } else {
      toast.error('User already exists');
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

    if (!isPasswordValid) {
      setError('Password does not meet the required criteria');
      return;
    }

    setError('');
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Email Input */}
      <label className="block mb-2 text-sm" htmlFor="password">Email:</label>
      <CustomInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      {/* Phone Number Input */}
      {/* <label className="block mb-2 text-sm" htmlFor="password">Phone Number:</label> */}
      <CustomInput
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
      />

      {/* Password Input */}
      <div className="relative mb-4">
        <label className="block mb-2 text-sm" htmlFor="password">Password:</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Enter your password"
          required
        />
        <span onClick={togglePasswordVisibility} className="absolute right-3 top-10 cursor-pointer text-xl">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>

        <PasswordStrengthBar password={formData.password} />

        <ul className="mt-1 text-sm text-black-500">
          <li className={passwordErrors.isValidLength ? 'text-blue-500' : ''}>
            6-20 characters
          </li>
          <li className={passwordErrors.hasLowercase ? 'text-blue-500' : ''}>
            First character must be a lowercase letter
          </li>
          <li className={passwordErrors.hasCapitalSecondLetter ? 'text-blue-500' : ''}>
            Second character must be a capital letter
          </li>
          <li className={passwordErrors.doesNotEndWithSymbolOrNumber ? 'text-blue-500' : ''}>
            Cannot end with a number or symbol
          </li>
        </ul>
      </div>

      {/* Confirm Password Input */}
      <div className="relative mb-4">
        <label className="block mb-2 text-sm" htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
          placeholder="Confirm your password"
          required
        />
        <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-10 cursor-pointer text-xl">
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Submit Button */}
      <CustomButton type="submit" disabled={!isPasswordValid}>
        Register
      </CustomButton>
    </form>
  );
};

export default RegisterForm;
