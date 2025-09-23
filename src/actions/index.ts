import axiosIns from "@/src/axios";
import { TCategory } from "../types";
import { TCity } from "../components/property-form/components/address";

export async function getCities(): Promise<TCity[]> {
  const response = await axiosIns.get("/cities");
  return response.data.cities;
}

export async function getCategories(): Promise<TCategory[]> {
  const { data } = await axiosIns.get("/categories");
  return data.categories;
}
