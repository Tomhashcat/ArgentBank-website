// EditUserNameForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditUserNameForm({ onSubmit }) {
  const [newUserName, setNewUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newUserName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Username:
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditUserNameForm;
