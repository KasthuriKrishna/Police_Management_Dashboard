import React from 'react';
import InteractiveTable from 'react-interactive-table';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../MessageContext';

export const ComponentA = () => {
  const { sendMessage } = useMessage();
  const navigate = useNavigate();

  const handleMessageSend = (resource) => {
    alert('Resource is successfully allocated and notified');
    sendMessage(`Resource "${resource}" is allocated`);
  };

  const data = [
    {RT: 'Patrol Vehicles', D: 'Marked sedans', QA:10, c: 'Good',L:'Anekal PS',AS:'24/7',N:'Regular maintenance', Actions:( <button onClick={() => handleMessageSend('Marked sedans')}>Allocate Resource</button>)},
    {RT: '', D: 'SUVs', QA:5, c: 'Fair',L:'Attible PS',AS:'24/7',N:'Due for replacement',Actions:( <button onClick={() => handleMessageSend('SUVs')}>Allocate Resource</button>)},
    {RT: '', D: 'Motorcycles', QA:3, c: 'Good',L:'Anekal PS',AS:'Day shifts',N:'Specialized training required', Actions:( <button onClick={() => handleMessageSend('Motorcycles')}>Allocate Resource</button>)},
    {RT: 'Equipment', D: 'Firearms', QA:50, c: 'Good',L:'Koramangala PS',AS:'24/7',N:'Regular inspection', Actions:( <button onClick={() => handleMessageSend('Firearms')}>Allocate Resource</button>)},
    {RT: '', D: 'Body cameras', QA:30, c: 'Fair',L:'Attible PS',AS:'24/7',N:'Battery life varies', Actions:( <button onClick={() => handleMessageSend('Body cameras')}>Allocate Resource</button>)},
    {RT: '', D: 'Radios', QA:40, c: 'Good',L:'Banglore CEN PS',AS:'24/7',N:'Updated firmware', Actions:( <button onClick={() => handleMessageSend('Radios')}>Allocate Resource</button>)},
    {RT: 'Specialized Units', D: 'K-9 Unit', QA:1, c: 'Good',L:'Koramangala PS',AS:'On-call',N:'Two officers trained', Actions:( <button onClick={() => handleMessageSend('K-9 Unit')}>Allocate Resource</button>)},
    {RT: '', D: 'SWAT Team', QA:1, c: 'Good',L:'Anekal PS',AS:'On-call',N:'Regular training drills', Actions:( <button onClick={() => handleMessageSend('SWAT Team')}>Allocate Resource</button>)},
    {RT: '', D: 'Bomb Squad', QA:3, c: 'Good',L:'Banglore CEN PS',AS:'On-call',N:'Certified technicians', Actions:( <button onClick={() => handleMessageSend('Bomb Squad')}>Allocate Resource</button>)},
    {RT: 'Facilities', D: 'Precinct Buildings', QA:3, c: 'Good',L:'Attible PS',AS:'N/A',N:'Maintenance scheduled', Actions:( <button onClick={() => handleMessageSend('Facilities')}>Allocate Resource</button>)},
    {RT: '', D: 'Training Facility', QA:1, c: 'Good',L:'Anekal PS',AS:'Scheduled classes',N:'Upcoming renovations', Actions:( <button onClick={() => handleMessageSend('Training Facility')}>Allocate Resource</button>)}
  ];


  return (
    <div>
      <InteractiveTable
        tableStyles={'responsive'}
        dataList={data}
        columns={{
          RT: {
            alias: 'Resource Type',
            sortable: true,
            active: false,
            sortingKey: ''
          },
          D: {
            alias: 'Description',
            sortable: true,
            active: false,
            sortingKey: 'D'
          },
          QA: {
            alias: 'Quantity Available',
            sortable: true,
            active: false,
            sortingKey: 'QA'
          },
          c: {
            alias: 'Condition',
            sortable: true,
            active: false,
            sortingKey: 'D'
          },
          L: {
            alias: 'Location/Assignment',
            sortable: true,
            active: false,
            sortingKey: 'L'
          },
          AS: {
            alias: 'Availability Schedule',
            sortable: true,
            active: false,
            sortingKey: 'AS'
          },
          N: {
            alias: 'Notes/Remarks',
            sortable: true,
            active: false,
            sortingKey: 'L'
          },
          Actions: {
            alias: 'Allocate',
            sortable: false,
            active: false,
            sortingKey: ''
          }
        }}
        searching={{
          active: true,
          searchPlaceholder: 'Search...',
          searchKeys: ['RT', 'D', 'QA', 'C', 'L', 'N']
        }}
        paging={{
          maxRows: 3,
          prevBtn: 'Prev',
          nextBtn: 'Next',
          showAll: true,
          showAllText: 'show all',
          joinPages: false
        }}
      />
    </div>
  );
};
export default ComponentA;
