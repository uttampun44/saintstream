import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type ContextProviderProps = {
  children: ReactNode;
};
type frontHmePage = {
  id: number;
  backdrop_path: string;
  original_title: string;
  runtime: number;
  genres: {
    id: number;
    name: string;
  };
  popularity: number;
  vote_average: number;
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
  user: null;
  token: string | null;
  movie: any;
  genre: movieGenre[];
  front: frontHmePage[];
  setToken: (token: string) => void;
  setUser: (user: null) => void;
  setMovie: (movie: movie[]) => void;
  setGenre: (genre: movieGenre[]) => void;
  setFront: (front: frontHmePage[]) => void;
}

export const Context = createContext<saintStreamValue | null>(null);

export default function ContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [movie, setMovie] = useState<movie[]>([]);
  const [genre, setGenre] = useState<movieGenre[]>([]);
  const [front, setFront] = useState<frontHmePage[]>([]);

  console.log(front);
  const fetchFrontPage = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/550?api_key=687a565932b25d0009786fa2a61e82f8",
        {
          params: {
            api_key: "687a565932b25d0009786fa2a61e82f8",
            language: "en-US",
          },
        }
      );

      if (response.status === 200) {
        setFront(response.data);
      }
    } catch (error) {
      throw new Error();
    }
  };

  const fetchCategories = async () => {
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
      if (response.status === 200) setGenre(response.data);
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

      if (response.status === 200) setMovie(response.data.results);
       
    } catch (error: any) {
      
      throw new error();
    }
  };

  useEffect(() => {
    fetchFrontPage();
    fecthMovie();
    fetchCategories();
  }, []);
  return (
    <Context.Provider
      value={{
        user,
        token,
        movie,
        genre,
        front,
        setToken,
        setUser,
        setMovie,
        setGenre,
        setFront,
      }}
    >
      {children}
    </Context.Provider>
  );
}
