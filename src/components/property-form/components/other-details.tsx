import { Input } from "@/src/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PropertyForm } from "..";
import { ChangeEvent } from "react";

function OtherDescription({ form }: { form: UseFormReturn<PropertyForm> }) {
  const descValue = form.getValues("description");

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    descValue[index] = e.target.value;
    form.setValue("description", descValue);
  };
  return (
    <div className="col-span-2">
      <h3>If you have further description write it here.</h3>
      <ul>
        <li className="w-full">
          <Input
            size="sm"
            label="1."
            variant="underlined"
            value={descValue[0] || ""}
            onChange={(e) => handleChange(e, 0)}
          />
        </li>
        <li className="w-full">
          <Input
            size="sm"
            label="2."
            variant="underlined"
            value={descValue[1] || ""}
            onChange={(e) => handleChange(e, 1)}
          />
        </li>
        <li className="w-full">
          <Input
            size="sm"
            label="3."
            variant="underlined"
            value={descValue[2] || ""}
            onChange={(e) => handleChange(e, 2)}
          />
        </li>
        <li className="w-full">
          <Input
            size="sm"
            label="4."
            variant="underlined"
            value={descValue[3] || ""}
            onChange={(e) => handleChange(e, 3)}
          />
        </li>
        <li className="w-full">
          <Input
            size="sm"
            label="5."
            variant="underlined"
            value={descValue[4] || ""}
            onChange={(e) => handleChange(e, 4)}
          />
        </li>
        <li className="w-full">
          <Input
            size="sm"
            label="6."
            variant="underlined"
            value={descValue[5] || ""}
            onChange={(e) => handleChange(e, 5)}
          />
        </li>
        <li className="w-full">
          <Input
            size="sm"
            label="7."
            variant="underlined"
            value={descValue[6] || ""}
            onChange={(e) => handleChange(e, 6)}
          />
        </li>
      </ul>
    </div>
  );
}

export default OtherDescription;
