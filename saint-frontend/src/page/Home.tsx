import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { cn } from "../utils/cn";
import Button from "../components/Button";
import Carousel from "react-multi-carousel";

export default function Home() {
  const movieData = useContext(Context);
  const loading = movieData?.loading;
  const error = movieData?.error;
  const movies = movieData?.movie

  console.log(movies)

  if (loading) return toast.loading("Loading");

  if (error) return toast.error("Error in loading");

  const responsive = {
   superLargeDesktop: {
     
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
  
     <Layout >
        
   
       
       {
         movies.splice(0,1).map((movie:any, index:any) => (
           <section key={index} className={cn("absolute -z-10 top-0 w-full")}  style={{
             backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.poster_path})`,
             backgroundRepeat: "no-repeat",
             backgroundSize: "100%",
             backgroundPosition: "center",
             height: "100vh",
            }}>
                <div className={cn("fixed w-full h-full inset-0 bg-black/90 -z-10")}></div>
            <div className={cn("homeContainer max-w-[1440px] mx-auto p-5")}>
               <div className="grid h-[700px] items-end justify-start max-w-2xl w-full">
                 <div className="title text-slate-500">
                     <h2 className={cn("text-white text-4xl font-bold my-1")}>{movie.original_title}</h2>
                     {movie.runtime} minutes
                     <p className={cn("text-gray-400 font-normal text-lg")}>{movie.overview}</p>
                 </div>
               </div>
            </div>
          </section>
       ))
      }
    
     </Layout>
  
  );
}
