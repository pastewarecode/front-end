import React, { useState } from 'react';
import LoginForm from './LoginForm';
import './App.css';
import ChuckNorris from './ChuckNorris';

const App = () => {
  const [uuid, setUuid] = useState(null);

  const handleLogin = (userUuid) => {
    setUuid(userUuid);
  };

  return (
    <div className="app-container">
      {uuid ? (
        <div className="welcome">
          <h1>Welcome!</h1>
          <p>Your UUID: {uuid}</p>
          <ChuckNorris token={uuid} />
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
