import { Input } from "@heroui/input";
import { IPropertyForm } from "..";
import { Controller, UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
// import { MapPin } from "lucide-react";
import { useState } from "react";
import { addToast } from "@heroui/toast";
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

function Address({ form }: { form: UseFormReturn<IPropertyForm> }) {
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
        addToast({
          color: "primary",
          title: "Something went wrong!",
          description: "Couldn't get location info.",
        });
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
          <Autocomplete
            label="City"
            items={cities}
            {...field}
            placeholder="e.g. Kabul..."
            isInvalid={!!form.formState.errors.city}
            errorMessage={form.formState.errors.city?.message}
            defaultSelectedKey={field.value}
            onSelectionChange={(selectedCity) =>
              form.setValue("city", selectedCity?.toString() || "")
            }
          >
            {(item) => (
              <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Controller
        control={form.control}
        name="district"
        render={({ field }) => (
          <Autocomplete
            label="District"
            items={districts}
            {...field}
            placeholder="e.g. 12th district..."
            isInvalid={!!form.formState.errors.district}
            errorMessage={form.formState.errors.district?.message}
            defaultSelectedKey={field.value}
            onSelectionChange={(selectedCity) =>
              form.setValue("district", selectedCity?.toString() || "")
            }
          >
            {(item) => (
              <AutocompleteItem key={item._id} textValue={item.name}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Controller
        control={form.control}
        name="road"
        render={({ field }) => (
          <Input
            label="Main Road"
            placeholder="e.g. Shahr e Naw - Qala Fathullah"
            isInvalid={!!form.formState.errors.road}
            errorMessage={form.formState.errors.road?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="street" // ✅ Fixed duplicate field name
        render={({ field }) => (
          <Input
            label="Street"
            placeholder="e.g. 4th street"
            isInvalid={!!form.formState.errors.street}
            errorMessage={form.formState.errors.street?.message}
            {...field}
          />
        )}
      />
      <div className="col-span-2 flex flex-col">
        <Button
          onPress={getGeolocation}
          // startContent={<MapPin />}
          size="lg"
          color="primary"
          variant="solid"
          isLoading={isLoading}
        >
          Get current Location
        </Button>
        <span className="text-xs text-primary-400 mt-2">
          {!!form.formState.errors.lat?.message && "Give us your location info"}
        </span>
      </div>
    </>
  );
}
export default Address;
