import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearAuthUser, setAuthUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const GoogleLoginDashboard = () => {
  const [user,setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Call backend API to get current logged in user
    axios.get(`${API_URL}/api/v1/auth/current-user`, { withCredentials: true })
      .then(response => {
        console.log(response.data.user)
        dispatch(setAuthUser(response.data.user));
        setUser(response.data.user)
        navigate('/')
      })
      .catch(() => {
        dispatch(clearAuthUser());
      });
  }, [dispatch]);
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      {/* <img src={user.photo} alt="Profile" className="w-16 h-16 rounded-full mt-4" /> */}
    </div>
  );
};

export default GoogleLoginDashboard;
