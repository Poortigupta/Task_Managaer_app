import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>TaskFlow</h1>
      <p style={{ fontSize: '1.2rem', color: 'gray', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        A professional task management system. Organize your work, track your progress, and stay productive.
      </p>
      <Link to="/auth"><button style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Get Started</button></Link>
    </div>
  );
}