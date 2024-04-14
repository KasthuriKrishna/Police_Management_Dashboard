import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import Anekal from './Anekal'

import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css'
import TableComponent from "./ReportTable";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);
  const [selectedUnit, setSelectedUnit] = useState('Anekal PS');

  const handleChange = (e) => {
    setSelectedUnit(e.target.value);
  };
  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <Space size={20} direction="vertical">
      <Typography.Title level={4}>Unit Analysis</Typography.Title>
      <div>
      <h2>Unit Selector</h2>
      <label htmlFor="graph-select">Select an Unit:</label>
      <select id="graph-select" onChange={handleChange}>
        <option value="">Select...</option>
        <option value="Anekal PS">Anekal PS</option>
        <option value="Anugondanahalli PS">Anugondanahalli PS</option>
        <option value="Attibele PS">Attibele PS</option>
        <option value="Avalahally PS">Avalahally PS</option>
        <option value="Bannerghatta PS">Anugondanahalli PS</option>
        <option value="Bengaluru CEN Crime PS">Anugondanahalli PS</option>
        <option value="Bengaluru Dist Women PS">Bengaluru Dist Women PS</option>
        <option value="Chennarayapatana PS">Chennarayapatana PS</option>
        <option value="Dobbespet PS">Dobbespet PS</option>
        <option value="Doddaballapura Rural PS">Doddaballapura Rural PS</option>
        <option value="Doddaballapura Town PS">Doddaballapura Town PS</option>
        <option value="Doddabelavangala PS">Doddabelavangala PS</option>
        <option value="Hebbagodi PS">Hebbagodi PS</option>
      </select>
      <div>
       {selectedUnit === 'Anekal PS' && <Anekal />}
       {selectedUnit === 'Attibele PS' && <Anekal />}
   {/*{selectedGraph === 'year' && <FirYear />}*/}
      </div>
      
    </div>
    </Space>
    
    </div>
    <AppFooter />
  </div>

   
  );
}
export default Customers;