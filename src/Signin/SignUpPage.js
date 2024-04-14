import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    clearError();
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setSelectedUnit(''); // Reset selected unit when role changes
    clearError();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    clearError();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    clearError();
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
    clearError();
  };

  const clearError = () => {
    setError('');
  };

  const handleSignIn = async () => {
    if (!username || !password || !selectedDistrict || !selectedRole) {
      setError('Please fill out all fields');
      return;
    }

    // Perform login logic here

    // Assuming login is successful, redirect based on role
    switch (selectedRole) {
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
        navigate('/');
        break;
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="input-container">
        <label htmlFor="district">Select District:</label>
        <select id="district" value={selectedDistrict} onChange={handleDistrictChange} aria-label="Select District">
          <option value="">-- Select District --</option>
          {['District A', 'District B', 'District C'].map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="role">Select Role:</label>
        <select id="role" value={selectedRole} onChange={handleRoleChange} aria-label="Select Role">
          <option value="">-- Select Role --</option>
          {['Sub-inspector', 'Inspector', 'ACP'].map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
      </div>
      {selectedRole === 'Inspector' || selectedRole === 'Sub-inspector' ? (
        <div className="input-container">
          <label htmlFor="unit">Select Unit:</label>
          <select id="unit" value={selectedUnit} onChange={handleUnitChange} aria-label="Select Unit">
            <option value="">-- Select Unit --</option>
            {['Unit 1', 'Unit 2', 'Unit 3'].map((unit, index) => (
              <option key={index} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      ) : null}
      {error && <p className="error-message">{error}</p>}
      <button className="button" onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignInPage;