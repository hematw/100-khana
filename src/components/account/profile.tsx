import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Skeleton } from "@heroui/skeleton";
import { AtSign, Camera, CircleUser, Lock, Phone, User } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosIns from "@/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { IProfile } from "@/types";



async function getProfile(id: string) {
  const res = await axiosIns.get(`/users/${id}`, { withCredentials: true });
  console.log("Response", res);
  return res.data;
}

function Profile() {
  const { user } = useAuth();

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user._id),
    staleTime: 1000 * 60 * 3,
  });

  const profileMutation = useMutation({
    mutationFn: (data: FormData) =>
      axiosIns.patch(`/users/${user._id}`, data, { withCredentials: true }),
    onSuccess: ({ data }) => {
      reset(data);
      addToast({ title: "Profile Updated", color: "success" });
    },
    onError: (err) => {
      addToast({
        title: "Something went wrong",
        color: "primary",
        description: err.message,
      });
    },
  });

  const [selectedFile, setSelectedFile] = useState<File>();
  const fileInputRef = useRef<Ref<HTMLInputElement>>();
  const profileUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : profileData?.profile;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IProfile>({
    defaultValues: profileData,
  });

  useEffect(() => {
    reset(profileData);
  }, [profileData, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<IProfile> = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName || "");
    formData.append("lastName", values.lastName || "");
    formData.append("email", values.email || "");
    formData.append("phone", values.phone || "");
    formData.append("govId", values.govId?.toString() || "");
    formData.append("bio", values.bio || "");

    if (selectedFile) {
      formData.append("profile", selectedFile);
    }

    profileMutation.mutate(formData);
  };

  console.log(watch());
  console.log(errors);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return isLoading ? (
    <EditInfoSkeleton />
  ) : (
    <Card className="p-6 w-full max-w-3xl border border-default-300 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-bold ">Edit Info</h2>
      <div className="relative w-24 h-24 mx-auto">
        <Avatar
          className="w-24 h-24"
          src={profileUrl || profileData?.profile || "/profile-picture.png"}
        />
        <Input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef as Ref<HTMLInputElement>}
        />
        <Button
          isIconOnly
          size="sm"
          className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full border"
          onPress={() => fileInputRef.current?.click()}
        >
          <Camera className="w-4 h-4 text-gray-600" />
        </Button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Input
            variant="faded"
            label="Username"
            placeholder="@rezwan"
            startContent={<User size={18} />}
            isInvalid={!!errors.username}
            errorMessage={errors.username?.message}
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[A-Z]+$/i,
                message: "Username cannot contain symbols or numbers",
              },
            })}
          />
          <Input
            variant="faded"
            label="Email"
            placeholder="rezwan@example.com"
            startContent={<AtSign size={18} />}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            variant="faded"
            placeholder="1234567890"
            label="Phone Number"
            startContent={<Phone size={18} />}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
            {...register("phone", {
              pattern: {
                value: /^\+93(78|73|79|77|72|74|70)\d{7}$/,
                message: "Invalid phone number",
              },
            })}
          />
          <Input
            variant="faded"
            label="First Name"
            placeholder="Ahmad"
            startContent={<CircleUser size={18} />}
            errorMessage={errors.firstName?.message}
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[A-Z]+$/i,
                message: "Name cannot contain symbols or numbers",
              },
            })}
          />
          <Input
            variant="faded"
            label="Last Name"
            placeholder="Ahmadi"
            startContent={<CircleUser size={18} />}
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Z]+$/i,
                message: "Name cannot contain symbols or numbers",
              },
            })}
          />
          <Input
            variant="faded"
            label="Password"
            placeholder="Password"
            type="password"
            startContent={<Lock size={18} />}
          />
          <Textarea
            variant="faded"
            label="Bio"
            {...register("bio")}
            placeholder="Write something about yourself..."
          />
        </div>
        <div className="flex justify-start space-x-4 mt-4">
          <Button variant="bordered" color="primary">
            Cancel
          </Button>
          <Button variant="solid" color="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default Profile;

function EditInfoSkeleton() {
  return (
    <Card className="p-6 w-full max-w-3xl border rounded-lg shadow-md bg-white space-y-6">
      <Skeleton className="h-6 w-32 rounded-lg" />
      <div className="relative w-24 h-24 mx-auto">
        <Skeleton className="w-24 h-24 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
      <div className="flex justify-start space-x-4 mt-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </Card>
  );
}
