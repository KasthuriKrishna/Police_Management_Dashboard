import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";
import Firunit from './FirUnitchart';
import FirYear from './FirYearchart';
import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css'
import Officer from "./Officer";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);
  const [selectedGraph, setSelectedGraph] = useState('officer');

  const handleChange = (e) => {
    setSelectedGraph(e.target.value);
  };


  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <div style={{width:"100%"}}>
      <Typography.Title level={4}>Case Analysis</Typography.Title>
      <div>
      <h2>Graph Selector</h2>
      <label htmlFor="graph-select">Select a Graph:</label>
      <select id="graph-select" onChange={handleChange}>
        <option value="">Select...</option>
        <option value="unit">Unit Analysis</option>
        <option value="year">Year Analysis</option>
        <option value="officer">Officer Performance</option>
        <option value="year">PI Analysis</option>
      </select>
      <div>
        {selectedGraph === 'unit' && <Firunit />}
        {selectedGraph === 'year' && <FirYear />}
        {selectedGraph === 'officer' && <Officer />}
      </div>
    </div>

    </div>
    </div>
    <AppFooter />
  </div>

    
  );
}
export default Inventory;