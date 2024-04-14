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
                id: item.Convicted, // Change to customId or whatever you've changed it to
                value: item.Chargesheeted, // Change to customValue or whatever you've changed it to
                label: item.Year, // Change to customLabel or whatever you've changed it to
              })),
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}