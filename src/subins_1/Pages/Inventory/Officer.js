import React, { useState, useEffect } from 'react';
import './Officer.css';
import Card from './Card'
const SortControls = ({ sortConfig, requestSort }) => {
  const handleClick = (key) => {
    requestSort(key);
  };

  return (
    <div>
      <button onClick={() => handleClick('Total Cases')}>
        Total Cases {sortConfig.key === 'Total Cases' && sortConfig.direction === 'ascending' ? '↑' : '↓'}
      </button>
      <button onClick={() => handleClick('Clearance Rate')}>
        Clearance Rate {sortConfig.key === 'Clearance Rate' && sortConfig.direction === 'ascending' ? '↑' : '↓'}
      </button>
    </div>
  );
};

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const [showModal, setShowModal] = useState(false);
  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/unit.php');
      const jsonData = await response.json();
      setData(jsonData.query_5);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter data based on search term for UnitName
  const filteredData = data.filter((row) =>
    row.UnitName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (sortConfig.direction === 'ascending') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    });
  }, [filteredData, sortConfig]);
  
  return (
    <div>
      <h2>INSPECTOR PERFORMANCE ANALYSIS</h2>
      <div className="search-container">
        <label htmlFor="search">Search by UnitName:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter UnitName"
        />
      </div>
      <SortControls sortConfig={sortConfig} requestSort={requestSort} />
      <table className="custom-table">
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
            <th>View</th> {/* Add the button here */}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
              <td><button onClick={handleShowModal}>View</button></td> {/* Button for View */}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <Card handleClose={handleCloseModal}  />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
