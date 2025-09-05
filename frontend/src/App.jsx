import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailsPage from './pages/NoteDetailsPage';
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme='forest'>
      <button className='btn'>Button</button>
      <button className='btn btn-neutral'>Neutral</button>
      <button className='btn btn-primary'>Primary</button>
      <button className='btn btn-secondary'>Secondary</button>
      <button className='btn btn-accent'>Accent</button>
      <button className='btn btn-ghost'>Ghost</button>
      <button className='btn btn-link'>Link</button>

      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/create'
          element={<CreatePage />}
        />
        <Route
          path='/note/:id'
          element={<NoteDetailsPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
