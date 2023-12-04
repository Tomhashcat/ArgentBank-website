import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.scss";


import { useAuth } from '../../AuthContext';
import EditButton from '../../components/button/button';
import EditUserNameForm from '../../components/form/form';

function UserPage() {
  const { isLoggedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [isEditingUserName, setIsEditingUserName] = useState(false);

  const handleEditNameClick = () => {
    setIsEditingUserName(true);
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = getToken(); // Déplacez la déclaration de token ici
    if (!token) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/login');
    }
  }, [getToken, navigate]);

  const handleSaveUserName = (newUserName) => {
    console.log('New user name:', newUserName);
    const token = getToken();
    if (isLoggedIn && token) {
      axios.put(
        'http://localhost:3001/api/v1/user/profile',
        {userName: newUserName },
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
      console.log('New user name:', newUserName);
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
          <EditButton onClick={handleEditNameClick} />
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
  )
}

export default UserPage;


   

