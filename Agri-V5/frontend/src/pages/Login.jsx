import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    login(data); // Save token + role in context

    const routeMap = {
      admin: '/dashboard/admin',
      technician: '/dashboard/technician',
      user: '/dashboard/user',
    };

    navigate(routeMap[data.role] || '/unauthorized');
  } catch (err) {
    console.error('Login error:', err);
    alert('Something went wrong');
  }
};

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-50'>
      <form
        className='bg-white p-6 rounded shadow-md space-y-4'
        onSubmit={handleLogin}
      >
        <h2 className='text-xl font-bold text-center'>Login</h2>

        <input
          className='border p-2 w-full'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='border p-2 w-full'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full'>
          Login
        </button>

        <p className='text-sm text-center mt-4'>
          Don’t have an account?{' '}
          <a href='/register' className='text-green-700 font-semibold hover:underline'>
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
