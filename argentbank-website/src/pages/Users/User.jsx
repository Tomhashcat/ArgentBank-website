import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.scss";
import { useDispatch, useSelector } from 'react-redux';

import {  firstName, error, user, token } from './UserSlice';


import EditButton from '../../components/button/button';
import EditUserNameForm from '../../components/form/form';


function UserPage() {


  const navigate = useNavigate();
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const dispatch = useDispatch();
const firstName=useSelector((state) => state.user.firstName)




  const handleSaveUserName = (formData) => {
    // Logique pour sauvegarder le nom d'utilisateur
    console.log('Saving username:', formData.username);

    // Mettez à jour le state ou effectuez d'autres actions nécessaires
    setIsEditingUserName(false);
  };





  return (
    <>
     
        <main className="main bg-dark">

          <div className="header">
            <h1>Welcome back<br />{firstName} !</h1>
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
     
    </>
  );
}

export default UserPage;
