import { FormattedMessage, IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
// Import English and Kannada translations
import React, { useState } from 'react';
import enMessages from './En.json';
import knMessages from './Kn.json';
import Dashboard from '../SI/Dashboard';
import App from '../subins_1/App';

function Newapp() {
  // State to manage the selected language
  const [locale, setLocale] = useState('en');

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLocale(e.target.value);
  };

  // Determine which messages to use based on the selected locale
  const messages = locale === 'kn' ? knMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <div>
          {/* Language selector */}
          <select value={locale} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>
        <Routes>
          <Route index element={<SignInPage />} />
          <Route path="/InspectorDashboard" element={<Dashboard/>} />
          <Route path="/AcpDashboard" element={<App />} />
        </Routes>
      </Router>
    </IntlProvider>
  );
}

export default Newapp;