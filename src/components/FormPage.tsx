// FormPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user details to local storage
    localStorage.setItem('userDetails', JSON.stringify({ name, phoneNumber, email }));
    // Redirect to the second page
    navigate('/second-page');
  };

  return (
    <div>
      <h1>Enter Your Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
