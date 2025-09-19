import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import { Select, SelectedItems, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api";
import { TListingType } from "@/types";



const listingTypes: TListingType[] = [
  { label: "Rental", value: "rental" },
  { label: "Sale", value: "sale" },
  { label: "Mortgage", value: "mortgage" },
];



function AreaAndPrice({ form }: { form: UseFormReturn<IPropertyForm> }) {
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
          <Select
            label="Listing Type"
            // isMultiline={true}
            items={listingTypes}
            placeholder="e.g. Rental"
            selectionMode="multiple"
            variant="flat"
            isInvalid={!!form.formState.errors.listingType}
            errorMessage={form.formState.errors.listingType?.message}
            defaultSelectedKeys={field.value}
            onSelectionChange={(keys) => {
              const selectedValues = Array.from(keys).map((key) => String(key));
              form.setValue("listingType", selectedValues);
            }}
            renderValue={(items: SelectedItems<TListingType>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.value}</Chip>
                  ))}
                </div>
              );
            }}
          >
            {(item) => (
              <SelectItem key={item.value} textValue={item.value}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">{item.value}</div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="category"
        render={({ field }) => (
          <Select
            label="Property type"
            // isMultiline={true}
            items={categories}
            // {...field}
            defaultSelectedKeys={field.value}
            placeholder="e.g. Apartment"
            isInvalid={!!form.formState.errors.category}
            errorMessage={form.formState.errors.category?.message}
            onSelectionChange={(keys) => {
              const selectedValues = Array.from(keys).map((key) => String(key));
              form.setValue("category", selectedValues);
            }}
            renderValue={(items: SelectedItems<TCategory>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.name}</Chip>
                  ))}
                </div>
              );
            }}
            selectionMode="multiple"
            variant="flat"
          >
            {(item) => (
              <SelectItem key={item._id} textValue={item.name}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">{item.name}</div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="area"
        render={({ field }) => (
          <Input
            type="number"
            label="Area (m2)"
            placeholder="e.g. 320"
            isInvalid={!!form.formState.errors.area}
            errorMessage={form.formState.errors.area?.message}
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="price"
        render={({ field }) => (
          <Input
            type="number"
            label="Price (AFN)"
            placeholder="e.g. 1000"
            isInvalid={!!form.formState.errors.price}
            errorMessage={form.formState.errors.price?.message}
            {...field}
            value={field.value.toString()}
          />
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
