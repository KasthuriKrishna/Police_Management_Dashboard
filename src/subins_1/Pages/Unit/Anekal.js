import React from 'react'
import './Unit.css'
import { Tooltip as AntTooltip, Card, Space, Statistic, Table, Typography } from 'antd';
import App from './Bar'
import TableComponent from './ReportTable';
const Anekal = () => {
  return (
    <>
    <div className='card-container'>
    <Card style={{ width: 200, height: 100,backgroundColor:"yellow" }} className='card'>
      <Space direction="horizontal">
        <div>
        <img
        src="https://st.depositphotos.com/14768666/53978/v/450/depositphotos_539789962-stock-illustration-policeman-cop-icon-flat-isolated.jpg"
        alt="User Profile Picture"
        style={{
          width: '50px', // Adjust width as needed
          height: '40px', // Adjust height as needed
          borderRadius: '50%', // Make the image circular
          objectFit: 'cover', // Ensure the image fills the container
        }}
      />
        </div>
        <div>
        <center><b>TOTAL CASES<br/>2364</b></center>
        </div>
      </Space>
    </Card>
    <Card style={{ width: 200, height: 100,backgroundColor:"Red" }} className='card'>
      <Space direction="horizontal">
        <div>
        <img
        src="https://st.depositphotos.com/14768666/53978/v/450/depositphotos_539789962-stock-illustration-policeman-cop-icon-flat-isolated.jpg"
        alt="User Profile Picture"
        style={{
          width: '50px', // Adjust width as needed
          height: '40px', // Adjust height as needed
          borderRadius: '50%', // Make the image circular
          objectFit: 'cover', // Ensure the image fills the container
        }}
      />
        </div>
        <div>
        <center><b>UNSOLVED<br/>755</b></center>
        </div>
      </Space>
    </Card>
    <Card style={{ width: 200, height: 100,backgroundColor:"Green" }} className='card'>
      <Space direction="horizontal">
        <div>
        <img
        src="https://st.depositphotos.com/14768666/53978/v/450/depositphotos_539789962-stock-illustration-policeman-cop-icon-flat-isolated.jpg"
        alt="User Profile Picture"
        style={{
          width: '50px', // Adjust width as needed
          height: '40px', // Adjust height as needed
          borderRadius: '50%', // Make the image circular
          objectFit: 'cover', // Ensure the image fills the container
        }}
      />
        </div>
        <div>
        <center><b>RESOLVED<br/>1609</b></center>
        </div>
      </Space>
    </Card>
    </div>
    <div>
    <TableComponent/>
    </div>
    </>
  )
}

export default Anekal