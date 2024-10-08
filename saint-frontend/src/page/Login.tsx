import { cn } from "../utils/cn";
import BackgroundImage from "../../public/images/Image.jpg";
import { useForm } from "react-hook-form";
import Logo from "../../public/images/Logo.png";
import InputType from "../components/Input";

const Login = () => {
  const { handleSubmit, register, setError, clearErrors } = useForm();

  return (
    <section
      className={cn("")}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className=" fixed w-full h-full inset-0 bg-gray-700/60 z-30"></div>
      <div
        className={cn(
          "loginContainer fixed top-1/2 left-1/2 z-50 rounded-lg border-2 -translate-x-1/2 -translate-y-1/2 max-w-lg min-w-md w-full"
        )}
      >
        <div className="loginForm grid p-5">
          <div className="row flex justify-between items-center">
            <div className="logoRow text-white">
              <div className="logo flex ">
                <img src={Logo} alt={Logo} />{" "}
                <span className={cn("font-bold text-4xl ")}>Saint Stream</span>
                <br></br>
              </div>
              <div className="title mt-3">
                <h6>Register to enjoy the feature</h6>
              </div>
            </div>
            <div className="close">
              <span>X</span>
            </div>
          </div>
          <div className="formbox my-3">
            <form>
              <div className="email grid gap-y-2">
                <label>Email</label>
                <InputType
                  type="text"
                  name="email"
                  value=""
                  placeholder="Email"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="password grid gap-y-2 mt-2">
                <label>Password</label>
                <InputType
                  type="password"
                  name="password"
                  value=""
                  placeholder="Password"
                  className="p-2 rounded-md"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
