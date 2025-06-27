import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Nevbar from '../components/Nevbar'; // Assuming the NavBar component
import { useQuery } from '@tanstack/react-query';
import { useWatchlist } from '../WatchlistContext'; // Import useWatchlist
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
const fetchMovieById = async (id) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=a3ae153b89393222650e9ca5fbeae782`
    );
    if (!res.ok) throw new Error('Failed to fetch movie');
    return res.json();
};

const MoviePostId = () => {
    const { id } = useParams();
    const { addToWatchlist, removeFromWatchlist, isMovieInWatchlist } = useWatchlist();

    const { data: movie, isLoading, isError, error } = useQuery({ // Renamed data to movie for clarity
        queryKey: ['movie', id],
        queryFn: () => fetchMovieById(id)
    });

    if (isLoading) return <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">Loading...</div>;
    if (isError) return <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">Error: {error.message}</div>;

    if (!movie) { // Check movie directly
        return <div className="bg-gray-900 min-h-screen text-white flex justify-center items-center">No movie data available</div>;
    }

    const handleWatchlistToggle = () => {
        if (isMovieInWatchlist(movie.id)) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie); // Add the whole movie object
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Nevbar />
            <div className="container mx-auto px-4 py-8 md:py-12">
                <Card className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl flex flex-col md:flex-row gap-6 md:gap-8">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full md:w-1/3 max-w-xs md:max-w-sm mx-auto md:mx-0 h-auto object-cover rounded-lg shadow-md"
                    />
                    <div className="flex flex-col gap-3 md:gap-4 flex-grow">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                            {movie.title}
                        </h1>
                        {movie.tagline && (
                            <p className="text-lg sm:text-xl text-gray-400 italic">
                                {movie.tagline}
                            </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                            <span>Release Date: {movie.release_date || 'N/A'}</span>
                        </div>
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed my-2 md:my-4">
                            {movie.overview}
                        </p>

                        <div className="flex flex-wrap gap-2 my-2">
                            {movie.genres && movie.genres.map(genre => (
                                <span key={genre.id} className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {movie.homepage && (
                            <a
                                href={movie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-500 underline transition-colors text-sm inline-block"
                            >
                                Visit Movie Homepage
                            </a>
                        )}
                        <div className="mt-auto pt-4"> {/* Pushes button to bottom */}
                            <Button
                                size="lg"
                                className={`w-full sm:w-auto text-white transition-colors ${
                                    isMovieInWatchlist(movie.id)
                                        ? 'bg-gray-600 hover:bg-gray-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                }`}
                                onClick={handleWatchlistToggle}
                            >
                                {isMovieInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MoviePostId;
