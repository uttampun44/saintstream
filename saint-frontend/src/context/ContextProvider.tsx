import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import {useQuery } from "react-query";


type ContextProviderProps = {
  children: ReactNode;
};

type movieGenre = {
  id: number;
  name: string;
};

type movie = {
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

interface saintStreamValue {
  loading:boolean,
  error: unknown | null
  user: null;
  token: string | null;
  movie: any;
  genre: movieGenre[];
  setToken: (token: string) => void;
  setUser: (user: null) => void;
  setMovie: (movie: movie[]) => void;
  setGenre: (genre: movieGenre[]) => void;
}

export const Context = createContext<saintStreamValue | null>(null);

export default function ContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [movie, setMovie] = useState<movie[]>([]);
  const [genre, setGenre] = useState<movieGenre[]>([]);
 
  
  const fetchGenre = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: "687a565932b25d0009786fa2a61e82f8",
            language: "en-US",
          },
        }
      );

      if (response.status === 200) return response.data;
    } catch (error) {
      throw new Error();
    }
  };
  
  const fecthMovie = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "687a565932b25d0009786fa2a61e82f8",
            language: "en-US",
          },
        }
      );
      
      if (response.status === 200) return response.data.results;
      
    } catch (error: any) {
      
      throw new error();
    }
  };
  

  const {isLoading: genreLoading, error: genreError, data: genreData} = useQuery('genreData',fetchGenre)
  const {isLoading: movieLoading, error: movieError, data: movieData} = useQuery('movieData',fecthMovie)


  useEffect(() => {
  
    if(genreData) setGenre(genreData);
    if(movieData) setMovie(movieData)

  }, [genreData, movieData]);

  useEffect(() => {
    const userToken =  localStorage.getItem("token")


    if(userToken){
       setToken(userToken)
    }

  }, [])
  const loading =  genreLoading || movieLoading
   const error =  genreError || movieError
  return (
    <Context.Provider
      value={{
        user,
        token,
        movie,
        genre,
      
        loading,
        error,
        setToken,
        setUser,
        setMovie,
        setGenre,
       
      }}
    >
      {children}
    </Context.Provider>
  );
}
