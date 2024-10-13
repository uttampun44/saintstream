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
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
  
     <Layout >
        
   
       <Carousel responsive={responsive}>
       {
          movies.splice(0, 5).map((movie:any, index) => (
             <section className={cn("absolute -z-10 top-0 w-full")}  style={{
               backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.poster_path})`,
               backgroundRepeat: "no-repeat",
               backgroundSize: "100%",
               backgroundPosition: "center",
               height: "100vh",
              }}>
           <div className={cn("fixed w-full h-full inset-0 bg-black/90 -z-10")}></div>
            <div className={cn("homeContainer max-w-[1440px] mx-auto relative p-5")}>
               <div className="grid h-[700px] items-end justify-start max-w-2xl w-full">
                 <div className="title text-slate-500">
                     {/* <h2 className={cn("text-white text-4xl font-bold my-1")}>{data.original_title}</h2>
                     {data.runtime} minutes
                     <p className={cn("text-gray-400 font-normal text-lg")}>{data.overview}</p> */}
                 </div>
               </div>
            </div>
         </section>
       ))
      }
      </Carousel>
     </Layout>
  
  );
}
