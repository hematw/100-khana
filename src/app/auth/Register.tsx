import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import PassInput from "@/components/pass-input";
import { useAuth } from "@/contexts/auth-context";
import { IRegisterForm, ServerError } from "@/types";

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ServerError>({
    message: "",
    duplicateField: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const { isLoggedIn, signUp } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const previousPage = location.state?.from || "/";
      navigate(previousPage, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  if (isLoggedIn) return null;

  const onSubmit: SubmitHandler<IRegisterForm> = async (values) => {
    signUp(values);
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[420px] p-6">
        <CardHeader className="text-center text-2xl font-bold">
          Register to <span className="text-gradient"> 100 Khana</span>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col relative space-y-4 mt-4">
            <Input
              isRequired
              variant="faded"
              label="Username"
              placeholder="@rezwan"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              {...register("username", { required: "Username is required!" })}
            />
            <Input
              isRequired
              variant="faded"
              label="First Name"
              placeholder="eg. Ahmad"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              {...register("firstName", { required: "Username is required!" })}
            />
            <Input
              isRequired
              variant="faded"
              label="Last Name"
              placeholder="eg. Ahmadi"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              {...register("lastName", { required: "Username is required!" })}
            />

            <Input
              isRequired
              variant="faded"
              label="Email"
              placeholder="rezwan@example.com"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
            />
            <PassInput
              isRequired
              variant="faded"
              label="Password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password", { required: "Password is required!" })}
            />
            <PassInput
              isRequired
              variant="faded"
              label="Confirm Password"
              placeholder="Enter your password confirm"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
              })}
            />
          </CardBody>

          <CardFooter className="flex flex-col space-y-4">
            <Button variant="solid" color="primary" type="submit" fullWidth>
              Register
            </Button>
            <Button
              variant="bordered"
              onPress={() => navigate("/login")}
              fullWidth
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Register;
