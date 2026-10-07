import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { login } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const response = await login(form);

      localStorage.setItem("storyVaultToken", response.token);

      navigate("/stories");
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      description="Sign in to continue building your worlds."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold">Email</span>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Password</span>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
          />
        </label>

        {error && (
          <p className="text-sm leading-6 text-burgundy" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-ink transition-colors hover:text-burgundy"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
