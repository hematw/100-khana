"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card } from "@/src/components/ui/card";
import PassInput from "@/src/components/pass-input";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { login, isLoggedIn } = {login: async (values: LoginForm) => {}, isLoggedIn: false};

  useEffect(() => {
    if (isLoggedIn) {
      router.back();
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  const onSubmit: SubmitHandler<LoginForm> = async (values) => {
    console.log(values);
    await login(values);
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[420px] p-6">
        <div className="text-center text-2xl font-bold">
          Login to <span className="text-gradient">100 Khana</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <Input
              placeholder="ahmad@example.com"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
            />

            <PassInput
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required!",
              })}
            />
          </div>

          <div className="w-full flex flex-col items-stretch space-y-4">
            <Button type="submit">
              Login
            </Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Login;
