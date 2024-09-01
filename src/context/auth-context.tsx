"use client";

import { registerAccount } from "@/services/registerAccount";
import { useRouter } from "next/navigation";
import React, { createContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<{
  register: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const login = async (username: string, password: string) => {
    console.log('login...')

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await fetch(`${process.env.NEXT_PUBLIC_NODE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          password,
        }),
        credentials: "include",
      });

      console.log("redirecting to dashboard");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login Failed");
      console.error("Login Failed:", error);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      console.log('!!! register !!!')
      await registerAccount(username, password);
      // await register(username, password);
      console.log('after registerAccount...')
      await login(username, password);
    } catch (error) {
      toast.error("Registration Failed");
      console.error("Registration Failed:", error);
    }
  }

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_NODE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      toast.error("Error connecting to server");
    }
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
