import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({ Name: '', Place: '' });

  const handleChange = (e) => {
    const { name, value } = e.target; // Use lowercase 'name'
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/submitFormData.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
      </label>
      <label>
        Place:
        <input type="text" name="Place" value={formData.Place} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
