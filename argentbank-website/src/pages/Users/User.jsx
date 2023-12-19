import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.scss";
import { useSelector, useDispatch } from 'react-redux';
import './User.scss'
import { firstName, error, user, token, isLogin, userName } from './UserSlice';
import { handleSaveUserName } from '../../components/form/form';
import AccountWrap from '../../components/AccountWrapper/AccountWrapper';
import EditButton from '../../components/button/button';
import EditUserNameForm from '../../components/form/form';



function UserPage() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    
    const storedToken  = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!storedToken) {
      navigate('/Login');
    }
  }, [token, navigate]);

  const handleEditNameClick = () => {
    setIsEditingUserName(true);
  };

  const firstName = useSelector((state) => state.user.firstName)
  const newUserName = useSelector((state) => state.user.userName)


  return (

    <>

      <main className="main bg-dark">

        <div className="header">
          <h1>Welcome back<br />{firstName} !</h1>
          {isEditingUserName ? (
            <EditUserNameForm onSubmit={(newUserName) => dispatch(handleSaveUserName(newUserName, token))} />
          ) : (
            <EditButton onClick={handleEditNameClick} />
          )}
        </div>
        
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <AccountWrap
           title="Argent Bank Checking (x8349)"
           amount="$2,082.79"
           description="Available Balance"
           buttonText="View transactions" />
        </section>
        <section className="account">
          <AccountWrap 
           title="Argent Bank Savings (x6712)"
           amount="$10,928.42"
           description="Available Balance"
           buttonText="View transactions"/>
        </section>
        <section className="account">
          <AccountWrap
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
            buttonText="View transactions"
             />
        </section>



      </main>

    </>
  );
}

export default UserPage;
