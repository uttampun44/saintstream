import { cn } from "@/utils/cn";
import Button from "@/components/Button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post("/api/logout");

      if (response.status === 200) {
        localStorage.removeItem("token");
        toast.success("Successfully Logout");
        navigate("/");
      }
    } catch (error) {
    
       toast.error("Not logout")
    }
  };

  return (
    <header>
      <div className={cn("logoContianer absolute w-full z-50")}>
        <div
          className={cn(
            "header max-w-[1440px] mx-auto  p-5 flex justify-between items-center"
          )}
        >
          <div className={cn("logo gap-x-5 flex items-center ")}>
            <img src="/public/images/Logo.png" />
            <h1 className={cn("text-2xl text-white font-sans font-bold")}>
              SaintStream
            </h1>
          </div>
          <div className="logoutBtn text-white cursor-pointer">
            <form onSubmit={handleSubmit}>
              <Button type="submit" name="Logout" value="logout" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
