import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Sample event data with reminders
  const sampleEvents = [
    {
      id: 1,
      title: 'Duty 1',
      start: new Date(2024, 2, 20, 10, 0),
      end: new Date(2024, 2, 20, 12, 0),
      reminders: [
        { message: 'Reminder for Duty 1', time: new Date(2024, 2, 20, 9, 30) }
      ],
    },
    // Add more sample events as needed
  ];

  useEffect(() => {
    setEvents(sampleEvents);
    // Extract reminders from events and set in the state
    const extractedReminders = sampleEvents.flatMap(event => event.reminders);
    setReminders(extractedReminders);
  }, []);

  useEffect(() => {
    // Check for reminders on page load
    checkReminders();
  }, []);

  const checkReminders = () => {
    const currentDate = new Date();
    const todayReminders = reminders.filter(reminder => isSameDate(new Date(reminder.time), currentDate));

    todayReminders.forEach(reminder => {
      // Display popup message for each reminder
      toast.info(reminder.message);
    });
  };

  const isSameDate = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        // Add your event handling functions here
      />
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default CalendarComponent;
