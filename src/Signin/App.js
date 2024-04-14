import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import App from '../subins_1/App';
import Dashboard from '../SI/Dashboard'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<SignInPage/>} />
    <Route path="/InspectorDashboard" element={<App/>} />
    <Route path="/SubInspectorDashboard" element={<Dashboard/>} />
    <Route path="/AcpDashboard" element={<AcpDashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;