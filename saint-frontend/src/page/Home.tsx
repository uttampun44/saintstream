import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/ContextProvider";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { cn } from "@/utils/cn";
import Card from "@/components/Card";
import Comedy from "@/components/Comedy";
import ActionMovies from "@/components/ActionMovies";
import ScienceFiction from "@/components/ScienceFiction";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate()

  const movieData = useContext(Context);
  const loading = movieData?.loading;
  const error = movieData?.error;
  const movies = movieData?.movie;
  const genres = movieData?.genre;

  if (loading) return toast.loading("Loading");
  if (error) return toast.error("Error in loading");

  const getGenreNames = (genreIds: number[]) =>
    genreIds
      .map((id) => genres?.find((genre: any) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");

  const handleClickMovie = (id: number) => {
    console.log(id);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
      navigate("/")
    }

  }, [navigate])

  return (
    <React.Fragment>
     {
       isAuthenticated && (
        <Layout>
        {movies.splice(0, 1).map((movie: any, index: number) => (
          <section
            key={index}
            style={{
              backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.poster_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              backgroundPosition: "center",
              height: "100vh",
            }}
          >
            <div
              className={cn("absolute w-full h-full inset-0 bg-black/90 z-30")}
            ></div>
            <div
              className={cn(
                "homeContainer relative z-30 max-w-[1440px] mx-auto p-5"
              )}
            >
              <div className="grid h-[700px] items-end justify-start max-w-2xl w-full">
                <div className="title text-slate-300">
                  <h2 className={cn("text-white text-4xl font-bold my-1")}>
                    {movie.original_title}
                  </h2>
                  <p className={cn("font-bold")}>
                    Ratings:
                    <span className={cn("text-yellow-600 text-lg font-bold")}>
                      &nbsp; {movie.vote_average}
                    </span>
                  </p>
                  <p className={cn("font-bold")}>
                    Release Date: <span>{movie.release_date}</span>
                  </p>

                  <p className={cn("font-bold")}>
                    Genres: <span>{getGenreNames(movie.genre_ids)}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className={cn("bg-black py-24 max-md:px-4")}>
          <div
            className={cn("cardContainerOne max-w-[1440px] text-white mx-auto")}
          >
            <h2 className={cn("text-3xl font-bold  my-4")}>Movie List</h2>
            <Card className={cn("gridCardOne grid gap-8 grid-cols-5 max-sm:grid-cols-2")}>
              {movies.slice(0, 15).map((movieCard: any, index: number) => (
                <div
                  className={cn("img relative z-50 cursor-pointer rounded-md")}
                  key={index}
                  onClick={() => handleClickMovie(movieCard.id)}
                >
                  <img
                    src={`http://image.tmdb.org/t/p/original/${movieCard.poster_path}`}
                    className={cn("h-full w-full")}
                  />
                  <div
                    className={cn(
                      "info absolute bg-black/90 h-max w-full -bottom-1 p-5 z-10"
                    )}
                  >
                    <strong>{movieCard.title}</strong>
                    <p className={cn("font-bold")}>
                      Ratings:
                      <span className={cn("text-yellow-600 text-lg font-bold")}>
                        &nbsp; {Math.round(movieCard.vote_average)}
                      </span>
                    </p>
                    <p className={cn("font-bold")}>
                      Genres: <span>{getGenreNames(movieCard.genre_ids)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </section>
        <Comedy />
        <ActionMovies />
        <ScienceFiction />
      </Layout>
       )
     }
    </React.Fragment>
  );
}
