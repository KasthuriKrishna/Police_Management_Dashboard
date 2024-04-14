import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Cal.css'; // Import CSS file for additional styling

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
  });

  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setNewEvent({ ...newEvent, start: date });
  };

  const handleEndDateChange = (date) => {
    setNewEvent({ ...newEvent, end: date });
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setPopupMessage('Agenda deleted successfully!');
    setTimeout(() => {
      setPopupMessage('');
    }, 2000);
  };

  const handleEditEvent = (event) => {
    setNewEvent(event);
    setShowDialog(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.start >= newEvent.end) {
      setError('End date must be after start date');
      return;
    }

    if (newEvent.id) {
      const updatedEvents = events.map(event =>
        event.id === newEvent.id ? { ...newEvent } : event
      );
      setEvents(updatedEvents);
      setPopupMessage('Agenda edited successfully!');
    } else {
      const id = events.length ? events[events.length - 1].id + 1 : 1;
      setEvents([...events, { ...newEvent, id }]);
      setPopupMessage('Agenda added successfully!');
    }

    setNewEvent({ id: null, title: '', start: new Date(), end: new Date(), description: '' });
    setError('');
    setShowDialog(false);

    setTimeout(() => {
      setPopupMessage('');
    }, 2000);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={({ start, end }) => {
            setNewEvent({ id: null, title: '', start, end, description: '' });
            setShowDialog(true);
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
            style: {
              backgroundColor: isSelected ? '#3174ad' : '#1976d2',
              color: 'white',
              borderRadius: '0px',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          })}
        />
      </div>
      {showDialog && (
        <div className="dialog-container">
          <div className="dialog-content">
            <h3>{newEvent.id ? 'Edit Event' : 'Add Event'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date:</label>
                <input
                  type="datetime-local"
                  name="start"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date:</label>
                <input
                  type="datetime-local"
                  name="end"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">{newEvent.id ? 'Edit Event' : 'Add Event'}</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
          <div className="dialog-overlay" onClick={() => setShowDialog(false)}></div>
        </div>
      )}
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
      {selectedEvent && (
        <div className="event-actions">
          <button onClick={() => handleEditEvent(selectedEvent)}>Edit</button>
          <button onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
