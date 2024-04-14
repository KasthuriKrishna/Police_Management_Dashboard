import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useMessage } from '../MessageContext';
import html2canvas from 'html2canvas';
import './Report.css';

const NotificationButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [requestedData, setRequestedData] = useState([]);
  const [value, setValue] = useState('');
  const { message } = useMessage();
  const chartRef = useRef(null);
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (showModal) {
      const dataString = localStorage.getItem('requestedData');
      if (dataString) {
        const dataArray = dataString.split(';');
        setRequestedData(dataArray);
      }
    }
  }, [showModal]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setValue((prevValue) => prevValue + '\n\u2022 ');
    }
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    if (inputValue && !inputValue.startsWith('\u2022')) {
      inputValue = '\u2022 ' + inputValue;
    }
    setValue(inputValue);
  };

  const handleDownload = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      const link = document.createElement('a');
      link.download = 'report.png';
      link.href = dataUrl;
      link.click();
      localStorage.setItem('downloadedReport', dataUrl); // Store the data URL in local storage
    });
  };

  const handleForward = () => {
    const downloadedReport = localStorage.getItem('downloadedReport');
    if (downloadedReport) {
      // Forward logic here
      alert("Report Successfully Forwarded to ACP");
      console.log('Forwarding report...');
    }
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={message.length + 1} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2}>
          <Typography variant="h6">Notifications</Typography>
          <Typography>
            <ul>
              {message.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
              <li>
                Report Requested by ACP :{' '}
                <button onClick={handleOpenModal}>Generate Report</button>
              </li>
            </ul>
          </Typography>
        </Box>
      </Popover>
      {showModal && (
        <div className="modal" ref={chartRef}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <div>
              <h2>
                <u>Case Report</u>
              </h2>
              <ul>
                {requestedData.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
              <form className="report-form">
                <div className="form-group">
                  <label htmlFor="report-date">Report Date:</label>
                  <input
                    type="date"
                    id="report-date"
                    className="input-field"
                    value={currentDate}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="current-status">Current Status:</label>
                  <input type="text" id="current-status" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Key-Investigations:</label>
                  <br />
                  <textarea
                    id="key-investigations"
                    className="textarea-field"
                    placeholder="Text here"
                    value={value}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                  />
                </div>
              </form>
              <div>
                <button onClick={handleDownload}>CONFIRM</button>
                <button style={{ marginLeft: '40px' }} onClick={handleForward}>
                  FORWARD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
