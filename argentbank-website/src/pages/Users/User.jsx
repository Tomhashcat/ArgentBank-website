import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.scss";
import { useDispatch, useSelector } from 'react-redux';

import { setFirstName, setLastName, profileError, setUserName, setEmail } from './profileSlice';
import { useAuth } from '../../AuthContext';
import EditButton from '../../components/button/button';
import EditUserNameForm from '../../components/form/form';
import { userDatas } from '../../services/userDatas';

function UserPage() {
  const { isLoggedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.profile.userName);
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
          dispatch(setEmail(data.email));
          dispatch(setUserName(data.userName));
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
        <h1>Welcome back<br />{userName}!</h1>
        {isEditingUserName ? (
          <EditUserNameForm onSubmit={handleSaveUserName} />
        ) : (
          <EditButton onClick={() => setIsEditingUserName(true)} />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default UserPage;
