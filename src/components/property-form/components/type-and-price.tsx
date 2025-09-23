import { Input } from "@/src/components/ui/input";
import { PropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api";
import { ListingType, TCategory } from "@/types";



const listingTypes: ListingType[] = [
  { label: "Rental", value: "rental" },
  { label: "Sale", value: "sale" },
  { label: "Mortgage", value: "mortgage" },
];



function AreaAndPrice({ form }: { form: UseFormReturn<PropertyForm> }) {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 3,
    queryFn: getCategories,
  });

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Controller
        control={form.control}
        name="listingType"
        render={({ field }) => (
          <Select value={field.value[0]} onValueChange={(v) => form.setValue("listingType", [v])}>
            <SelectTrigger>
              <SelectValue placeholder="Listing Type e.g. Rental" />
            </SelectTrigger>
            <SelectContent>
              {listingTypes.map((lt) => (
                <SelectItem key={lt.value} value={lt.value}>{lt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="category"
        render={({ field }) => (
          <Select value={field.value[0]} onValueChange={(v) => form.setValue("category", [v])}>
            <SelectTrigger>
              <SelectValue placeholder="Property type e.g. Apartment" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((c: TCategory) => (
                <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="area"
        render={({ field }) => (
          <Input type="number" placeholder="Area (m2) e.g. 320" {...field} value={field.value.toString()} />
        )}
      />
      <Controller
        control={form.control}
        name="price"
        render={({ field }) => (
          <Input type="number" placeholder="Price (AFN) e.g. 1000" {...field} value={field.value.toString()} />
        )}
      />
    </>
  );
}
export default AreaAndPrice;

// {step === 2 && (
//     <>
//       {/* Description */}
//       <InputGroup label="Description" text="Description about your place.">
//         <div className="my-2">
//           <textarea
//             {...register("desc", { required: true })}
//             placeholder="Ex: Beautiful house with a big pool..."
//             className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-400 transition-all duration-200 resize-none"
//           />
//           {errors.desc && (
//             <p className="text-red-500 text-sm mt-1">Description is required.</p>
//           )}
//         </div>
//       </InputGroup>
//     </>
//   )}

//   {step === 3 && (
//     <>
//       {/* Facilities */}
//       <InputGroup
//         label="Facilities"
//         text="Choose your place's facilities and amenities. Click to select."
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
//           {[
//             { id: "tv", icon: <IoTvOutline />, label: "TV" },
//             { id: "ac", icon: <TbAirConditioning />, label: "AC" },
//             { id: "wifi", icon: <FaWifi />, label: "WiFi" },
//             { id: "water", icon: <FaBottleWater />, label: "Drinking Water" },
//             { id: "parking", icon: <FaCarSide />, label: "Parking" },
//             { id: "pool", icon: <FaSwimmingPool />, label: "Pool" },
//             { id: "elevator", icon: <PiElevatorLight />, label: "Elevator" },
//             { id: "guard", icon: <GuardIcon />, label: "Guard" },
//           ].map((facility) => (
//             <div
//               key={facility.id}
//               className="border-2 border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-red-400 transition-all duration-200"
//             >
//               <input
//                 type="checkbox"
//                 id={facility.id}
//                 {...register(facility.id)}
//                 className="hidden"
//               />
//               <label htmlFor={facility.id} className="flex items-center gap-2 cursor-pointer">
//                 <span className="text-xl">{facility.icon}</span>
//                 <span>{facility.label}</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       </InputGroup>
//     </>
//   )}
