import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
      <p className="text-red-700 max-w-md mb-6">
        Oops! You do not have permission to access this page. Please log in with the appropriate role.
      </p>
      <Link to="/" className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
        Return Home
      </Link>
    </div>
  );
};

export default Unauthorized;
