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

  const token = localStorage.getItem('token');
  useEffect(() => {
    // Check for the presence of a token, and redirect to login if not present 

    if (!token) {
      navigate('/Login');
    }
  }, [token, navigate]);

  const handleEditNameClick = () => {
    setIsEditingUserName(true);
  };
  const firstName = useSelector((state) => state.user.firstName)

  const isLogin = useSelector((state) => state.user.isLogin)



  const newUserName = useSelector((state) => state.user.userName)




  return (

    <>

      <main className="main bg-dark">

        <div className="header">
          <h1>Welcome back<br />{firstName} !</h1>
          {isEditingUserName ? (
            <EditUserNameForm onSubmit={(newUserName) => dispatch(handleSaveUserName(newUserName, isLogin, token))} />
          ) : (
            <EditButton onClick={handleEditNameClick} />
          )}
        </div>
        
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <AccountWrap />
        </section>
        <section className="account">
          <AccountWrap />
        </section>
        <section className="account">
          <AccountWrap />
        </section>



      </main>

    </>
  );
}

export default UserPage;
