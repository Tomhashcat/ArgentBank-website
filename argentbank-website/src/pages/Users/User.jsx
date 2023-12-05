import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.scss";
import { useDispatch } from 'react-redux';
import { setFirstName, setLastName, profileError } from './profileSlice';
import { useAuth } from '../../AuthContext';
import EditButton from '../../components/button/button';
import EditUserNameForm from '../../components/form/form';
import { userDatas } from '../../services/userDatas';

function UserPage() {
  const { isLoggedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = getToken();

    if (!token) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/login');
    } else {
      userDatas(token)
        .then(data => {
          dispatch(setFirstName(data.firstName));
          dispatch(setLastName(data.lastName));
        })
        .catch(error => {
          dispatch(profileError(error.response.data.message));
        });
    }
  }, [getToken, navigate, dispatch]);

  const handleSaveUserName = (newUserName) => {
    const token = getToken();
    if (isLoggedIn && token) {
      axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { userName: newUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then(response => {
          console.log('User name updated successfully:', response.data);
          setIsEditingUserName(false);
        })
        .catch(error => {
          console.error('Error updating user name:', error);
          // Gérez les erreurs ici
        });
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        {isEditingUserName ? (
          <EditUserNameForm onSubmit={handleSaveUserName} />
        ) : (
          <EditButton onClick={() => setIsEditingUserName(true)} />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        {/* ... Vos autres sections ici ... */}
      </section>
    </main>
  );
}

export default UserPage;
