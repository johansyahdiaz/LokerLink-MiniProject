import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userLogin, loginSchema } from "../../utils/apis/auth/index";
import { Toast } from "../../utils/swalToast";
import { useToken } from "../../utils/context/token";

function LoginPage() {
  const { changeToken } = useToken();
  const navigate = useNavigate();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = handleSubmit(async (data) => {
    console.log("Form submitted");
    console.log("Data yang dikirim ke server:", data);

    try {
      const result = await userLogin(data);
      console.log("Respons dari userLogin:", result);

      Toast.fire({ icon: "success", title: result.message });

      changeToken(JSON.stringify(result.payload));

      navigate("/profile-dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      Toast.fire({ icon: "error", title: error.message });
    }
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-4 space-y-4">
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span>Email</span>
              </label>
              <input type="email" className="input input-bordered" placeholder="Email" {...register("email")} />
            </div>
            <div className="form-control">
              <label className="label">
                <span>Password</span>
              </label>
              <input type="password" className="input input-bordered" placeholder="Password" {...register("password")} />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-10" disabled={isSubmitting} aria-disabled={isSubmitting}>
              Login
            </button>
          </form>
          <div className="text-center">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
