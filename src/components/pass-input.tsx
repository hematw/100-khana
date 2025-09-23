import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { memo, useState } from "react";

function PassInput(props: any) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute inset-y-0 right-2 flex items-center"
      >
        {isVisible ? (
          <EyeOffIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default memo(PassInput);
