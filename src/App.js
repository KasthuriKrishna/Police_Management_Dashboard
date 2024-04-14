import React, { useState } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Apps from './subins_1/App';
import Dashboard from './SI/Dashboard';
import { MessageProvider } from './MessageContext';
import Inventory from './subins_1/Pages/Inventory';
import WeeklyDutyRoster from './subins_1/Pages/Calendar/Duty';
import Customers from './subins_1/Pages/Customers';
import Orders from './subins_1/Pages/Orders';
import Customer from './subins_1/Pages/Unit';
import OrdersPage from './SI/OrdersPage';
import { MessageProvider2 } from './MessageContext2';
import { FormattedMessage, IntlProvider } from 'react-intl';
import enMessages from './Signin/En.json';
import knMessages from './Signin/Kn.json';
import SignIn from './Signin/Newsignin';
import TimeLine from './SI/TimeLine';

function App() {
  const [locale, setLocale] = useState('en');

  // Function to handle language change
  const handleLanguageChange = (e) => {
    const selectedLocale = e.target.value;
    setLocale(selectedLocale);
  };

  // Determine which messages to use based on the selected locale
  const messages = locale === 'kn' ? knMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <MessageProvider>
          <MessageProvider2>
            
            <Routes>
              <Route index element={<SignIn />} />
              <Route path="/InspectorDashboard" element={<Dashboard />} />
              <Route path="/ACPDashboard" element={<Apps />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/calendar" element={<WeeklyDutyRoster />} />
              <Route path="/unit" element={<Customer />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/OrdersPage" element={<OrdersPage />} />
              <Route path="/TimeLine" element={<TimeLine />} />
            </Routes>
          </MessageProvider2>
        </MessageProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
