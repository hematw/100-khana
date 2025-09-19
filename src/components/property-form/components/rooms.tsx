import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";

function Rooms({ form }: { form: UseFormReturn<IPropertyForm> }) {
  return (
    <>
      <Controller
        control={form.control}
        name="numOfLivingRooms"
        render={({ field }) => (
          <Input
            type="number"
            label="Living Rooms."
            placeholder="e.g. 4"
            isInvalid={!!form.formState.errors.numOfLivingRooms}
            errorMessage={form.formState.errors.numOfLivingRooms?.message}
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="numOfBedRooms"
        render={({ field }) => (
          <Input
            type="number"
            label="Bed Rooms."
            placeholder="e.g. 4"
            isInvalid={!!form.formState.errors.numOfBaths}
            errorMessage={form.formState.errors.numOfBaths?.message}
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="numOfBaths"
        render={({ field }) => (
          <Input
            type="number"
            label="Bathrooms."
            placeholder="e.g. 2"
            isInvalid={!!form.formState.errors.numOfBaths}
            errorMessage={form.formState.errors.numOfBaths?.message}
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="numOfKitchens"
        render={({ field }) => (
          <Input
            type="number"
            label="Kitchens."
            placeholder="e.g. 320m2"
            isInvalid={!!form.formState.errors.numOfKitchens}
            errorMessage={form.formState.errors.numOfKitchens?.message}
            {...field}
            value={field.value.toString()}
          />
        )}
      />
      <Controller
        control={form.control}
        name="floor"
        render={({ field }) => (
          <Input type="number" label="Floor." placeholder="e.g. 3" 
            isInvalid={!!form.formState.errors.floor}
            errorMessage={form.formState.errors.floor?.message} {...field} />
        )}
      />
      <Controller
        control={form.control}
        name="totalFloors"
        render={({ field }) => (
          <Input
            type="number"
            label="Total Floors."
            placeholder="e.g. 5"
            isInvalid={!!form.formState.errors.totalFloors}
            errorMessage={form.formState.errors.totalFloors?.message}
            {...field}
          />
        )}
      />
    </>
  );
}
export default Rooms;
