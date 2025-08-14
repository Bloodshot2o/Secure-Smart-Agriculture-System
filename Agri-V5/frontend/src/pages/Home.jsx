import farmBg from '../components/bg-image/image2.jpg';

const Home = () => {
  return (
    <div
      className='bg-cover bg-center min-h-screen text-white'
      style={{ backgroundImage: `url(${farmBg})` }}
    >
      <div className='bg-black bg-opacity-60 min-h-screen flex flex-col justify-center items-center px-6'>
        <h1 className='text-5xl md:text-6xl font-extrabold mb-4 text-center drop-shadow-lg'>
          🌾 Welcome to SmartFarm
        </h1>
        <p className='text-xl md:text-2xl text-center max-w-2xl text-green-100'>
          Monitor temperature, humidity, and soil moisture in real-time — grow smarter with data.
        </p>
        <a href="/dashboard/user" className="mt-8 bg-green-600 px-6 py-3 rounded-full hover:bg-green-700 transition shadow-lg">
          Explore Dashboard
        </a>
      </div>
    </div>
  );
};

export default Home;
