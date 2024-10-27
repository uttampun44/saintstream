import { cn } from "@/utils/cn";
import BackgroundImage from "../../public/images/Image.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "/public/images/Logo.png";
import InputType from "@/components/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import { Context } from "@/context/ContextProvider";
import Overlay from "@/components/Overlay";


type inputs = {
  email: string;
  password: string;
};
export default function Login() {

  const context = useContext(Context);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<inputs>({});

  const onSubmit: SubmitHandler<inputs> = async (data, event) => {
    event?.preventDefault()
    try {
      const response = await axios.post("/api/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })

      if (response.status === 200) {

        localStorage.setItem("token", response.data.token);
        context?.setToken(response.data.token)
        toast.success("Successfully login")

        navigate("/home")
      }

    } catch (error: any) {
      toast.error("Not login")
      throw new error
    }
  };

  return (
    <section
      className={cn("login_section")}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Overlay />
      <div
        className={cn(
          "loginContainer fixed bg-black/90 top-1/2 left-1/2 z-50 border-gray-800 rounded-lg border-2 -translate-x-1/2 -translate-y-1/2 max-w-lg min-w-md max-h-[519px] min-h-max w-full"
        )}
      >
        <div className={cn("loginForm grid p-5")}>
          <div className={cn("logoRow text-white")}>
            <div className={cn("logo flex ")}>
              <img src={Logo} alt={Logo} />
              <span className={cn("font-bold text-4xl ")}>Saint Stream</span>
              <br></br>
            </div>

          </div>

          <div className={cn("formbox my-3")}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={cn("email grid gap-y-2")}>
                <label htmlFor="Email">Email</label>

                <InputType
                  type="text"
                  placeholder="Email"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  autocomplete="current-email"
                  {...register("email", { required: true })}

                />

                <div className={cn("error text-red-700 font-medium text-base mt-1")}>
                  {errors.email && <>This field is required</>}
                </div>
              </div>
              <div className={cn("password grid gap-y-2 mt-2")}>
                <label htmlFor="Password">Password</label>
                <InputType
                  type="password"
                  placeholder="Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  autocomplete="current-password"
                  {...register("password", { required: true })}

                />

                <div className={cn("error text-red-700 font-medium text-base mt-1")}>
                  {errors.password && <>This field is required</>}
                </div>
              </div>
              <div className={cn("forgotPassword text-center text-white font-bold text-lg my-4")}>
                <Link to="reset-password">Forgot Password</Link>
              </div>

              <div className={cn("submitButton")}>
                <Button
                  type="submit"
                  value="Submit"
                  className={cn("bg-white w-full p-2 rounded-md text-slate-600 text-center  font-medium  text-xl")}
                  name="submit"
                />
              </div>
            </form>
          </div>
          <div className={cn("signup text-center my-3")}>
            <span className={cn("text-gray-500")}>Don't have an account</span>
            <span className={cn("text-white font-bold ml-1")}>
              <Link to="sign-up">Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
