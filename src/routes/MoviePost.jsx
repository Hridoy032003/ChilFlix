import React from "react";
import Nevbar from "../components/Nevbar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApi } from "../ApiContext";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWatchlist } from '../WatchlistContext'; // Import useWatchlist

const MoviePost = () => {
  const { data, isLoading, isError, error } = useApi();
  const { addToWatchlist, removeFromWatchlist, isMovieInWatchlist } = useWatchlist();

  if (isLoading) return <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">Loading...</div>;
  if (isError) return <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">Error: {error.message}</div>;

  if (!data || !data.results) {
    return <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">No movie data available</div>;
  }

  const movies = data.results;

  const handleWatchlistToggle = (e, movie) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event bubbling
    if (isMovieInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen"> {/* Consistent background */}
      <Nevbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-4xl md:text-5xl pt-6 pb-8 text-white text-center md:text-left">All Movies</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-8">
          {movies.map((movie) => (
            <Card key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col transition-all duration-300 ease-in-out group hover:shadow-2xl hover:scale-105">
              <Link to={`/post/${movie.id}`} className="flex-grow block group"> {/* Ensure Link takes full space for hover */}
                <div className="flex gap-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-24 md:w-32 h-auto object-cover rounded-md self-start" // Adjusted image size
                  />
                  <div className="flex flex-col gap-2 flex-grow">
                    <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-red-400 transition-colors">
                      {movie.title}
                    </h2>
                    <span className="text-gray-300 text-sm">
                      Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                    {/* Optional: Add short overview if desired */}
                    {/* <p className="text-xs text-gray-400 line-clamp-2">{movie.overview}</p> */}
                  </div>
                </div>
              </Link>
              <div className="mt-auto pt-3"> {/* Pushes button to bottom */}
                <Button
                  size="sm"
                  className={`w-full text-white transition-colors ${
                    isMovieInWatchlist(movie.id)
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                  onClick={(e) => handleWatchlistToggle(e, movie)}
                >
                  {isMovieInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePost;
