//TimeLine.js

import React, { useState } from 'react';
import './Timeline.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const Timeline = ({ incidents }) => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedCrimeType, setSelectedCrimeType] = useState(null);
  


  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
  };


  const handleCrimeTypeClick = (crimeType) => {
    setSelectedCrimeType(crimeType);
    setSelectedIncident(null); // Reset selected incident when crime type is clicked
  };
  const navigate = useNavigate();
  const handleclose=()=>{
    navigate('/InspectorDashboard');
}
  /*const getMarginLeft = (date) => {
    const incidentDate = new Date(date);
    const earliestDate = new Date(Math.min(...incidents.map(incident => new Date(incident.date))));
    const diffDays = Math.floor((incidentDate - earliestDate) / (1000 * 60 * 60 * 24));
    return ${diffDays*5}px; // Adjust the multiplier to change the spacing between incidents
  };*/
  
  return (
    <div className="timeline-container">
    <button onClick={handleclose}>Back</button>
      <h2>Crime Incident Timeline</h2>
      <div className="crime-types">
  <h3>Crime Types</h3>
  <div className="crime-tags">
    <span className="crime-tag" onClick={() => handleCrimeTypeClick(null)} style={{'backgroundColor':'pink'}}>All</span>
    {Array.from(new Set(incidents.map(incident => incident.crimeType))).map((crimeType, index) => (
      <span key={index} className="crime-tag" onClick={() => handleCrimeTypeClick(crimeType)} style={{'backgroundColor':'pink'}}>{crimeType}</span>
    ))}
  </div>
</div>
      <div className="timeline-wrapper">
      <ul className="timeline">
      {incidents.filter(incident => !selectedCrimeType || incident.crimeType === selectedCrimeType).map((incident, index) => (
        <li key={index} onClick={() => handleIncidentClick(incident)}>
          <div className="content">
            <h3>{incident.caseName}</h3>
            <p>{incident.date}</p>
            <div className="timeline-bar">
              <div className="tooltip filing-bar" style={{ '--filing-width': incident.filingWidth }}>
                <span className="tooltiptext">Filed: {incident.dateFiled}</span>
              </div>
              <div className="tooltip investigation-bar" style={{ '--investigation-width': incident.investigationWidth }}>
                <span className="tooltiptext">Investigation: {incident.investigationTime}</span>
              </div>
              <div className="tooltip closure-bar" style={{ '--closure-width': incident.closureWidth }}>
                <span className="tooltiptext">Closed: {incident.dateClosed}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
        <div className="sidebar">
          {selectedIncident && (
            <div className="selected-incident">
              <h3>{selectedIncident.crimeType}</h3>
              <p><strong>Date Filed:</strong> {selectedIncident.dateFiled}</p>
              <p><strong>Investigation Time:</strong> {selectedIncident.investigationTime}</p>
              <p><strong>Closed:</strong> {selectedIncident.dateClosed}</p>
              <p><strong>Location:</strong> {selectedIncident.location}</p>
              <p><strong>Description:</strong> {selectedIncident.description}</p>
              <p><strong>Proof:</strong></p>
              <img src={selectedIncident.imageUrl}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
    const crimeIncidents = [
      {
        crimeType: 'Burglary',
        caseName: 'House Burglary on Church Street',
        location: 'Church Street',
        date: '2024-03-20',
        dateFiled: '2024-03-21',
        investigationTime: '1 month',
        dateClosed: '2024-04-25',
        description: 'A house burglary was reported on Church Street.',
        filingWidth: '15%',
        investigationWidth: '55%',
        closureWidth: '30%',
        imageUrl:'https://th.bing.com/th/id/OIP.39lDaOEqj6nXGMVsGr3zKQHaEK?w=313&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7'
      },
      {
        crimeType: 'Burglary',
        caseName: 'Residential Burglary on Avenue Road',
        location: 'Avenue Road',
        date: '2024-04-10',
        dateFiled: '2024-04-12',
        investigationTime: '2 months',
        dateClosed: '2024-06-15',
        description: 'A residential burglary occurred on Avenue Road.',
        filingWidth: '10%',
        investigationWidth: '70%',
        closureWidth: '20%',
        imageUrl:'https://th.bing.com/th?id=OIP.QQlgxXOJ-HpjqY5xmx9puAHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2'
      },
        {
          crimeType: 'Robbery',
          caseName: 'Bank Robbery at Mahatma Gandhi Road',
          location: 'Mahatma Gandhi Road',
          date: '2024-01-01',
          dateFiled: '2024-01-02',
          investigationTime: '3 weeks',
          dateClosed: '2024-02-01',
          description: 'A robbery occurred at the bank on Mahatma Gandhi Road.',
          filingWidth: '20%', // Adjust these widths according to your data
          investigationWidth: '60%',
          closureWidth: '20%',
          imageUrl:'https://th.bing.com/th?id=OIP.qOevzj9IWrS-FNaPXMgTJgHaEL&w=332&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2'
        },
        {
          crimeType: 'Robbery',
          caseName: 'Jewelry Store Robbery at Koramangala ',
          location: 'Koramangala ',
          date: '2024-02-10',
          dateFiled: '2024-02-12',
          investigationTime: '1 month',
          dateClosed: '2024-03-15',
          description: 'A jewelry store was robbed on Koramangala .',
          filingWidth: '30%',
          investigationWidth: '50%',
          closureWidth: '20%',
          imageUrl:'https://th.bing.com/th/id/OIP.Uw3FeUfN4jW8BBRZxU1JWAHaD5?w=329&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7'
        },
        {
          crimeType: 'Robbery',
          caseName: 'Convenience Store Robbery at Park Road',
          location: 'Park Road',
          date: '2024-03-20',
          dateFiled: '2024-03-22',
          investigationTime: '2 weeks',
          dateClosed: '2024-04-10',
          description: 'A convenience store was robbed on Park Road.',
          filingWidth: '25%',
          investigationWidth: '45%',
          closureWidth: '30%',
          imageUrl:'https://th.bing.com/th?id=OIP.jDnYuhOy5XegNvdiP2ylmwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2'
        },
        {
          crimeType: 'Assault',
          caseName: 'Assault at Indiranagar',
          location: 'Indiranagar',
          date: '2024-02-15',
          dateFiled: '2024-02-16',
          investigationTime: '2 months',
          dateClosed: '2024-04-20',
          description: 'An assault took place in the park on Indiranagar.',
          filingWidth: '10%',
          investigationWidth: '70%',
          closureWidth: '20%',
          imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXzmsP3SK__XeAd4UgllvxyCilZ4o7bN48g&usqp=CAU'
        },
        {
          crimeType: 'Assault',
          caseName: 'Assault at Cubbon Park',
          location: 'Cubbon Park',
          date: '2024-03-05',
          dateFiled: '2024-03-06',
          investigationTime: '3 weeks',
          dateClosed: '2024-03-28',
          description: 'An altercation led to an assault at Cubbon Park.',
          filingWidth: '15%',
          investigationWidth: '60%',
          closureWidth: '25%',
          imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFpGW5YnXy6RqZt5CqzuC_GKkdWIwI3G030Q&usqp=CAU'
        },
        {
          crimeType: 'Vandalism',
          caseName: 'Vandalism at Lalbagh Botanical Garden',
          location: 'Lalbagh Botanical Garden',
          date: '2024-04-05',
          dateFiled: '2024-04-06',
          investigationTime: '1 month',
          dateClosed: '2024-05-06',
          description: 'Vandalism reported at the Lalbagh Botanical Garden.',
          filingWidth: '20%',
          investigationWidth: '60%',
          closureWidth: '20%',
          imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQuUq7_EE1IwDUeuQb-AnqLXWGnKRiwjR0Qw&usqp=CAU'
        },
        {
          crimeType: 'Shoplifting',
          caseName: 'Shoplifting at Supermart',
          location: 'MG Road',
          date: '2024-04-10',
          dateFiled: '2024-04-11',
          investigationTime: '2 weeks',
          dateClosed: '2024-04-24',
          description: 'Shoplifting incident reported at Supermart.',
          filingWidth: '25%',
          investigationWidth: '50%',
          closureWidth: '25%',
          imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRUvSwGmmxZPvKPYJas-nf5CI3MvkJFL9bA&usqp=CAU'
        },
        {
    crimeType: 'Fraud',
    caseName: 'Credit Card Fraud at Downtown',
    location: 'Downtown',
    date: '2024-03-15',
    dateFiled: '2024-03-16',
    investigationTime: '2 months',
    dateClosed: '2024-05-15',
    description: 'Credit card fraud reported at Downtown area.',
    filingWidth: '15%',
    investigationWidth: '65%',
    closureWidth: '20%',
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtIA_ajtTjVfOWlJ5AHLtn2KupIA9Ox0CKw&usqp=CAU'
  },
  {
    crimeType: 'Vehicle Theft',
    caseName: 'Car Theft at Residency Road',
    location: 'Residency Road',
    date: '2024-04-08',
    dateFiled: '2024-04-10',
    investigationTime: '1 month',
    dateClosed: '2024-05-10',
    description: 'A car was stolen from the parking lot.',
    filingWidth: '20%',
    investigationWidth: '55%',
    closureWidth: '25%',
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt7HaRn4CcD6fFx9m3N_1I8k3jUPp3qmYVF8bj4G9mzYZRs7zP63FT4LkzPuzYWE5ekbo&usqp=CAU'
  }
    ]
  return (
    <div>
      <Timeline incidents={crimeIncidents} />
    </div>
  );
};

export default App;