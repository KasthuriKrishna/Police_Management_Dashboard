import React, { useState, useEffect } from 'react';
import './Table.css'
const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/Anekal.php');
      const jsonData = await response.json();
      setData(jsonData.query_4);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>FIR Under Investigation 2016-2024</h2>
      <table className="custom-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
