import { API_KEY } from "@env";
import axios from "axios";

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;

//dynamic endpoints
const movieDetailsEndpoint = (movieId: number) =>
  `${apiBaseUrl}/movie/${movieId}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (movieId: number) =>
  `${apiBaseUrl}/movie/${movieId}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = (movieId: number) =>
  `${apiBaseUrl}/movie/${movieId}/similar?api_key=${API_KEY}`;

const personDetailsEndpoint = (personId: number) =>
  `${apiBaseUrl}/person/${personId}?api_key=${API_KEY}`;
const personMovieCreditsEndpoint = (personId: number) =>
  `${apiBaseUrl}/person/${personId}/movie_credits?api_key=${API_KEY}`;

//get poster image
export const image500 = (posterPath: string) =>
  "https://image.tmdb.org/t/p/w500" + posterPath;
export const image342 = (posterPath: string) =>
  "https://image.tmdb.org/t/p/w342" + posterPath;
export const image185 = (posterPath: string) =>
  "https://image.tmdb.org/t/p/w185" + posterPath;

const apiCall = async (endpoint: string, params?: any) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

// home screen apis
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

//movie screen apis
export const fetchMovieDetails = (movieId: number) => {
  return apiCall(movieDetailsEndpoint(movieId));
};
export const fetchMovieCredits = (movieId: number) => {
  return apiCall(movieCreditsEndpoint(movieId));
};
export const fetchSimilarMovies = (movieId: number) => {
  return apiCall(similarMoviesEndpoint(movieId));
};

//person screen api
export const fetchPersonDetails = (personId: number) => {
  return apiCall(personDetailsEndpoint(personId));
};
export const fetchPersonMovieCredits = (personId: number) => {
  return apiCall(personMovieCreditsEndpoint(personId));
};
