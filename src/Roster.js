import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    officerName: '',
    role: '',
    shift: '',
    duties: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server to store in the database
    console.log(formData);
    // Reset form data
    setFormData({
      officerName: '',
      role: '',
      shift: '',
      duties: ''
    });
    // Hide the form
    setShowForm(false);
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={() => setShowForm(true)} // Show form on day click
      />
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Officer Name:
            <input type="text" name="officerName" value={formData.officerName} onChange={handleChange} />
          </label>
          <label>
            Role:
            <input type="text" name="role" value={formData.role} onChange={handleChange} />
          </label>
          <label>
            Shift:
            <input type="text" name="shift" value={formData.shift} onChange={handleChange} />
          </label>
          <label>
            Duties:
            <input type="text" name="duties" value={formData.duties} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CalendarComponent;
