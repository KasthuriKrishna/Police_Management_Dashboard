import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieActiveArc() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/Anekal.php'); // Assuming the JSON file is named data.json
        const jsonData = await response.json();
        // Access query_2 array from JSON response
        const query2Data = jsonData.query_2;
        setData(query2Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Manually assigned colors for legend items
  const colors = ['#00ced1', '#1e90ff', '#ba55d3', '#4b0082', '#00008b'];

  const renderLegend = () => {
    return (
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {data.map((item, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: colors[index % colors.length], // Assign color from colors array
                marginRight: '5px',
                borderRadius: '50%',
              }}
            ></span>
            {item.CrimeGroup_Name} {/* Assuming each item in data array has a 'CrimeGroup_Name' property */}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>Crime Group Analysis</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PieChart
          series={[
            {
              data: data.map(item => ({
                id: item.CrimeGroup_Name,
                value: item.group_count,
              })),
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              cx: 200, cy: 100
            },
          ]}
          height={200}
          legend="none" // Hide the default legend
        />
        <div style={{ marginTop: '10px' }}>{renderLegend()}</div>
      </div>
    </>
  );
}
