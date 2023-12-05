// Profile.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName, setLastName, setError } from './path/to/profileSlice'; // Ajustez le chemin en conséquence
import UserHeader from '../../components/userHeader';
import ProfileAccounts from '../../components/ProfileAccounts';
import { userDatas } from '../../services/userDatas';
import axios from 'axios';

const Profile = () => {
  const dispatch = useDispatch();
  const { isRemember } = useSelector((state) => state.login);
  const { firstName, lastName, error } = useSelector((state) => state.profile);

  useEffect(() => {
    userDatas()
      .then((data) => {
        dispatch(setFirstName(data.body.firstName));
        dispatch(setLastName(data.body.lastName));

        if (isRemember) {
          localStorage.setItem('firstName', data.body.firstName);
          localStorage.setItem('lastName', data.body.lastName);
        } else {
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
        }
      })
      .catch((error) => dispatch(setError(error.response.data.message)));
  }, [isRemember, dispatch]);

  return (
    <main className="main bg-dark">
      <UserHeader />
      <ProfileAccounts />
    </main>
  );
};

export default Profile;
