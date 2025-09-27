"use client"

import { PropertyForm, ISearchForm, TCategory } from "@/src/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
import { CircleX, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/src/components/house-card";
import axiosIns from "@/src/axios";
import { getCategories, getCities } from "@/src/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Form } from "@/src/components/ui/form";
import { saveOrRemoveToWishlist } from "@/src/lib/utils";

type PropertyWithID = PropertyForm & Record<"_id", string>;
type AdvanceSearch = ISearchForm & {
  area?: string;
  category?: string[];
};

function Properties() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<AdvanceSearch>({
    defaultValues: {
      listingType: [],
      city: "",
      min_price: "",
      max_price: "",
      area: "",
      category: [],
    },
  });

  const paramsString = searchParams?.toString() ?? "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["properties", paramsString],
    queryFn: async () => {
      const res = await axiosIns.get(`/properties${paramsString ? `?${paramsString}` : ""}`);
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

  const listingTypes = [
    { label: "Rental", value: "rental" },
    { label: "Sale", value: "sale" },
    { label: "Mortgage", value: "mortgage" },
  ];

  const toName = (val: PropertyForm["city"]) => (typeof val === "string" ? val : val.name);

  return (
    <section className="max-w-screen-2xl mx-auto p-6">
      <div className="px-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              const formValues = form.getValues();
              const entries = Object.entries(formValues).filter(([, value]) => {
                if (Array.isArray(value)) return value.length > 0;
                if (typeof value === "string") return value.length > 0;
                return false;
              });
              const params = new URLSearchParams();
              for (const [key, value] of entries as Array<[string, string | string[]]>) {
                if (Array.isArray(value)) {
                  for (const v of value) params.append(key, v);
                } else {
                  params.set(key, value);
                }
              }
              const qs = params.toString();
              router.push(`/properties${qs ? `?${qs}` : ""}`);
            })}
            className="mx-10"
          >
          <div className="min-w-full items-center flex gap-2 rounded-sm p-2 ">
            <Controller
              control={form.control}
              name="city"
              render={({ field }) => (
                <Select value={field.value} onValueChange={(v) => form.setValue("city", v)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="City e.g. Kabul" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c: { _id: string; name: string }) => (
                      <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Select value={form.watch("listingType")[0] || ""} onValueChange={(v) => form.setValue("listingType", [v])}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Listing Type" />
              </SelectTrigger>
              <SelectContent>
                {listingTypes.map((lt) => (
                  <SelectItem key={lt.value} value={lt.value}>{lt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => {
              const [minPrice, maxPrice] = value.split(",");
              form.setValue("min_price", minPrice || "");
              form.setValue("max_price", maxPrice || "");
            }}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "free - 1K", value: "0,1000" },
                  { label: "1K - 5K", value: "1000,5000" },
                  { label: "5K - 10K", value: "5000,10000" },
                  { label: "10K - 20K", value: "10000,20000" },
                  { label: "20K - 50K", value: "20000,50000" },
                  { label: "50K - 100K", value: "50000,100000" },
                  { label: "100K - 1M", value: "100000,1000000" },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={(form.watch("category")?.[0] as string) || ""} onValueChange={(v) => form.setValue("category", [v])}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Property type" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c: TCategory) => (
                  <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Area e.g. 100m2" className="w-28" defaultValue={form.getValues("area") || ""} {...form.register("area")} />
            <div className="flex items-center gap-2">
              <Button type="submit" className="py-4">
                <Search />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  form.reset();
                  router.push(`/properties`);
                }}
              >
                <CircleX />
              </Button>
            </div>
          </div>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-16 xl:mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 items-stretch place-items-center py-6">
        {data?.properties.length ? (
          data?.properties.map((property: PropertyWithID) => (
            <Link href={`/properties/${property._id}`} key={property._id}>
              <PropertyCard
                address={`${toName(property.city)}, ${typeof (property as unknown as {district: string | { name: string }}).district === 'string' ? (property as unknown as {district: string}).district : ((property as unknown as {district: { name?: string }}).district?.name ?? '')}, ${property.road}, ${property.street}`}
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
