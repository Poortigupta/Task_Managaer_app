import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Register
      const res = await fetch('/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user);
        navigate('/dashboard');
      } else {
        alert(data.error);
      }
    } else {
      // Login Check
      const res = await fetch('/api/users/');
      const users = await res.json();
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        login(existingUser);
        navigate('/dashboard');
      } else {
        alert("User not found. Please register.");
      }
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 style={{ marginTop: 0 }}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        )}
        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}