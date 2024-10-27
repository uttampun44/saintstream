import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { cn } from "@/utils/cn";
import InputType from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import BackgroundImage from "../../public/images/Image.webp";
import Logo from "../../public/images/Logo.png";
import axios from "axios";
import { toast } from "sonner";
import Overlay from "@/components/Overlay";

type inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export default function Signup() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<inputs> = async (data, event) => {
    event?.preventDefault()
    try {
      if (data.password !== data.password_confirmation) {
        toast.error("Password and Confirm password not matching")
      }
      const response = await axios.post('/api/register', data,)

      if (response.status === 201) {
        toast.success('Successfully register')
        navigate("/")
      }

    } catch (error: any) {
      toast.error('User not registered')
      throw new error
    }
  };

  return (
    <section
      className={cn("signup")}
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
          "loginContainer fixed bg-black/90 top-1/2 left-1/2 z-50 border-gray-800 rounded-lg border-2 -translate-x-1/2 -translate-y-1/2 max-w-lg min-w-md w-full"
        )}
      >
        <div className={cn("loginForm grid p-5")}>
          <div className={cn("logoRow text-white")}>
            <div className={cn("logo flex")}>
              <img src={Logo} alt={Logo} className={cn("w-12 h-12 object-contain")}/>
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
                <label htmlFor="Username" className={cn("text-white font-medium text-base")}>Username </label>

                <InputType
                  type="text"
                  placeholder="Username"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  {...register("name", { required: true })}
                />

                <div className={cn("error text-red-700 text-base font-medium")}>
                  {errors.name && <>This field is required</>}
                </div>
              </div>
              <div className={cn("email grid gap-y-2")}>
                <label htmlFor="Email" className={cn("text-white font-medium text-base")}>Email </label>

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
                <label htmlFor="password" className={cn("text-white font-medium text-base")}>Password</label>

                <InputType
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                />

                <div className={cn("error text-red-700 text-base font-medium")}>
                  {errors.password && <>This field is required</>}
                </div>
              </div>
              <div className={cn("confirm-password grid gap-y-2 mb-5")}>
                <label htmlFor="confirm_password" className={cn("text-white font-medium text-base")}>Confirm Password</label>

                <InputType
                  type="password"
                  {...register("password_confirmation", { required: true })}
                  placeholder="Confirm Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                />
                <div className={cn("error text-red-700 text-base font-medium")}>
                  {errors.password_confirmation && <>This field is required</>}
                </div>
              </div>

              <div className={cn("agree flex my-3 text-gray-500")}>

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
                    "bg-red-700 text-white w-full p-2 rounded-md text-center  font-medium  text-xl"
                  )}
                  name="submit"
                />
              </div>
            </form>
          </div>
          <div className={cn("signup text-center my-3")}>
            <span className={cn("text-gray-500")}>Already have an account</span>
            <span className={cn("text-white font-bold ml-1")}>
              <Link to="/" aria-label="login" className={cn("cursor-pointer")}>Login</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
