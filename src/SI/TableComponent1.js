import React, { useState, useEffect } from 'react';
import './Table.css';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState(() => {
    // Load selected rows from localStorage on initial render
    const storedSelectedRows = localStorage.getItem('selectedRows');
    return storedSelectedRows ? JSON.parse(storedSelectedRows) : [];
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Save selected rows to localStorage whenever it changes
    localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
  }, [selectedRows]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/Anekal.php');
      const jsonData = await response.json();
      setData(jsonData.query_3);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    row.FIRNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (row) => {
    const selectedIndex = selectedRows.findIndex(
      (selectedRow) => selectedRow.FIRNo === row.FIRNo
    );

    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, row]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const handleRemoveRow = (row) => {
    const updatedSelectedRows = selectedRows.filter(
      (selectedRow) => selectedRow.FIRNo !== row.FIRNo
    );
    setSelectedRows(updatedSelectedRows);
    // Update localStorage to remove the row
    localStorage.setItem('selectedRows', JSON.stringify(updatedSelectedRows));
  };

  return (
    <div>
      <h2>Untraced FIR 2016-2024</h2>
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
            <th>Mark Important</th>
            {data.length > 0 &&
              Object.keys(data[0]).map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.some(
                    (selectedRow) => selectedRow.FIRNo === row.FIRNo
                  )}
                  onChange={() => handleCheckboxChange(row)}
                />
              </td>
              {Object.values(row).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <SelectedRowsTable selectedRows={selectedRows} handleRemoveRow={handleRemoveRow} />
    </div>
  );
};

const SelectedRowsTable = ({ selectedRows, handleRemoveRow }) => {
  return (
    <div id="section1">
      <h2>Selected FIRs</h2>
      <table className="custom-table">
        <thead>
          <tr>
            {selectedRows.length > 0 &&
              Object.keys(selectedRows[0]).map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
              <td>
                <button onClick={() => handleRemoveRow(row)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
