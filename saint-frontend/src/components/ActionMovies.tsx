import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { toast } from "sonner";
import { cn } from "../utils/cn";

export default function ActionMovies() {
  const movieData = useContext(Context);
  const loading = movieData?.loading;
  const error = movieData?.error;
  const movies = movieData?.movie;

  if (loading) return toast.loading("Loading...");
  if (error) return toast.error("Error loading comedy movies.");


  const comedyMovies = movies.filter((movie: any) =>
    movie.genre_ids.includes(28)
  );

  return (
    <section className={cn("bg-black py-24")}>
      <div className={cn("cardContainerOne max-w-[1440px] text-white mx-auto")}>
        <h2 className={cn("text-3xl font-bold my-4")}>Action Movies</h2>
        <div className={cn("gridCardOne grid gap-8 grid-cols-5")}>
          {comedyMovies.map((movie: any, index: number) => (
            <div
              className={cn("img relative z-50 cursor-pointer rounded-md")}
              key={index}
            >
              <img
                src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className={cn("h-full w-full")}
                alt={movie.title}
              />
              <div
                className={cn(
                  "info absolute bg-black/90 h-max w-full -bottom-1 p-5 z-10"
                )}
              >
                <strong>{movie.title}</strong>
                <p className={cn("font-bold")}>
                  Ratings:
                  <span className={cn("text-yellow-600 text-lg font-bold")}>
                    &nbsp; {Math.round(movie.vote_average)}
                  </span>
                </p>
                <p className={cn("font-bold")}>
                  Release Date: <span>{movie.release_date}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


