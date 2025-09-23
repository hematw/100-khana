import { Controller, UseFormReturn } from "react-hook-form";
import axiosIns from "@/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Badge } from "@/src/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import icons from "@/lib/icons";
import { PropertyForm, Facility } from "@/types";



async function getFacilities(): Promise<Facility[]> {
  const { data } = await axiosIns.get("/facilities");
  return data.facilities;
}

function Facilities({ form }: { form: UseFormReturn<PropertyForm> }) {
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
            <Select value={field.value?.[0]} onValueChange={(v) => form.setValue("facilities", Array.from(new Set([...(field.value || []), v])))}>
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
              {(field.value || []).map((id: string) => {
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
