import { logInUser, logOutUser, User, verifyUser } from "@/api/auth/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const form = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (user: User) => {
    // Auth user
    try {
      const userLog = await logInUser(user);
      const isAdmin = await verifyUser(userLog?.user?.id, "admin");
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        logOutUser();
        alert(`Login error: User is not admin`);
      }
    } catch (error) {
      logOutUser();
      alert(`${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              validate: (value) =>
                value.trim() !== "" || "Email cannot be just whitespace",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    {...field}
                    className="border p-2 rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              validate: (value) =>
                value.trim() !== "" || "Email cannot be just whitespace",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <input
                    type="password"
                    {...field}
                    className="border p-2 rounded w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full bg-ftpurple py-2 px-6 rounded-full  hover:bg-ftpurple-dark text-white py-2 transition"
          >
            Login
          </button>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 underline text-center"
          >
            Home
          </a>
        </form>
      </Form>
    </div>
  );
};

export default AdminLogin;
