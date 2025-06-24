import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

const fetchData = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2FlMTUzYjg5MzkzMjIyNjUwZTljYTVmYmVhZTc4MiIsIm5iZiI6MTc1MDQxMTE3MS4yMzEsInN1YiI6IjY4NTUyN2EzYmIzMTEwYWYxZTg0ZTRhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._OHBJAnJFD8cKqjzKRDrafIuFyxRP8gcb8t9qP0dK_8'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a3ae153b89393222650e9ca5fbeae782', options);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();  
};



export const ApiProvider = ({ children }) => {
    const { data, isLoading, isError, error } = useQuery(
        {
            queryKey: ['MovieData'], 
            queryFn: fetchData
        }
    );

    return (
        <ApiContext.Provider value={{ data, isLoading, isError, error }}>
            {children}
        </ApiContext.Provider>
    );
};


export const useApi = () => {
    return useContext(ApiContext);
};
