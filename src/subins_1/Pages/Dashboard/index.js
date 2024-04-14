import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as AntTooltip, Card, Space, Statistic, Table, Typography,Modal } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { getCustomers, getInventory, getOrders, getRevenue } from '../../API';
import Bangloremap from './Bangloremap.js'
import Multichart from './Multichart.js';
import Linechart from './Linechart.js';
import { useMessage2 } from '../../../MessageContext2';
import { useRef } from 'react';
import './Marquee.css'
function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const { message2 } = useMessage2();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);
  useEffect(() => {
    const storedMessages = localStorage.getItem('message2');
    if (storedMessages) {
      // Split stored messages by newline
      const parsedMessages = storedMessages.split('\n');
  
      // Process each parsed message
      const processedMessages = parsedMessages.map(message => {
        // Extract S_No and message content
        const match = message.match(/.*\(S_No: (\d+)\)/);
        if (match && match.length === 2) {
          // Extracted S_No and message content
          const S_No = parseInt(match[1]); // Parse S_No as integer
          const content = message.replace(/ \(S_No: \d+\)/, ''); // Remove S_No from message content
          return { S_No, content };
        } else {
          // Invalid format, return null
          return null;
        }
      }).filter(Boolean); // Filter out any null entries
  
      setMessages(processedMessages);
    }
  }, []);
  
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
      <DashboardCard
          
        />
      <Card style={{ width: 950, height: 250 }}>
      <h2>New:</h2>
      <div>
      <MarqueeList messages={messages} />
      </div>
      </Card>
      </Space>
      <Card style={{ width: 1300, height: 250 }}>
      <Linechart/>
      </Card>
      <Space>
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

const MarqueeList = ({ messages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const handleView = (S_No) => {
    console.log(S_No);
    fetchDataFromAPI(S_No);
  };
  
  const fetchDataFromAPI = (S_No) => {
    setIsLoading(true);
    try {
      fetch(`http://localhost/Anekal.php?S_No=${S_No}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle fetched data
          showDataModal(data.query_6);
          setData(data.query_6);
          console.log(data.query_6);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const showDataModal = (data) => {
    const columns = [
      { title: 'FIRNo', dataIndex: 'FIRNo', key: 'FIRNo' },
      { title: 'Year', dataIndex: 'Year', key: 'Year' },
      { title: 'Month', dataIndex: 'Month', key: 'Month' },
      { title: 'FIR_Date', dataIndex: 'FIR_Date', key: 'FIR_Date' },
      { title: 'FIR_Stage', dataIndex: 'FIR_Stage', key: 'FIR_Stage' },
      { title: 'Complaint_Mode', dataIndex: 'Complaint_Mode', key: 'Complaint_Mode' },
      { title: 'CrimeGroup_Name', dataIndex: 'CrimeGroup_Name', key: 'CrimeGroup_Name' },
      { title: 'ActSection', dataIndex: 'ActSection', key: 'ActSection' },
      { title: 'IOName', dataIndex: 'IOName', key: 'IOName' },
      { title: 'Place_of_Offence', dataIndex: 'Place_of_Offence', key: 'Place_of_Offence' },
      { title: 'FIR_ID', dataIndex: 'FIR_ID', key: 'FIR_ID' },
    ];
  
    Modal.info({
      title: 'Fetched Data',
      content: (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false} // Disable pagination if needed
        />
      ),
      width: calculateModalWidth(columns), // Calculate modal width based on column count
      height: '80vh', // Set modal height to 80% of viewport height
    });
  };
  const calculateModalWidth = (columns) => {
    const defaultColumnWidth = 150; // Adjust this value according to your needs
    const minWidth = 400; // Minimum modal width
  
    const totalWidth = columns.reduce((acc, curr) => acc + (curr.width || defaultColumnWidth), 0);
    return Math.max(totalWidth, minWidth);
  };
  const marqueeRef = useRef(null);
  
    const handleMouseEnter = () => {
      marqueeRef.current.stop();
    };
  
    const handleMouseLeave = () => {
      marqueeRef.current.start();
    };
  return (
    <marquee direction="up" ref={marqueeRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <span style={{ fontSize: '20px',marginRight: '20px' }}>{message.content}</span>
            <button onClick={() => handleView(message.S_No)} style={{ width: '100px', height: '23px', fontSize: '18px' }}>View</button>
          </li>
        ))}
      </ul>
    </marquee>
  );
};




function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 350, height: 250 }}>
      <Space direction="horizontal">
        <div>
        <img
        src="https://st.depositphotos.com/14768666/53978/v/450/depositphotos_539789962-stock-illustration-policeman-cop-icon-flat-isolated.jpg"
        alt="User Profile Picture"
        style={{
          width: '150px', // Adjust width as needed
          height: '100px', // Adjust height as needed
          borderRadius: '50%', // Make the image circular
          objectFit: 'cover', // Ensure the image fills the container
        }}
      />
      <h3>Assistant Commissoner Of Police</h3>
      <h3>Bengaluru City</h3>
        </div>
      </Space>
    </Card>
  );
}

function RecentOrders() {
  return (
    <Card style={{width:600,height:550}}>
     <center><h2>Bengaluru Beat: Police Station Locator</h2></center> 
      <Bangloremap/>
    </Card>
  );
}

function DashboardChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    fetch('http://localhost/Demo.php')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          Year: item.Year,
          Arrested: parseInt(item.Arrested),
          total_accused: parseInt(item.total_accused),
          Chargesheeted: parseInt(item.Chargesheeted),
          Convicted: parseInt(item.Convicted)
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="bar-chart-container">
    <Card style={{ width: 750, height: 550 }}>
    <center><h2>Behind the Bars: Graphing Accused Populations</h2></center>
     <Multichart/>
      </Card>
    </div>
  );
}

export default Dashboard;
