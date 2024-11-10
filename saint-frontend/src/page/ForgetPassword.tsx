import BackgroundImage from "../../public/images/Image.webp"
import { cn } from "../utils/cn";
import Button from "@/components/Button";
import InputType from "@/components/Input";
import Logo from "/public/images/Logo.png";
import Overlay from "@/components/Overlay";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

type forgetInputs = {
  email: string
}

export default function ForgetPassword() {

  const { register, formState: { errors }, handleSubmit } = useForm<forgetInputs>();

  const onSubmit: SubmitHandler<forgetInputs> = async (data, event) => {

    console.log(data)
    event?.preventDefault()

    try {
      const response = await axios.post("/api/forget-password", data);

      console.log(response)
    } catch (error: any) {
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
              <div className={cn("email grid gap-y-2")}>
                <label htmlFor="Email">Email</label>

                <InputType
                  type="text"
                  placeholder="Email"
                  className={cn("p-2 rounded-md bg-gray-800 text-white")}
                  {...register("email", { required: true })}

                />

                <div className={cn("error text-red-700 font-medium text-base mt-1 min-h-6")}>
                  {errors.email && <>This field is required</>}
                </div>
              </div>

              <div className={cn("submitButton my-4")}>
                <Button
                  type="submit"
                  value="Send"
                  className={cn("bg-white w-full p-2 rounded-md text-slate-600 text-center  font-medium  text-xl")}
                  name="Send"
                />
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}