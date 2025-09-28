import { Input } from "@/src/components/ui/input";
import { Controller } from "react-hook-form";
import { useFormContext } from "../context/FormContext";

function Rooms() {
  const { form } = useFormContext();
  return (
    <>
      <Controller
        control={form.control}
        name="numOfLivingRooms"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Living Rooms</label>
            <Input
              type="number"
              placeholder="e.g. 4"
              {...field}
              value={field.value.toString()}
            />
            {form.formState.errors.numOfLivingRooms && (
              <p className="text-sm text-red-500">{String(form.formState.errors.numOfLivingRooms.message || '')}</p>
            )}
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="numOfBedRooms"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Bed Rooms</label>
            <Input
              type="number"
              placeholder="e.g. 4"
              {...field}
              value={field.value.toString()}
            />
            {form.formState.errors.numOfBedRooms && (
              <p className="text-sm text-red-500">{String(form.formState.errors.numOfBedRooms.message || '')}</p>
            )}
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="numOfBaths"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Bathrooms</label>
            <Input
              type="number"
              placeholder="e.g. 2"
              {...field}
              value={field.value.toString()}
            />
            {form.formState.errors.numOfBaths && (
              <p className="text-sm text-red-500">{String(form.formState.errors.numOfBaths.message || '')}</p>
            )}
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="numOfKitchens"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Kitchens</label>
            <Input
              type="number"
              placeholder="e.g. 1"
              {...field}
              value={field.value.toString()}
            />
            {form.formState.errors.numOfKitchens && (
              <p className="text-sm text-red-500">{String(form.formState.errors.numOfKitchens.message || '')}</p>
            )}
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="floor"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Floor</label>
            <Input type="number" placeholder="e.g. 3" {...field} />
            {form.formState.errors.floor && (
              <p className="text-sm text-red-500">{String(form.formState.errors.floor.message || '')}</p>
            )}
          </div>
        )}
      />
      <Controller
        control={form.control}
        name="totalFloors"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Floors</label>
            <Input
              type="number"
              placeholder="e.g. 5"
              {...field}
            />
            {form.formState.errors.totalFloors && (
              <p className="text-sm text-red-500">{String(form.formState.errors.totalFloors.message || '')}</p>
            )}
          </div>
        )}
      />
    </>
  );
}
export default Rooms;
