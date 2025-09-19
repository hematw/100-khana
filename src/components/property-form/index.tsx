import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Facilities from "./components/facilities";
import { z } from "zod";
import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Rooms from "./components/rooms";
import FileUploadForm from "./components/file-upload";
import AreaAndPrice from "./components/type-and-price";
import { Card, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import Address from "./components/address";
import OtherDescription from "./components/other-details";
import axiosIns from "@/axios";
import Confetti from "react-confetti";
import {
  Building,
  CircleCheck,
  Gem,
  Images,
  MapPinHouse,
  ScrollText,
  WavesLadder,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import { IPropertyForm } from "@/types";
import { useAuth } from "@/contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";

const FormSchema = z.object({
  category: z
    .array(z.string())
    .min(1, { message: "Number of living room is required" }),
  numOfLivingRooms: z
    .string()
    .min(1, { message: "Number of living room is required" }),
  numOfBedRooms: z.string().min(1, { message: "" }),
  numOfKitchens: z.string().min(1, { message: "This field is required" }),
  numOfBaths: z.string().min(1, { message: "This field is required" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" }),
  area: z.string().min(1, { message: "This field is required" }),
  price: z.string().min(1, { message: "This field is required" }),
  listingType: z
    .array(z.string())
    .min(1, { message: "This field is required" }),
  facilities: z.array(z.string()).min(1, { message: "This field is required" }),
  city: z.string().min(1, { message: "This field is required" }),
  district: z.string().min(1, { message: "This field is required" }),
  road: z.string().min(1, { message: "This field is required" }),
  street: z.string().min(1, { message: "This field is required" }),
  lng: z.string().min(1, { message: "This field is required" }),
  lat: z.string().min(1, { message: "This field is required" }),
  floor: z.string().min(1, { message: "This field is required" }),
  totalFloors: z.string().min(1, { message: "This field is required" }),
  description: z.array(z.string()),
});
const icons = [
  <MapPinHouse size={16} />,
  <Gem size={16} />,
  <Building size={16} />,
  <WavesLadder size={16} />,
  <ScrollText size={16} />,
  <Images size={16} />,
];

const validationsForEachStep: (
  | "category"
  | "numOfLivingRooms"
  | "numOfBedRooms"
  | "numOfKitchens"
  | "numOfBaths"
  | "images"
  | "area"
  | "price"
  | "listingType"
  | "facilities"
  | "city"
  | "lng"
  | "lat"
  | "district"
  | "road"
  | "street"
  | "description"
  | "floor"
  | "totalFloors"
)[][] = [
  ["city", "district", "road", "street", "lng", "lat"],
  ["area", "price", "listingType", "category"],
  [
    "numOfLivingRooms",
    "numOfBedRooms",
    "numOfKitchens",
    "numOfBaths",
    "floor",
    "totalFloors",
  ],
  ["facilities"],
  [],
  ["images"],
];

function AddHome() {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      // const previousPage = location.state?.from || "/";
      navigate("/login");
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) return null;

  const TOTAL_STEPS = 6;
  const form = useForm<IPropertyForm>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: {
      numOfLivingRooms: "",
      numOfBedRooms: "",
      numOfKitchens: "",
      numOfBaths: "",
      images: [],
      price: "",
      area: "",
      category: [],
      facilities: [],
      listingType: [],
      city: "",
      district: "",
      road: "",
      street: "",
      lng: "",
      lat: "",
      floor: "",
      totalFloors: "",
      description: [],
    },
  });


  const onSubmit: SubmitHandler<IPropertyForm> = async (
    data: IPropertyForm
  ) => {
    console.log(data);
    try {
      const formData = new FormData();

      // Append non-file fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          // Append each file individually
          data.images.forEach((file) => {
            formData.append(`images`, file);
          });
        } else if (Array.isArray(value)) {
          // Append each item in the array individually
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          // Append non-array fields
          formData.append(key, value);
        }
      });

      // Send the form data to the server
      await axiosIns.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Let the browser set this automatically
        },
      });
      setShowConfetti(true);
      // form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      addToast({
        color: "primary",
        title: "Form is not valid!",
        timeout: 3000,
        description: "Please fill all the required fields",
      });
    }
  };

  const nextStep = async () => {
    const isValid = await form.trigger(validationsForEachStep[step - 1]);
    console.log("form is valid ", isValid);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 w-full">
      <Card className="grid grid-cols-12 max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden min-h-[80vh]">
        <div className="md:col-span-8 col-span-12 p-8  max-h-screen">
          {showConfetti ? (
            <>
              <Confetti width={600} />{" "}
              {/* Optional: Add confetti for celebration */}
              <div className="success-message w-full h-full text-center flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <CircleCheck size={82} className="text-primary-400" />
                  <h3 className="font-semibold text-2xl mb-4 mt-10">
                    Success!
                  </h3>
                  <p>Thank you! Your property has been listed successfully.</p>
                </div>
                <div className="mt-10">
                  <Button>Back to Profile</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <CardHeader className="text-3xl font-bold ">
                Add Your Home
              </CardHeader>
              <div className="px-6">
                <div className="w-full relative py-12 items-center flex justify-between">
                  <div className="w-full h-1  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200">
                    <div>
                      <div
                        className="h-1 bg-primary-500 transition-all duration-500"
                        style={{
                          width: `${(100 / (TOTAL_STEPS - 1)) * (step - 1)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                    <Button
                      isIconOnly
                      size="sm"
                      key={index}
                      onPress={async () => {
                        const isValid = await form.trigger(
                          validationsForEachStep[step - 1]
                        );
                        console.log("form is valid ", isValid);
                        if (isValid) {
                          setStep(index + 1);
                        }
                      }}
                      className={`z-10 step w-6 h-6 rounded-full flex items-center justify-center ${
                        step >= index + 1
                          ? "bg-primary-500 text-white"
                          : "bg-gray-200 text-primary-500"
                      }`}
                    >
                      {icons[index]}
                    </Button>
                  ))}
                </div>
              </div>
              <Form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full items-stretch"
              >
                {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
                <div
                  className="grid grid-cols-2 gap-x-4 gap-y-8 justify-between"
                  key={step} // Use step as the key to trigger re-mounting
                >
                  {step === 1 && <Address form={form} />}

                  {step === 2 && <AreaAndPrice form={form} />}

                  {step === 3 && <Rooms form={form} />}

                  {step === 4 && <Facilities form={form} />}

                  {step === 5 && <OtherDescription form={form} />}

                  {step === 6 && <FileUploadForm form={form} />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {/* {step > 1 && ( */}
                  <Button
                    size="lg"
                    type="button"
                    onPress={prevStep}
                    variant={"bordered"}
                  >
                    Back
                  </Button>
                  {/* )} */}
                  {step < TOTAL_STEPS ? (
                    <Button
                      size="lg"
                      type="button"
                      onPress={() => {
                        nextStep();
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button size="lg" type="submit" color="primary">
                      Submit
                    </Button>
                  )}
                </div>
                {/* </form> */}
              </Form>
            </>
          )}
        </div>
        <div className="col-span-4 md:flex items-center justify-center hidden">
          <img
            src="/Photo.png"
            alt=""
            className="w-full h-full object-center"
          />
        </div>
      </Card>
    </div>
  );
}

export default AddHome;
