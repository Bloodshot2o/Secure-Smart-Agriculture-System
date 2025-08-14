import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth'; // Change if needed

// Register User
export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/register`, formData);
    return { success: true, message: res.data.message };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Registration failed',
    };
  }
};

// Login User
export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/login`, formData);
    const { token, role } = res.data;

    const user = { email: formData.email, role };
    return {
      success: true,
      data: {
        token,
        user,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Login failed',
    };
  }
};
