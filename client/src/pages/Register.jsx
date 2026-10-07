import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("storyVaultToken", response.token);

      navigate("/stories");
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Create a private workspace for your stories and worlds."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold">Username</span>

          <input
            type="text"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Email</span>

          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Password</span>

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-sm border border-stone bg-ivory px-3 py-3 text-sm outline-none transition-colors focus:border-burgundy"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Confirm password</span>

          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
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
          className="w-full rounded-md bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
        >
          Create account
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-ink transition-colors hover:text-burgundy"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
