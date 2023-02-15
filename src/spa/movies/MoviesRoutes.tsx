import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import PageMovieDetails from '@/spa/movies/PageMovieDetails';
import PageMovies from '@/spa/movies/PageMovies';

const MoviesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMovies />} />
      <Route path=":id" element={<PageMovieDetails />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default MoviesRoutes;
