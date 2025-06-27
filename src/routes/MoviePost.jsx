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
const MoviePost = () => {
  const { data, isLoading, isError, error } = useApi();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!data || !data.results) {
    return <div>No data available</div>;
  }

  const movies = data.results;
  return (
    <div className="bg-gray-900 min-h-screen"> {/* Consistent background */}
      <Nevbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-4xl md:text-5xl pt-6 pb-8 text-white text-center md:text-left">All Movies</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-8">
          {movies.map((movie) => {
            return (
              <NavLink key={movie.id} to={`/post/${movie.id}`} className="group">
                <Card className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-105">
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
                        Rating: {movie.vote_average.toFixed(1)}
                      </span>
                      <div className="mt-auto pt-2"> {/* Pushes button to bottom */}
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">
                          Add to Watchlist
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviePost;
