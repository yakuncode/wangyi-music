import React from 'react';
import { QrCodeSignIn } from './QrCodeSignInForm/QrCodeSignIn'
import { SignInForm } from './SignInForm/SignInForm'
import './Login.scss'
const Login: React.FC = () => {

  return (
    <div className="login-wrapper">
      <SignInForm />
      <div className="line"></div>
      <QrCodeSignIn />
    </div>
  );
};

export default Login;
