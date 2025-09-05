import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false); // Successfully fetched notes, not rate limited
      } catch (error) {
        console.log('Error fetching notes. ', error);
        // Check if the error is due to rate limiting (HTTP status code 429)
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to fetch notes');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {isLoading && (
          <div className='flex justify-center py-10'>
            <span className='loading loading-dots loading-lg text-primary'></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
