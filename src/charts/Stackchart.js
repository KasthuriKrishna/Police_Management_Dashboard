import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    // Fetch data from the API
    fetch('http://localhost/Demo.php')
      .then(response => response.json())
      .then(data => {
        // Parse and format the data for stacked bar chart
        const formattedData = data.map(item => ({
          Year: item.Year,
          Arrest: parseInt(item.Arrest),
          total_cases_recorded:parseInt(item.total_cases_recorded),
          clearance_rate:parseFloat(item.clearance_rate)
          // Add more categories if needed
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="stacked-bar-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Arrest" stackId="a" fill="#8884d8" />
          <Bar dataKey="total_cases_recorded" stackId="a" fill="#82ca9d" />
          <Bar dataKey="clearance_rate" stackId="a" fill="#ffc658" />
          {/* Add more Bar components for additional categories */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
