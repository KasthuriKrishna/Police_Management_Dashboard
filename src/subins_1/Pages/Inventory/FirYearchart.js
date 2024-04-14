import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    // Fetch data from the API
    fetch('http://localhost/unit.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Check if the data is in the expected format
        if (Array.isArray(data.query_2)) {
          formatData(data.query_2); // Pass the array to formatData function
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const formatData = rawData => {
    // Group data by UnitName and aggregate Total_Cases for each FIR_Stage
    const groupedData = {};
    rawData.forEach(item => {
      const Year = item.Year;
      if (!groupedData[Year]) {
        groupedData[Year] = {};
      }
      groupedData[Year][item.FIR_Stage] = parseInt(item.Year_Count);
    });

    // Format data for stacked bar chart
    const formattedData = Object.keys(groupedData).map(Year => ({
      Year: Year,
      ...groupedData[Year]
    }));
    setData(formattedData);
  };

  return (
    <div className="stacked-bar-chart-container">
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }} // Adjust bottom margin for better x-axis label visibility
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" angle={-45} textAnchor="end" interval={0} height={100} />
          <YAxis />
          <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
          <Legend wrapperStyle={{ paddingTop: '70px' }} />
          {Object.keys(data[0] || {}).filter(key => key !== 'Year').map((stage, index) => (
            <Bar key={index} dataKey={stage} stackId="a" fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
