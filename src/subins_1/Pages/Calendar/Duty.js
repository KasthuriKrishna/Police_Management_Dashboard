import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal'; // Import the Modal component
import './Modal.css'; // Import CSS for modal styles

import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css'

const localizer = momentLocalizer(moment);

const WeeklyDutyRoster = () => {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || []
  );
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      // If editing an existing event
      const updatedEvents = events.map((event) =>
        event.id === editingId ? { ...formData, start: new Date(formData.start), end: new Date(formData.end) } : event
      );
      setEvents(updatedEvents);
      toast.success('Agenda updated successfully');
      setFormData({ id: '', title: '', start: '', end: '' });
      setEditingId(null);
    } else {
      // If adding a new event
      const newEvent = {
        id: events.length + 1,
        title: formData.title,
        start: new Date(formData.start), // Ensure start is a Date object
        end: new Date(formData.end), // Ensure end is a Date object
      };
      setEvents([...events, newEvent]);
      toast.success('Agenda added successfully');
      setFormData({ id: '', title: '', start: '', end: '' });
    }
    setShowForm(false); // Hide the form after submission
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setFormData({
      id: eventToEdit.id,
      title: eventToEdit.title,
      start: moment(eventToEdit.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(eventToEdit.end).format('YYYY-MM-DDTHH:mm'),
    });
    setEditingId(id);
    setShowForm(true);
  };

  const handleRemove = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    toast.info('Agenda removed successfully');
  };

  const checkReminders = () => {
    const now = new Date();
    events.forEach((event) => {
      const startTime = new Date(event.start);
      if (
        now.getFullYear() === startTime.getFullYear() &&
        now.getMonth() === startTime.getMonth() &&
        now.getDate() === startTime.getDate() &&
        now.getHours() === startTime.getHours() &&
        now.getMinutes() === startTime.getMinutes()
      ) {
        // Display reminder when the start time matches local time
        displayReminder(event.title);
      }
    });
  };

  const displayReminder = (title) => {
    // Display reminder notification
    toast.info(`Reminder: ${title} is starting now!`);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowForm(true);
    setFormData({
      id: '',
      title: '',
      start: moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(slotInfo.end).format('YYYY-MM-DDTHH:mm'),
    });
  };

  // Ensure startAccessor and endAccessor are correctly defined if needed
  const startAccessor = 'start';
  const endAccessor = 'end';

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
         
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' ,width:'100%'}}>
      <div style={{ flex: '1', marginBottom: '20px' }}>
        <div style={{ height: '100%' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor={startAccessor}
            endAccessor={endAccessor}
            style={{ margin: '50px' }}
            components={{
              event: ({ event }) => (
                <div>
                  <strong>{event.title}</strong>
                  <button onClick={() => handleEdit(event.id)}>Edit</button>
                  <button onClick={() => handleRemove(event.id)}>-</button>
                </div>
              ),
            }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      </div>
      {showForm && selectedSlot && (
        <Modal onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {editingId !== null ? 'Update Agenda' : 'Add Agenda'}
            </button>
          </form>
        </Modal>
      )}
      <ToastContainer />
    </div>

      </div>
      <AppFooter />
    </div>

    
  );
};

export default WeeklyDutyRoster;
