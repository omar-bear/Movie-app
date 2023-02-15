import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { data } from '@/spa/movies/mocks';
import { MovieDetails, Movies } from '@/spa/movies/movies.type';

const axiosMovie = axios.create({
  // Configuration
  baseURL: process.env.NEXT_PUBLIC_API_MOVIES_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const moviesKeys = {
  all: () => ['moviesService'] as const,
  movies: ({ searchTerm }: { searchTerm?: string }) =>
    [...moviesKeys.all(), 'movies', { searchTerm }] as const,
  movie: ({ id }: { id: string }) =>
    [...moviesKeys.all(), 'movie', { id }] as const,
};

export const useMovieList = (
  params = { searchTerm: '' },
  config: UseQueryOptions<
    AxiosResponse<Movies>,
    AxiosError,
    AxiosResponse<Movies>,
    InferQueryKey<typeof moviesKeys.movies>
  > = {}
) => {
  const result = useQuery(
    moviesKeys.movies(params),
    (): Promise<AxiosResponse<Movies>> =>
      axiosMovie.get('/discover/movie', {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_MOVIES_API_KEY,
          sort_by: 'popularity.desc',
          // query: params?.searchTerm ?? '',
        },
      }),
    { keepPreviousData: true, ...config }
  );

  return { ...result, data: result.data?.data };
};

export const useMovie = (
  movieId: string,
  config: UseQueryOptions<
    AxiosResponse<MovieDetails>,
    AxiosError,
    AxiosResponse<MovieDetails>,
    InferQueryKey<typeof moviesKeys.movies>
  > = {}
) => {
  const result = useQuery(
    moviesKeys.movie({ id: movieId }),
    (): Promise<AxiosResponse<MovieDetails>> =>
      axiosMovie.get(`/movie/${movieId}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_MOVIES_API_KEY,
        },
      }),
    {
      enabled: !!movieId,
      ...config,
    }
  );

  return {
    user: result.data,
    ...result,
  };
};
