import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks/');
      const data = await res.json();
      setTasks(data.filter(task => task.user_id === user?.id));
    };
    if (user) fetchTasks();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/tasks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, user_id: user.id })
    });
    const data = await res.json();
    if(res.ok) {
        setTasks([...tasks, data.task]);
        setTitle('');
        setDescription('');
    }
  };

  const toggleStatus = async (task) => {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: !task.is_completed })
    });
    const data = await res.json();
    if(res.ok) setTasks(tasks.map(t => t.id === task.id ? data.task : t));
  };

  const handleDelete = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Completed') return t.is_completed;
    if (filter === 'Pending') return !t.is_completed;
    return true;
  });

  if (!user) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Welcome, {user.username}</h1>
        <button className="secondary" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Create New Task</h3>
        <form onSubmit={handleCreate}>
          <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Description (Optional)" value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit" style={{ marginTop: '10px' }}>Add Task</button>
        </form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px 0 15px 0' }}>
        <h3 style={{ margin: 0 }}>Your Tasks</h3>
        <select style={{ width: '150px', margin: 0 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? <p style={{ color: 'gray' }}>No tasks found.</p> : null}

      {filteredTasks.map(task => (
        <div key={task.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: task.is_completed ? 0.5 : 1 }}>
          <div>
            <h4 style={{ textDecoration: task.is_completed ? 'line-through' : 'none', margin: '0 0 5px 0' }}>{task.title}</h4>
            <p style={{ margin: 0, fontSize: '14px', color: 'gray' }}>{task.description}</p>
          </div>
          <div>
            <button className="secondary" onClick={() => toggleStatus(task)}>
              {task.is_completed ? 'Undo' : 'Complete'}
            </button>
            <button className="danger" onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}