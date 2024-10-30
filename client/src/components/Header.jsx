import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-gradient-to-r from-blue-500 to-blue-600 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        {/* Logo */}
        <Link to='/'>
          <h1 className='text-white text-lg sm:text-2xl font-semibold'>
            <span className='text-yellow-300'>Kinan</span>
            <span className='text-yellow-100'>Estate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-full flex items-center p-2 shadow-sm focus-within:shadow-lg transition-shadow duration-300'
        >
          <input
            type='text'
            placeholder='Search properties...'
            className='bg-transparent placeholder-gray-400 focus:outline-none w-32 sm:w-64 text-sm sm:text-base text-gray-700 p-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className='p-1'>
            <FaSearch className='text-blue-600 hover:text-blue-700 transition duration-200' />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className='flex items-center gap-6 text-white'>
          <li>
            <Link
              to='/'
              className='hover:text-yellow-300 transition duration-200 hidden sm:inline'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='hover:text-yellow-300 transition duration-200 hidden sm:inline'
            >
              About
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-8 w-8 border-2 border-yellow-300'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <span className='hover:text-yellow-300 transition duration-200'>
                  Sign in
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
