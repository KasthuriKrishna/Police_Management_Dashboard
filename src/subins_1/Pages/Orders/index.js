import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";
import Choro from './Chorobang'
import './Legend.css'

import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css'

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <Space size={20} direction="vertical" style={{width:"1300px",height:"700px"}}>
      <Typography.Title level={4}>Choropleth Map</Typography.Title>
      {/*'#00FF00','#006600','#FFFF66','#FFFF00','#FFA500','#FF6600','#FF0000','#B30000'*/}
      <div>
      <h2>Legend</h2>
      <ul style={{ listStyleType: 'square'}}>
      <div className="legend-item">
        <li style={{ color: '#00FF00',fontSize: '16px' }} ><h4 style={{color:'black'}}>Lowest</h4></li>
        <li style={{ color: '#006600',fontSize: '16px' }} ><h4 style={{color:'black'}}>Low</h4></li>
        <li style={{ color: '#FFFF66',fontSize: '16px' }} ><h4 style={{color:'black'}}>Moderately Low</h4></li>
        <li style={{ color: '#FFFF00',fontSize: '16px' }}><h4 style={{color:'black'}}>Moderate</h4></li>
        </div>
        <div className="legend-item">
        <li style={{ color: '#FFA500',fontSize: '16px' }}><h4 style={{color:'black'}}>Moderately High</h4></li>
        <li style={{ color: '#FF6600',fontSize: '16px' }}><h4 style={{color:'black'}}>High</h4></li>
        <li style={{ color: '#FF0000',fontSize: '16px' }}><h4 style={{color:'black'}}>Higher</h4></li>
        <li style={{ color: '#B30000',fontSize: '16px' }}><h4 style={{color:'black'}}>Highest</h4></li>
        </div>
      </ul>
    </div>
      <Choro/>
    </Space>

    </div>
    <AppFooter />
  </div>

   
  );
}
export default Orders;