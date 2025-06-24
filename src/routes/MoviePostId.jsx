import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Nevbar from "../components/Nevbar";

const fetchMovieById = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a3ae153b89393222650e9ca5fbeae782`);
  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return res.json();
};

const MoviePostId = () => {
  const { id } = useParams(); 

  const { data, isLoading, isError, error } = useQuery(
    ['MovieDataId'],
    () => fetchMovieById(id) 
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!data) {
    return <div>No data available</div>;
  }

  const movie = data; // Single movie object returned from the API
  return (
    <>
      <Nevbar />
      <div className="bg-slate-800 h-screen flex justify-center items-center">
        <div className="w-150 p-30">
          <div className="flex justify-between gap-15">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-50 w-50 object-cover rounded-xl"
            />
            <div className="flex flex-col gap-10 container justify-between">
              <h2 className="text-2xl">{movie.title}</h2>
              <span>Rating: {movie.vote_average}</span>
              <div>
                <Button className="cursor-pointer">
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePostId;
