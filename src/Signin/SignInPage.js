// SignInPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userdata from './userdata.json'; // Importing user data JSON file
import './SignInPage.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      setError('Please enter username and password');
      return;
    }

    // Find user in the userData array based on username
    const user = userdata.find((user) => user.username === username);

    if (!user || user.password !== password) {
      setError('Invalid username or password');
      return;
    }

    // Extract role and unit name from user data
    const { role, unitname } = user;

    // Route user to the appropriate dashboard based on role
    switch (role) {
      case 'Inspector':
        navigate('/InspectorDashboard');
        break;
      case 'Sub-inspector':
        navigate('/SubInspectorDashboard');
        break;
      case 'ACP':
        navigate('/AcpDashboard');
        break;
      default:
        // Redirect to a default route for unknown roles
        navigate('/');
        break;
    }
  };

  return (
    <div className='page'>
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="signin-input">
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="signin-input">
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={password} onChange={handlePasswordChange} />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="signin-button" onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}

export default SignInPage;