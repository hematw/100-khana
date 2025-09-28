import { Input } from "@/src/components/ui/input";
import { ChangeEvent } from "react";
import { useFormContext } from "../context/FormContext";

function OtherDescription() {
  const { form } = useFormContext();
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
          <div className="space-y-2">
            <label className="text-sm font-medium">1.</label>
            <Input
              value={descValue[0] || ""}
              onChange={(e) => handleChange(e, 0)}
            />
          </div>
        </li>
        <li className="w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">2.</label>
            <Input
              value={descValue[1] || ""}
              onChange={(e) => handleChange(e, 1)}
            />
          </div>
        </li>
        <li className="w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">3.</label>
            <Input
              value={descValue[2] || ""}
              onChange={(e) => handleChange(e, 2)}
            />
          </div>
        </li>
        <li className="w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">4.</label>
            <Input
              value={descValue[3] || ""}
              onChange={(e) => handleChange(e, 3)}
            />
          </div>
        </li>
        <li className="w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">5.</label>
            <Input
              value={descValue[4] || ""}
              onChange={(e) => handleChange(e, 4)}
            />
          </div>
        </li>
        <li className="w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">6.</label>
            <Input
              value={descValue[5] || ""}
              onChange={(e) => handleChange(e, 5)}
            />
          </div>
        </li>
        <li className="w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">7.</label>
            <Input
              value={descValue[6] || ""}
              onChange={(e) => handleChange(e, 6)}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OtherDescription;
