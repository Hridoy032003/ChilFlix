import React from "react";
import Nevbar from "../components/Nevbar.jsx";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "../components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";
import { useApi } from "../ApiContext.jsx";

const Home = () => {
  const { data, isLoading, isError, error } = useApi();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (!data || !data.results) {
    return <div>No data available</div>;
  }

  const movies = data.results;

  return (
    <div className="bg-slate-800 ">
      <Nevbar />
      <div className="h-screen ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        className="h-full flex justify-center items-center">
          <CarouselContent className="h-full w-full flex justify-center ">
            {movies.map((movie) => {
              return (
                <CarouselItem className="h-auto flex justify-center gap-10 mt-10 " key={movie.id}>
                 
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full md:w-1/3 h-auto object-cover"
                    />
                    <div className="flex text-7xl items-center font-extrabold underline">
                    <h1>{movie.title}</h1>
                    </div>
                    
             
                </CarouselItem>
              );
            })}
           
            
          </CarouselContent>
        </Carousel>
      </div>
     
     <div className="flex flex-col mt-50">
      <h1 className="text-5xl font-bold ml-50 -mb-20 text-white">What's New ?</h1>
        <div className="flex justify-center items-center h-screen">

          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full max-w-5xl gap-10" // Use a more appropriate width class
          >
            <CarouselContent className="p-4 ">
              {movies.map((movie) => {
                return (
                  <CarouselItem className="h-auto" key={movie.id}>
                    <div className="flex flex-col md:flex-row h-full">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full md:w-1/3 h-auto object-cover"
                      />
                      <div className="p-4 flex flex-col justify-start gap-5 md:w-2/3 ml-10">
                        <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                        <p className="text-sm text-white">{movie.release_date}</p>
                        <p className="text-md text-white mb-2">{movie.overview}</p>
                        <div className="text-white text-sm flex justify-between">
                          <span>Rating: {movie.vote_average}</span>
                          <span>Votes: {movie.vote_count}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
     </div>
     <div></div>
    </div>
  );
};

export default Home;
