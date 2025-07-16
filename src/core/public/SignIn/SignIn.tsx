import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "../../../components/functional/ApiCall/ApiMutation";
import { API_ENDPOINTS } from "../../../constants/ApiEndpoints/apiEndpoints";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof schema>;

export default function SignIn() {
  const { mutate: postSignInData } = useApiMutation(
    "post",
    API_ENDPOINTS.AUTH.SIGNIN
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },  
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const requestBody = {
      username: data.username,
      password: data.password,
    };
    console.log(requestBody);
    postSignInData(requestBody, {
      onSuccess: (response) => {
        const token = response.data.token;
        localStorage.setItem("token",token)
        console.log("token",token);
        reset();
      },
    });
    // try {
    //   const res = await axios.post(
    //     "http://localhost:8080/api/auth/signin",
    //     requestBody
    //   );
    //   console.log("Success:", res.data);
    //   localStorage.setItem("token", res.data.token);
    // } catch (err) {
    //   console.error("Error:", err);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 space-y-4 border rounded-md shadow"
    >
      <h2 className="text-2xl font-semibold text-center">Sign In</h2>

      <div className="flex flex-col">
        <label>Username</label>
        <input
          {...register("username")}
          type="text"
          className="border p-2 rounded"
        />
        {errors.username && (
          <span className="text-sm text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          className="border p-2 rounded"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
