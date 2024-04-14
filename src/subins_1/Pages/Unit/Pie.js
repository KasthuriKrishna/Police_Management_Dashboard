import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieActiveArc() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/Demo.php'); // Assuming the JSON file is named data.json
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
      series={[
        {
            data: data.map(item => ({
                id: item.Total_cases, // Change to customId or whatever you've changed it to
                value: item.Chargesheeted, // Change to customValue or whatever you've changed it to
                label: item.Convicted, // Change to customLabel or whatever you've changed it to
              })),
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 5,
              startAngle: -180,
              endAngle: 180,
              cx: 1400,
              cy: 210,
        },
      ]}
      height={500}
    />
  );
}