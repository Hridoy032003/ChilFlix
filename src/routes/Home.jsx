import React from "react";
import Nevbar from "../components/Nevbar.jsx";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";
import { useApi } from "../ApiContext.jsx";
import { Link } from "react-router-dom"; // Import Link for navigation

const Home = () => {
  const { data, isLoading, isError, error } = useApi();

  if (isLoading) return <div className="text-center py-10 text-white">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-400">Error: {error.message}</div>;
  if (!data || !data.results || data.results.length === 0) {
    return <div className="text-center py-10 text-white">No movie data available.</div>;
  }

  const movies = data.results;
  const heroMovies = movies.slice(0, 5); // Take first 5 for hero carousel
  const newMovies = movies.slice(5, 15); // Take next 10 for "What's New"

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Nevbar />

      {/* Hero Carousel Section */}
      <section className="relative h-[calc(100vh-4rem)]  overflow-hidden"> {/* Adjusted height */}
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          opts={{ loop: true }}
          className="h-full"
        >
          <CarouselContent className="h-full">
            {heroMovies.map((movie) => {
              const imagePath = movie.backdrop_path || movie.poster_path;
              return (
                <CarouselItem key={movie.id} className="h-full relative">
                  {imagePath ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${imagePath}`}
                      alt={movie.title}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">Image not available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 shadow-lg">
                      {movie.title}
                  </h1>
                  <p className="text-sm sm:text-md md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6 max-w-2xl line-clamp-3 shadow-sm">
                    {movie.overview}
                  </p>
                  <Link to={`/post/${movie.id}`}>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition-colors text-sm sm:text-base">
                      View Details
                    </button>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full hidden md:flex" />
        </Carousel>
      </section>

      {/* What's New Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 md:mb-12 text-center">
          What's New?
        </h2>
        {newMovies.length > 0 ? (
          <Carousel
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
            opts={{ loop: newMovies.length > 3, align: "start" }} // Loop if enough items
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {newMovies.map((movie) => (
                <CarouselItem key={movie.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 group">
                  <Link to={`/post/${movie.id}`} className="block h-full"> {/* Ensure link takes full card height */}
                    <div className="overflow-hidden rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300 bg-gray-800 h-full flex flex-col">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-auto object-cover aspect-[2/3]" // Maintain aspect ratio
                        />
                      ) : (
                        <div className="w-full bg-gray-700 flex items-center justify-center aspect-[2/3]">
                          <span className="text-gray-400 text-sm p-2 text-center">Image not available</span>
                        </div>
                      )}
                      <div className="p-3 md:p-4 flex flex-col flex-grow"> {/* Allow content to grow */}
                        <h3 className="text-lg font-semibold mb-1 truncate group-hover:whitespace-normal group-hover:text-red-400 transition-colors">
                          {movie.title}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">
                          {movie.release_date || 'N/A'}
                        </p>
                        <div className="text-xs text-gray-300 flex justify-between items-center mt-auto"> {/* mt-auto to push to bottom */}
                          <span>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                          <span className="hidden sm:inline">Votes: {movie.vote_count || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full hidden lg:flex" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-gray-700 hover:bg-gray-600 p-2 rounded-full hidden lg:flex" />
          </Carousel>
        ) : (
          <p className="text-center text-gray-400">No new movies to display at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
