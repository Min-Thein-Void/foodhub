"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayname,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful! Check your email to confirm your account.");
      setEmail("");
      setPassword("");
      setDisplayname("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-100">
    
    {/* Title */}
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
      Create Account 🚀
    </h2>

    <form onSubmit={handleRegister} className="space-y-5">

      {/* Display Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Display Name
        </label>
        <input
          type="text"
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value)}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Register"}
      </button>

    </form>

    {/* Footer */}
    <p className="text-sm text-center text-gray-500 mt-6">
      Already have an account?{" "}
      <Link href="/login" className="text-orange-500 hover:underline cursor-pointer">
        Sign In
      </Link>
    </p>

  </div>
</div>
  );
}
