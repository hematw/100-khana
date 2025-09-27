"use client"

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card } from "@/src/components/ui/card";
import PassInput from "@/src/components/pass-input";
import { RegisterForm, ServerError } from "@/src/types";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<ServerError>({
    message: "",
    duplicateField: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const { isLoggedIn, signUp } = {isLoggedIn: false, signUp: async (values: RegisterForm) => {}};

  useEffect(() => {
    if (isLoggedIn) {
      router.back();
    }
  }, [isLoggedIn]);

  if (isLoggedIn) return null;

  const onSubmit: SubmitHandler<RegisterForm> = async (values) => {
    signUp(values);
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[420px] p-6">
        <div className="text-center text-2xl font-bold">
          Register to <span className="text-gradient"> 100 Khana</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col relative space-y-4 mt-4">
            <Input
              placeholder="@rezwan"
              {...register("username", { required: "Username is required!" })}
            />
            <Input
              placeholder="eg. Ahmad"
              {...register("firstName", { required: "Username is required!" })}
            />
            <Input
              placeholder="eg. Ahmadi"
              {...register("lastName", { required: "Username is required!" })}
            />

            <Input
              placeholder="rezwan@example.com"
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
              {...register("password", { required: "Password is required!" })}
            />
            <PassInput
              placeholder="Enter your password confirm"
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
              })}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <Button type="submit">
              Register
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Register;
