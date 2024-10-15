import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { cn } from "../utils/cn";
import Button from "../components/Button";
import Card from "../components/Card";
import Carousel from "react-multi-carousel";

export default function Home() {
  const movieData = useContext(Context);
  const loading = movieData?.loading;
  const error = movieData?.error;
  const movies = movieData?.movie;

  if (loading) return toast.loading("Loading");

  if (error) return toast.error("Error in loading");

  console.log(movies);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Layout>
      {movies.splice(0, 1).map((movie: any, index: any) => (
        <section
          key={index}
          className={cn(" w-full")}
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          {/* <div
            className={cn("absolute w-full h-full inset-0 bg-black/90 z-50")}
          ></div> */}
          <div className={cn("homeContainer max-w-[1440px] mx-auto p-5")}>
            <div className="grid h-[700px] items-end justify-start max-w-2xl w-full">
              <div className="title text-slate-300">
                <h2 className={cn("text-white text-4xl font-bold my-1")}>
                  {movie.original_title}
                </h2>
                <p className={cn("font-bold")}>
                  Ratings :
                  <span className={cn("text-yellow-600 text-lg font-bold")}>
                    {movie.vote_average.toString()}
                  </span>
                </p>
                <p className={cn("font-bold")}>
                  Release Date : <span>{movie.release_date}</span>
                </p>
                <p className={cn("text-gray-300 font-normal text-lg")}>
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className={cn("bg-black/90 py-10")}>
        <div className={cn("cardContainerOne max-w-[1440px] mx-auto")}>
          <div className={cn("gridCardOne cursor-pointer")}>
            <Carousel responsive={responsive} showDots={true} draggable={false}>
              {movies.slice(1, 8).map((movieCard, index) => (
                <div className={cn("img relative z-50")}>
                 
                  <img
                    src={`http://image.tmdb.org/t/p/original/${movieCard.poster_path}`}
                  />
                  <div className={cn("info absolute bg-black/90 h-10 w-full bottom-1 p-5 -z-10")}>
                  </div>
                  <p className={cn("font-bold text-white")}>
                  Ratings :
                  <span className={cn("text-yellow-600 text-lg font-bold")}>
                    {movieCard.vote_average.toString()}
                  </span>
                </p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </Layout>
  );
}
