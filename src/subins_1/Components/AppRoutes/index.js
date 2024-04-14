import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashboard";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Calendar from '../../Pages/Calendar/Duty';
import Unit from '../../Pages/Unit';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/calendar" element={<Calendar />}></Route>
      <Route path="/unit" element={<Unit />}></Route>
    </Routes>
  );
}
export default AppRoutes;