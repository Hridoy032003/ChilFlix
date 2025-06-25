import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Link, NavLink } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useApi } from '../ApiContext';
import { debounce } from 'lodash';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Nevbar = () => {
    const { data, isLoading, isError, error } = useApi();
    const [title, setTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false); 
 const [menu,setMenu]=useState(false    )
    
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
        setIsFocused(false);
    };

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error: {error.message}</div>;

    if (!data || !data.results) {
        return <div>No data available</div>;
    }

    const movies = data.results;

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase())
    );

    return (
        <div className='flex justify-between px-10 items-center p-4 bg-white'>
            <h1 className='text-3xl font-bold text-black'>ChillFlix</h1>
            <div className='px-20 text-block flex gap-10 text-md ml-40'>
                <Link to='/' className='hover:text-gray-400'>Home</Link>
                <Link to='/Movie' className='hover:text-gray-400'>Top Movies</Link>
              
            </div>
            <div className='relative flex px-10 items-center gap-7  '>
               <div>
                    <Input
                        placeholder="Search"
                        className='text-gray-500 px-5 border-1'
                        onChange={handleTextChange}
                        onFocus={handleFocus} // Show suggestions when input is focused
                        onBlur={handleBlur} // Hide suggestions when input is blurred
                    />
                    {isFocused && title && (
                        <div className='absolute mt-3  bg-white border shadow-md'>
                            <NavLink to='jhkj'>
                                {filteredMovies.map((movie, index) => (
                                    <li key={index} className="py-2 px-5  cursor-pointer list-none">
                                        {movie.title}
                                    </li>
                                ))}
                            </NavLink>
                        </div>
                    )}
               </div>
                {/* <SignedOut>
                    <SignInButton className='bg-black text-white rounded-xl px-6 py-2'/>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn> */}
                <Link to='/Login'>
                <Button>
                    Sing in
                </Button>
                </Link>
            </div>
        </div>
    );
};

export default Nevbar;
