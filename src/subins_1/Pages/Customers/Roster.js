import React, { useState } from 'react';

const DutyRosterTable = () => {
  // Sample data for the duty roster
  const [dutyRoster, setDutyRoster] = useState([
    {
      id: 1,
      officerName: 'John Doe',
      post: 'Patrol Officer',
      shift: 'Day Shift',
      date: '2024-03-18',
      duties: 'Patrol assigned area, respond to emergencies',
      location: 'Central Precinct',
    },
    // Add more entries as needed
  ]);

  return (
    <div>
      <h2>Duty Roster</h2>
      <table>
        <thead>
          <tr>
            <th>Officer Name</th>
            <th>Post</th>
            <th>Shift</th>
            <th>Date</th>
            <th>Duties</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {dutyRoster.map((duty) => (
            <tr key={duty.id}>
              <td>{duty.officerName}</td>
              <td>{duty.post}</td>
              <td>{duty.shift}</td>
              <td>{duty.date}</td>
              <td>{duty.duties}</td>
              <td>{duty.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DutyRosterTable;
