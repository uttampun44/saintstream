import { Link } from "react-router-dom";
import Button from "../components/Button";
import { cn } from "../utils/cn";
import InputType from "../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import BackgroundImage from "../../public/images/Image.jpg";
import Logo from "../../public/images/Logo.png";
import axios from "axios";

type inputs = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};
export default function Signup() {
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    register,
  } = useForm<inputs>();

  const onSubmit: SubmitHandler<inputs> = (data) => {
   try {
    if(data.password !== data.confirm_password){
      alert("Password not matching")
    }
    const response = axios.post('http://127.0.0.1:8000/api/register', data,)

    console.log(response)
   } catch (error:any) {
     throw new error
   }
  };

  return (
    <section
      className={cn("")}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className={cn("fixed w-full h-full inset-0 bg-black/90 z-30")}></div>
      <div
        className={cn(
          "loginContainer fixed bg-black/90 top-1/2 left-1/2 z-50 border-gray-800 rounded-lg border-2 -translate-x-1/2 -translate-y-1/2 max-w-lg min-w-md w-full"
        )}
      >
        <div className={cn("loginForm grid p-5")}>
          <div className={cn("logoRow text-white")}>
            <div className={cn("logo flex")}>
              <img src={Logo} alt={Logo} />
              <span className={cn("font-bold text-4xl ")}>Saint Stream</span>
              <br></br>
            </div>
            <div className={cn("title mt-3")}>
              <h6>Register to enjoy the feature</h6>
            </div>
          </div>

          <div className={cn("formbox my-3")}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={cn("username grid gap-y-2")}>
                <label htmlFor="Username">Username :</label>

                <InputType
                  type="text"
                  placeholder="Username"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  {...register("username", {required: true})}
                />

                <div className={cn("error text-red-700 text-base font-medium")}>
                  {errors.username && <>This field is required</>}
                </div>
              </div>
              <div className={cn("email grid gap-y-2")}>
                <label htmlFor="Email">Email :</label>

                <InputType
                  type="text"
                  placeholder="Email"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  {...register("email", { required: true })}
                />
                <div className="error text-red-700 text-base font-medium">
                  {errors.email && <>This field is required</>}
                </div>
              </div>

              <div className={cn("password grid gap-y-2 ")}>
                <label htmlFor="password">Password</label>

                <InputType
                  type="password"
                  {...register("password", {required: true})}
                  placeholder="Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                />

                <div className={cn("error text-red-700 text-base font-medium")}>
                  {errors.password && <>This field is required</>}
                </div>
              </div>
              <div className={cn("confirm-password grid gap-y-2 mb-5")}>
                <label htmlFor="password">Confirm Password</label>

                <InputType
                  type="password"
                  {...register("confirm_password", {required: true})}
                  placeholder="Confirm Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                />
                <div className={cn("error text-red-700 text-base font-medium")}>
                  {errors.confirm_password && <>This field is required</>}
                </div>
              </div>

              <div className={cn("agree flex my-3 text-gray-500")}>
                <InputType
                  type="checkbox"
                  className={cn("rounded-full mr-1")}
                />
                <label htmlFor="agree">
                  I agree to your &nbsp;
                  <span className={cn("text-lg font-bold text-white")}>
                    Privacy Policy &nbsp;
                  </span>
                  and &nbsp;
                  <span className={cn("text-lg font-bold text-white")}>
                    term and condition
                  </span>
                </label>
              </div>

              <div className={cn("submitButton")}>
                <Button
                  type="submit"
                  value="Submit"
                  className={cn(
                    "bg-white w-full p-2 rounded-md text-slate-600 text-center  font-medium  text-xl"
                  )}
                  name="submit"
                />
              </div>
            </form>
          </div>
          <div className={cn("signup text-center my-3")}>
            <span className={cn("text-gray-500")}>Already have an account</span>
            <span className={cn("text-white font-bold ml-1")}>
              <Link to="/">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
