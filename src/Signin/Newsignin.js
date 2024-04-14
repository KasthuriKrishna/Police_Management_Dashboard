import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl, IntlProvider } from 'react-intl';
import enMessages from './En.json';
import knMessages from './Kn.json';
import userdata from './userdata.json';
import myImage from './images.png'; // Importing the image for the sign-in page
import myImage1 from './image-1.png'; // Importing the image for the sign-in page

import './SignInPage.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [locale, setLocale] = useState('en'); // State to track the selected locale
  const navigate = useNavigate();
  const intl = useIntl();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    clearError();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    clearError();
  };

  const clearError = () => {
    setError('');
  };

  const handleSignIn = async () => {
    if (!username || !password) {
      setError(intl.formatMessage({ id: 'usernamePasswordError' }));
      return;
    }

    const user = userdata.find((user) => user.username === username);

    if (!user || user.password !== password) {
      setError(intl.formatMessage({ id: 'invalidCredentialsError' }));
      return;
    }

    const { role, unitname } = user;

    switch (role) {
      case 'Inspector':
        navigate('/InspectorDashboard');
        break;
      case 'ACP':
        navigate('/AcpDashboard');
        break;
      default:
        navigate('/');
        break;
    }
  };

  // Function to handle language change
  const handleLanguageChange = (selectedLocale) => {
    setLocale(selectedLocale);
  };

  // Determine which messages to use based on the selected locale
  const messages = locale === 'kn' ? knMessages : enMessages;

  return (
    <div className="signin-page">

    <IntlProvider locale={locale} messages={messages}>
    <div className='Banner'>
    <img src={myImage1} className='banner-logo'/>
    <div className='content'>
    <h4 className='police'>Karnataka State Police</h4>
    <p className='gov'>Government of Karnataka</p>
    </div>
    </div>

      <div className="signin-container">
      <div>
          {/* Language selector */}
          <select value={locale} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
          </select>
          <div className="banner">
          <center>
            <img src={myImage} alt="Logo" className='cont-logo'/>
          </center>
        </div>

        </div>
        <h2><FormattedMessage id="signInTitle" /></h2>
        <div className="signin-input">
          <label htmlFor="username"><FormattedMessage id="usernameLabel" /></label>
          <input id="username" type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="signin-input">
          <label htmlFor="password"><FormattedMessage id="passwordLabel" /></label>
          <input id="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="signin-button" onClick={handleSignIn}><FormattedMessage id="signInButton" /></button>
        
      </div>
    </IntlProvider>
    </div>
  );
}

export default SignInPage;
