import React from 'react';
import backgroundImg from '../assets/form_background.png';

const AuthLayout = ({ children }) => {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="relative z-10 w-full max-w-lg">
          {children}
        </div>
      </div>
    );
  };
  
  export default AuthLayout;
