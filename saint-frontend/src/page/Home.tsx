import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { cn } from "../utils/cn";
import Button from "../components/Button";

export default function Home() {
  const frontData = useContext(Context);
  const loading = frontData?.loading;
  const error = frontData?.error;
  const data = frontData?.front

  console.log(data)

  if (loading) return toast.loading("Loading");

  if (error) return toast.error("Error in loading");

  return (
  
     <Layout >
       <section className={cn("absolute -z-10 w-full")}  style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/w500/${data.poster_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundPosition: "center",
        height: "100vh",
      }}>
          <div className={cn("homeContainer max-w-[1440px] mx-auto")}>
             <div className="grid">
                <Button name="Watch Now" type="submit" value="Watch Now" />
             </div>
          </div>
       </section>
     </Layout>
  
  );
}
