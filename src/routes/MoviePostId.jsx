import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Nevbar from '../components/Nevbar'; // Assuming the NavBar component
import { useQuery } from '@tanstack/react-query';
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

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovieById(id)
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    if (!data) {
        return <div>No data available</div>;
    }

    const movie = data;
    return (
        <>
            <Nevbar />
            <div className="bg-slate-800 h-screen flex justify-center items-center">
                <Card className="p-15">
                                  <div className="flex justify-between gap-15 ">
                                    {" "} 
                                    <img
                                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                      alt="sdff"
                                      className="h-90 w-70 object-cover rounded-xl"
                                    />
                                    <div className="flex flex-col  container w-100 gap-4">
                                      <h2 className="text-2xl ">{movie.title}</h2>
                                      <span>Rating: {movie.vote_average}</span>
               
                                <p>Tagline:{movie.tagline}</p>
                                <span className=''>{movie.overview}</span>
                <a href={movie.homepage}>CheckOut Movie</a>
                                        <Button className="coursar-pointer">
                                          Add to Watchlist
                                        </Button>
                                  
                                    </div>
                                  </div>
                                </Card>
            </div>
        </>
    );
};

export default MoviePostId;
