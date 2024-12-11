import React, { useState } from 'react';

const AddressForm = ({ onSave }) => {
  const [form, setForm] = useState({ flat: '', area: '', category: 'Home' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="flat" placeholder="House/Flat/Block No." onChange={handleChange} />
      <input name="area" placeholder="Apartment/Road/Area" onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option>Home</option>
        <option>Office</option>
        <option>Friends & Family</option>
      </select>
      <button type="submit">Save Address</button>
    </form>
  );
};

export default AddressForm;
