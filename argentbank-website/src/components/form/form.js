// EditUserNameForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const handleSaveUserName = createAsyncThunk(
  'user/saveUserName',

  async (newUserName, { dispatch, getState }) => {
    try {
      const token = sessionStorage.getItem('token');

      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { userName: newUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('User name updated successfully:', response.data);
      window.location.reload();

      return response.data;  // Return the response data if needed
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;  // Rethrow the error to reject the promise
    }
  }
);

function EditUserNameForm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSaveUserName(userName))
      .then(() => {
        // Gérer le succès si nécessaire
      })
      .catch((error) => {
        // Gérer l'erreur si nécessaire
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditUserNameForm;
