import React, { useState, useEffect } from 'react';
import './ReportTable.css';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/unit.php');
      const jsonData = await response.json();
      setData(jsonData.query_4);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRequestReport = (firNo, firDate, crimeGroupName, ioName, actSection) => {
    // Concatenate values into a single string delimited by comma
    const requestData = [firNo, firDate, crimeGroupName, ioName, actSection].join(';');
    // Display alert with FIR_No
    alert(`Request sent for FIR No: ${firNo}`);
    // Log FIR_No
    console.log(`Request sent for FIR No: ${firNo}`);
    // Store requestData in localStorage
    localStorage.setItem('requestedData', requestData);
  };

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    row.FIRNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Unsolved FIR 2016-2024</h2>
      <div className="search-container">
        <label htmlFor="search">Search by FIR No:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter FIR No"
        />
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
            <th>Redirect</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
              <td>
                <button
                  onClick={() => handleRequestReport(row.FIRNo, row.FIR_Date, row.CrimeGroup_Name, row.IOName, row.ActSection)}
                  className="request-report-btn"
                >
                  Request Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
