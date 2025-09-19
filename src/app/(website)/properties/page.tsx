import { IPropertyForm, ISearchForm } from "@/src/types";
import { useSearchParams } from "next/navigation";
import { Controller, Form, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Button } from "@/src/components/ui/button";
import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/src/components/house-card";

type PropertyWithID = IPropertyForm & Record<"_id", string>;
type TAdvanceSearch = ISearchForm & {
  area?: string;
  category?: string[];
};

function Properties() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<TAdvanceSearch>({
    defaultValues: {
      listingType: [],
      city: "",
      min_price: "",
      max_price: "",
      area: "",
      category: [],
    },
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["properties", location.search],
    queryFn: async () => {
      const res = await axiosIns.get(`/properties${location.search}`);
      return res.data;
    },
    // enabled: false,
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: getCities,
    // enabled: false,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 3,
    queryFn: getCategories,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) console.error(error);

  return (
    <section className="max-w-screen-2xl mx-auto p-6">
      <div className="px-12">
        <Form
          onSubmit={form.handleSubmit(() => {
            refetch();
          })}
          className="mx-10"
        >
          <div className="min-w-full items-center flex gap-2 rounded-sm p-2 ">
            <Controller
              control={form.control}
              name="city"
              render={({ field }) => (
                <Autocomplete
                  size="sm"
                  radius="sm"
                  color="primary"
                  variant="faded"
                  label="City"
                  items={cities}
                  {...field}
                  placeholder="e.g. Kabul..."
                  defaultSelectedKey={field.value}
                  onSelectionChange={(selectedCity) =>
                    form.setValue("city", selectedCity?.toString() || "")
                  }
                >
                  {(item) => (
                    <AutocompleteItem key={item._id}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Select
              items={listingTypes}
              label="Listing Type"
              placeholder="Select listing type"
              selectionMode="multiple"
              size="sm"
              radius="sm"
              color="primary"
              variant="faded"
              defaultSelectedKeys={form.getValues("listingType")}
              onSelectionChange={(keys) => {
                const selectedValues = Array.from(keys).map((key) =>
                  String(key),
                );
                form.setValue("listingType", selectedValues);
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
            <Select
              label="Price Range"
              placeholder="e.g. 5K - 10K..."
              size="sm"
              radius="sm"
              color="primary"
              variant="faded"
              items={[
                { label: "free - 1K", value: [0, 1000] },
                { label: "1K - 5K", value: [1000, 5000] },
                { label: "5K - 10K", value: [5000, 10000] },
                { label: "10K - 20K", value: [10000, 20000] },
                { label: "20K - 50K", value: [20000, 50000] },
                { label: "50K - 100K", value: [50000, 100000] },
                { label: "100K - 1M", value: [100000, 1000000] },
              ]}
              defaultSelectedKeys={
                form.getValues("max_price")
                  ? [
                      form.getValues("min_price"),
                      form.getValues("max_price"),
                    ].join()
                  : []
              }
              onChange={({ target: { value } }) => {
                const [minPrice, maxPrice] = value.split(",");
                form.setValue("min_price", minPrice || "");
                form.setValue("max_price", maxPrice || "");
              }}
            >
              {(item) => (
                <SelectItem
                  key={`${item.value[0]},${item.value[1]}`}
                  textValue={item.label}
                >
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">{item.label}</div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Select
              label="Property type"
              placeholder="e.g. Apartment"
              variant="faded"
              size="sm"
              radius="sm"
              color="primary"
              // isMultiline={true}
              items={categories}
              defaultSelectedKeys={form.getValues("category")}
              isInvalid={!!form.formState.errors.category}
              errorMessage={form.formState.errors.category?.message}
              onSelectionChange={(keys) => {
                const selectedValues = Array.from(keys).map((key) =>
                  String(key),
                );
                form.setValue("category", selectedValues);
              }}
              selectionMode="multiple"
            >
              {(item) => (
                <SelectItem key={item._id} textValue={item.name}>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">{item.name}</div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Input
              label="Area"
              placeholder="e.g. 100m2"
              type="number"
              size="sm"
              variant="faded"
              color="primary"
              radius="sm"
              min={0}
              defaultValue={form.getValues("area")}
              classNames={{
                inputWrapper: "w-24",
                base: "w-24",
              }}
              {...form.register("area")}
            />
            <div className="flex items-center gap-2">
              <Tooltip content="Search" showArrow>
                <Button
                  // type="submit"
                  isIconOnly
                  startContent={<SearchIcon />}
                  className="py-4"
                  radius="sm"
                  size="lg"
                  variant="solid"
                  color="primary"
                  onPress={() => {
                    const formValues = form.getValues();
                    const truthyValues = Object.fromEntries(
                      Object.entries(formValues).filter(([_, value]) =>
                        Boolean(value?.length),
                      ),
                    );
                    const queryStrings = new URLSearchParams(
                      truthyValues,
                    ).toString();
                    setSearchParams(queryStrings);
                    // refetch();
                  }}
                />
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    color="primary"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    <CircleX />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear search</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Form>
      </div>
      <div className="px-4 lg:px-16 xl:mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 items-stretch place-items-center py-6">
        {data?.properties.length ? (
          data?.properties.map((property: PropertyWithID) => (
            <Link href={`/properties/${property._id}`} key={property._id}>
              <PropertyCard
                address={`${property.city.name}, ${property.district.name}, ${property.road}, ${property.street}`}
                price={+property.price}
                listingType={property.listingType.join(", ")}
                images={property.images as string[]}
                className="border border-gray-300 dark:border-gray-600 hover:shadow-xl hover:scale-[1.02] min-h-full justify-between"
                onAddWishlist={() =>
                  saveOrRemoveToWishlist<PropertyWithID>("bookmarks", property)
                }
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full w-96">
            <p className="text-center font-semibold font-clash text-2xl">
              We couldn@apos;t find any properties
            </p>
            <p className="text-center">Try a different search</p>
            <Image
              src="/House searching-amico.svg"
              alt="No Properties for this search"
              className="mx-auto"
              height={320}
              width={320}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Properties;
