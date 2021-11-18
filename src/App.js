import React, {Component, useEffect, useState} from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');  //1

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const  updateToken = (newToken) => {//3
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
  
  //log out
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    
    <Sitebar clickLogout={clearToken} />
  } 

  //render method is down here

  const protectedViews = () => {
    return(sessionToken === localStorage.getItem("token") ? <WorkoutIndex token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
        <Sitebar clearToken={clearToken}/>
        {protectedViews()}
    </div>
  );
}

export default App;
