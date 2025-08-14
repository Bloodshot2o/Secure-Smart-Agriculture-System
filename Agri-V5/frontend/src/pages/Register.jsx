import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const trimmedForm = {
      username: form.username.trim(),  // ✅ correct key
      email: form.email.trim(),
      password: form.password.trim(),
      role: form.role,  // ✅ include role
    };
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', trimmedForm);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };
  

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md p-6 rounded-xl w-96 space-y-4'>
        <h2 className='text-2xl font-bold text-green-700'>Register</h2>

        <input
          type='text'
          name='username'
          placeholder='Full Name'
          value={form.username}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          required
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          className='w-full p-2 border rounded'
          required
        />

        <select
          name='role'
          value={form.role}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        >
          <option value='user'>User</option>
          <option value='technician'>Technician</option>
          <option value='admin'>Admin</option>
        </select>

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-700'
        >
          Register
        </button>

        <p className='text-sm text-center mt-4'>
          Already have an account?{' '}
          <a href='/login' className='text-green-700 font-semibold hover:underline'>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
