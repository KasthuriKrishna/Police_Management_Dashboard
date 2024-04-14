import React, { useState, useEffect } from 'react';
import './View.css';
const Card = ({ handleClose }) => {
  return (
      <div className="card">
      <div className="card-header">
        <img src="https://e7.pngegg.com/pngimages/40/688/png-clipart-police-officer-computer-icons-police-station-international-women-039-s-day-march-8-police-officer-hat.png" alt="Police Badge" />
        <div>
          <h2>Police Officer</h2>
          <h4>Badge No: XXXX</h4>
        </div>
      </div>
      <div className="card-body">   
        <div className="details">
        <p><b>Name:</b> HEMANTHA KUMAR M </p>
        <p><b>Date of Birth:</b> September 24,1992</p>
        <p><b>Age:</b> 31</p>
        <p><b>Unit Name:</b> Anekal PS</p>
        <p><b>Years of Service:</b> 9 </p>
        <p><b>Key Achievements:</b> Successfully led multiple high-profile investigations resulting in significant reductions in crime rates. Received commendation from the Chief Minister for outstanding service.</p>
        </div>
        </div>
        <center><button onClick={handleClose} style={{'width':'150px'}}>Close Card</button></center>
      
    </div>
  ); 
};
export default Card;