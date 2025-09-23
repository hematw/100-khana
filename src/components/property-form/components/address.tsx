import { Input } from "@/src/components/ui/input";
import { PropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
// import { MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
// import { Combobox } from "@/components/ui/combo-box";

type TDistrict = {
  name: string;
  _id: string;
};

export type TCity = {
  name: string;
  _id: string;
};

async function getCities(): Promise<TCity[]> {
  const response = await axiosIns.get("/cities");
  return response.data.cities;
}

async function getDistricts(cityId: string): Promise<TDistrict[]> {
  const response = await axiosIns.get("/districts", { params: { cityId } });
  return response.data.districts;
}

function Address({ form }: { form: UseFormReturn<PropertyForm> }) {
  const selectedCity = form.getValues("city");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    isLoading: isLoadingCities,
    isError: isErrorCities,
    data: cities = [],
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 1000 * 60 * 3,
  });

  const {
    isLoading: isLoadingDistricts,
    isError: isErrorDistricts,
    data: districts = [],
  } = useQuery({
    queryKey: ["districts", selectedCity],
    queryFn: () => getDistricts(selectedCity),
    staleTime: 1000 * 60 * 3,
    enabled: !!selectedCity,
  });

  const getGeolocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      try {
        navigator.geolocation.getCurrentPosition((loc) => {
          console.log(loc.coords);
          form.setValue("lng", loc.coords.longitude.toString());
          form.setValue("lat", loc.coords.latitude.toString());
        });
      } catch (error) {
        console.error(error);
        toast.error("Couldn't get location info.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isErrorCities || isErrorDistricts) {
    return <h1>Something went wrong</h1>;
  }

  if (isLoadingCities || isLoadingDistricts) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Controller
        control={form.control}
        name="city"
        render={({ field }) => (
          <Select value={field.value} onValueChange={(v) => form.setValue("city", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="district"
        render={({ field }) => (
          <Select value={field.value} onValueChange={(v) => form.setValue("district", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name="road"
        render={({ field }) => (
          <Input placeholder="Main Road e.g. Shahr e Naw - Qala Fathullah" {...field} />
        )}
      />
      <Controller
        control={form.control}
        name="street" // ✅ Fixed duplicate field name
        render={({ field }) => (
          <Input placeholder="Street e.g. 4th street" {...field} />
        )}
      />
      <div className="col-span-2 flex flex-col">
        <Button onClick={getGeolocation} disabled={isLoading}>Get current Location</Button>
        <span className="text-xs text-primary-400 mt-2">
          {!!form.formState.errors.lat?.message && "Give us your location info"}
        </span>
      </div>
    </>
  );
}
export default Address;
