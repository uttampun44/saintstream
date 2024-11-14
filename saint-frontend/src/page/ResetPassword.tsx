import BackgroundImage from "../../public/images/Image.webp"
import { cn } from "../utils/cn";
import Button from "@/components/Button";
import InputType from "@/components/Input";
import Logo from "/public/images/Logo.png";
import Overlay from "@/components/Overlay";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

type forgetInputs = {
  password: string
  password_confirmation: string
}

export default function ResetPassword() {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { register, formState: { errors }, handleSubmit } = useForm<forgetInputs>();

  const onSubmit: SubmitHandler<forgetInputs> = async (data, event) => {
    event?.preventDefault()

    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    if (data.password !== data.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {token, password: data.password, password_confirmation: data.password_confirmation}, {
        headers: {
          Accept: "application/json"
        }
      })
      if (response.status === 200){
        toast.success("New Password Created")
      }else{
        toast.error("An error occurred. Please try again.")
      }
   } catch (error:any) {
         throw new error
    }
  }
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
              <img src={Logo} alt={Logo} className={cn("w-12 h-12 object-contain")} />
              <span className={cn("font-bold text-4xl ")}>Saint Stream</span>
              <br></br>
            </div>

          </div>

          <div className={cn("formbox my-3")}>
            <form onSubmit={handleSubmit(onSubmit)}>
            
              <div className={cn("password grid gap-y-2 mt-2")}>

                <InputType
                  type="password"
                  placeholder="Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  {...register("password", { required: true })}

                />

                {
                  errors.password && (
                    <div className={cn("error text-red-700 font-medium text-base mt-1 min-h-6")}>
                      {errors.password && <>This field is required</>}
                    </div>
                  )
                }
              </div>

              <div className={cn("confirm_password grid gap-y-2 mt-2")}>

                <InputType
                  type="password"
                  placeholder="Confirm Password"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  {...register("password_confirmation", { required: true })}

                />

                <div className={cn("error text-red-700 font-medium text-base mt-1 min-h-6")}>
                  {errors.password_confirmation && <>This field is required</>}
                </div>
              </div>

              <div className={cn("submitButton my-4")}>
                <Button
                  type="submit"
                  value="Submit"
                  className={cn("bg-white w-full p-2 rounded-md text-slate-600 text-center  font-medium  text-xl")}
                  name="submit"
                />
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}