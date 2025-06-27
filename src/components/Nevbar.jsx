import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Link, NavLink } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useApi } from '../ApiContext';
import { debounce } from 'lodash';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react'; // Import icons for hamburger menu

const Nevbar = () => {
    const { data, isLoading, isError, error } = useApi();
    const [title, setTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu

    const debouncedSearch = useCallback(
        debounce((value) => {
            setTitle(value);
        }, 1000),
        []
    );

    const handleTextChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        // Delay hiding suggestions to allow click on suggestion item
        setTimeout(() => setIsFocused(false), 100);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (isError) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;
    if (!data || !data.results) {
        return <div className="text-center py-4">No data available</div>;
    }

    const movies = data.results;
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase())
    );

    return (
        <nav className='flex justify-between items-center p-4 bg-gray-800 text-white shadow-md'>
            <Link to='/' className='text-3xl font-bold'>ChillFlix</Link>

            {/* Hamburger Menu Button */}
            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-x-8'>
                <Link to='/' className='hover:text-gray-400 transition-colors'>Home</Link>
                <Link to='/Movie' className='hover:text-gray-400 transition-colors'>Top Movies</Link>
                <Link to='/watchlist' className='hover:text-gray-400 transition-colors'>My Watchlist</Link> {/* Added Watchlist Link */}
                <div className='relative'>
                    <Input
                        placeholder="Search"
                        className='text-gray-700 px-4 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        onChange={handleTextChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    {isFocused && title && filteredMovies.length > 0 && (
                        <ul className='absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto'>
                            {filteredMovies.map((movie) => (
                                <li key={movie.id} className="py-2 px-4 text-gray-800 hover:bg-gray-100 cursor-pointer">
                                    <NavLink to={`/post/${movie.id}`} onClick={() => setIsFocused(false)}>
                                        {movie.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Link to='/Login'>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                        Sign in
                    </Button>
                </Link>
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className='md:hidden absolute top-16 left-0 right-0 bg-gray-800 p-4 flex flex-col gap-y-4 z-20 shadow-lg'>
                    <Link to='/' className='hover:text-gray-400 transition-colors block py-2' onClick={toggleMenu}>Home</Link>
                    <Link to='/Movie' className='hover:text-gray-400 transition-colors block py-2' onClick={toggleMenu}>Top Movies</Link>
                    <Link to='/watchlist' className='hover:text-gray-400 transition-colors block py-2' onClick={toggleMenu}>My Watchlist</Link> {/* Added Watchlist Link */}
                    <div className='relative'>
                        <Input
                            placeholder="Search"
                            className='text-gray-700 px-4 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full'
                            onChange={handleTextChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        {isFocused && title && filteredMovies.length > 0 && (
                            <ul className='absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto'>
                                {filteredMovies.map((movie) => (
                                    <li key={movie.id} className="py-2 px-4 text-gray-800 hover:bg-gray-100 cursor-pointer">
                                        <NavLink to={`/post/${movie.id}`} onClick={() => { setIsFocused(false); toggleMenu();}}>
                                            {movie.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link to='/Login' onClick={toggleMenu}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors w-full mt-2">
                            Sign in
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Nevbar;
