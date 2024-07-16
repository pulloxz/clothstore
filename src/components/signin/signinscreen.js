import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import signinStyle from './signinstyle.module.css';
import eye from '../../assets/eye.svg';
import client from '../../api/axios';

const Signinscreen = () => {
  const [username_or_email, setUsername_or_password] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const requestBody = {
      username_or_email: username_or_email,
      password: password,
    };

    try {
      const response = await client.post('login', requestBody);
      const { success, token } = response.data;

      if (!success) {
        setError('User is not active or other error occurred');
        setLoading(false); 
        return;
      }

      localStorage.setItem('token', token);
      navigate('/getstarted');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('Incorrect username or password');
        } else {
          setError('Request error');
        }
      } else {
        setError(`Network Error`);
      }
      setLoading(false); 
    }
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const eyeicon = <img src={eye} className={signinStyle.eyeicon} alt="eye icon" />;

  return (
    <div className="w-full h-auto montserrat flex flex-col items-center mx-auto bg-[#FDFDFD]">
      <div className="min-w-[384px] max-w-[480px] p-4 flex flex-col gap-6">
        <h1 className={signinStyle.welcomtitle}>Welcome<br />Back!</h1>
        <div className={signinStyle.datainput}>
          <div>
            <input
              placeholder='Username or email'
              className={signinStyle.userinput}
              value={username_or_email}
              onChange={(e) => setUsername_or_password(e.target.value)}
            />
          </div>
          <div className={signinStyle.passwordinputcontainer}>
            <input
              type="password"
              placeholder='Password'
              className={signinStyle.passwordinput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {eyeicon}
          </div>
          <p className={signinStyle.forgetpass}>Forgot password?</p>
        </div>
        <div>
          <p className={signinStyle.createacc}>Create an account <a onClick={handleSignUpClick} className={signinStyle.signuplink}>Sign Up</a></p>
        </div>
        <button
          className={`${signinStyle.Loginbtn} ${loading ? signinStyle.loading : ''}`}
          onClick={handleLoginClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p className={signinStyle.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Signinscreen;

