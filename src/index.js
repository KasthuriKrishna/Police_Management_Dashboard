import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import Firtype from './charts/Firtype';
import Simplebar from './charts/Simplebar';
import reportWebVitals from './reportWebVitals';
import Apps from './subins_1/App'
import Multiline from './charts/Mulitline'
import Multichart from './charts/Multichart'
import Stackchart from './charts/Stackchart'
import Bangloremap from './subins_1/Pages/Dashboard/Bangloremap'
import { BrowserRouter } from 'react-router-dom';
import Linechart from './subins_1/Pages/Dashboard/Linechart';
import Choro from './subins_1/Pages/Dashboard/Choro';
import FirUnitchart from './subins_1/Pages/Inventory/FirUnitchart'
import FirYearchart from './subins_1/Pages/Inventory/FirYearchart'
import Invent from './subins_1/Pages/Inventory/index'
import Order from './subins_1/Pages/Orders'
import Table1 from './subins_1/Pages/Customers/Table1'
import Chorobang from './subins_1/Pages/Orders/Chorobang'
import Customers from './subins_1/Pages/Unit';
import Duty from './subins_1/Pages/Calendar/Duty'
import Bar from './subins_1/Pages/Unit/Bar'
import Pie from './subins_1/Pages/Unit/Pie'
import Focuspie from './subins_1/Pages/Unit/Focuspie' 
import Input from './Input'
import Roster from './Roster'
import Popup from './Popup'
import Cal from './subins_1/Pages/Calendar/Cal'
import Dashboard from './SI/Dashboard';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/*<BrowserRouter>
  <Apps/>
</BrowserRouter>*/}
<App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
