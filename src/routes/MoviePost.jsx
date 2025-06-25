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
    <div>
      <Nevbar  />
      <div className=" bg-gray-800 ">
        <h1 className="font-bold text-5xl p-10 text-white ml-15 ">All Movies</h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 p-30 gap-10 -mt-10">
          {movies.map((movie) => {
            return (
               <NavLink key={movie.id} to={`/post/${movie.id}`}>
                <Card className="p-10">
                  <div className="flex justify-between gap-15">
                    {" "} 
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="sdff"
                      className="h-50 w-50 object-cover rounded-xl"
                    />
                    <div className="flex flex-col gap-10 container justify-between">
                      <h2 className="text-2xl ">{movie.title}</h2>
                      <span>Rating: {movie.vote_average}</span>
                      <div>

                        <Button className="coursar-pointer">
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
