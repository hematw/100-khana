import { Controller } from "react-hook-form";
import axiosIns from "@/src/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Badge } from "@/src/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import icons from "@/src/lib/icons";
import { Facility } from "@/src/types";
import { useFormContext } from "../context/FormContext";



async function getFacilities(): Promise<Facility[]> {
  const { data } = await axiosIns.get("/facilities");
  return data.facilities;
}

function Facilities() {
  const { form } = useFormContext();
  const {
    data: facilities,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
    staleTime: 1000 * 60 * 3,
  });

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="col-span-4 justify-center">
      <Controller
        control={form.control}
        name="facilities"
        render={({ field }) => (
          <div className="space-y-2">
            <Select value={Array.isArray(field.value) ? (typeof field.value[0] === 'string' ? field.value[0] : field.value[0]?._id) : undefined} onValueChange={(v) => {
              const currentValue = Array.isArray(field.value) ? field.value : [];
              const stringValues = currentValue.map(item => typeof item === 'string' ? item : item._id);
              form.setValue("facilities", Array.from(new Set([...stringValues, v])));
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a facility" />
              </SelectTrigger>
              <SelectContent>
                {facilities?.map((f) => (
                  <SelectItem key={f._id} value={f._id}>{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(field.value) ? field.value : []).map((item) => {
                const id = typeof item === 'string' ? item : item._id;
                const f = facilities?.find((x) => x._id === id)
                if (!f) return null
                const Icon = icons[f.icon as keyof typeof icons]
                return (
                  <Badge key={id} variant="secondary" className="gap-1">
                    {Icon}
                    {f.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      />
    </div>
  );
}
export default Facilities;
