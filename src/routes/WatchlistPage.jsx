import React from 'react';
import Nevbar from '../components/Nevbar';
import { useWatchlist } from '../WatchlistContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Assuming Card can be used directly

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist, isMovieInWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Nevbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">My Watchlist</h1>
          <p className="text-xl text-gray-400">Your watchlist is currently empty.</p>
          <Link to="/Movie"> {/* Link to page with all movies */}
            <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white">
              Find Movies to Add
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Nevbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-4xl md:text-5xl pt-6 pb-8 text-white text-center md:text-left">My Watchlist</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-8">
          {watchlist.map((movie) => (
            <Card key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
              <Link to={`/post/${movie.id}`} className="group flex-grow">
                <div className="flex gap-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-24 md:w-32 h-auto object-cover rounded-md self-start"
                  />
                  <div className="flex flex-col gap-2 flex-grow">
                    <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-red-400 transition-colors">
                      {movie.title}
                    </h2>
                    <span className="text-gray-300 text-sm">
                      Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                    <p className="text-xs text-gray-400 line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="mt-auto pt-3">
                {isMovieInWatchlist(movie.id) && (
                  <Button
                    size="sm"
                    variant="destructive" // Or a suitable style for removal
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove from Watchlist
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
