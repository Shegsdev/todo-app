import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigate("/todos");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30,
        })
      });
      const data = await response.json();
      let token;
      if (token = data?.token) {
        login(token);
        navigate("/todos");
      }

    } catch (error) {
      setError(error.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>Login to continue</h1>
      <div className={classNames("error", { show: showError && !loading })}>
        <p>{error}</p>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>{loading ? 'Please wait...' : `Let's go!`}</button>
      </form>
    </div>
  );
};

export default Login;
