import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { toast } from "sonner";
import { Form } from "@/src/components/ui/form";
import { Skeleton } from "@/src/components/ui/skeleton";
import { AtSign, Camera, CircleUser, Lock, Phone, User } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosIns from "@/src/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Profile as ProfileType } from "@/src/types";



async function getProfile(id: string) {
  const res = await axiosIns.get(`/users/${id}`, { withCredentials: true });
  console.log("Response", res);
  return res.data;
}

function Profile() {
  const user = { _id: "temp" }; // TODO: Replace with actual auth context

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
      toast.success("Profile Updated");
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
  });

  const [selectedFile, setSelectedFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : profileData?.profile;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileType>({
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

  const onSubmit: SubmitHandler<ProfileType> = async (values) => {
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
        <Avatar className="w-24 h-24">
          <AvatarImage src={profileUrl || profileData?.profile || "/profile-picture.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef as Ref<HTMLInputElement>}
        />
        <Button
          size="sm"
          className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full border"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="w-4 h-4 text-gray-600" />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              placeholder="@rezwan"
              {...register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Z]+$/i,
                  message: "Username cannot contain symbols or numbers",
                },
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              placeholder="rezwan@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              placeholder="1234567890"
              {...register("phone", {
                pattern: {
                  value: /^\+93(78|73|79|77|72|74|70)\d{7}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              placeholder="Ahmad"
              {...register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Z]+$/i,
                  message: "Name cannot contain symbols or numbers",
                },
              })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              placeholder="Ahmadi"
              {...register("lastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[A-Z]+$/i,
                  message: "Name cannot contain symbols or numbers",
                },
              })}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              {...register("bio")}
              placeholder="Write something about yourself..."
            />
          </div>
        </div>
        <div className="flex justify-start space-x-4 mt-4">
          <Button variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>
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
