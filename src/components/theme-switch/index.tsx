import { Button } from "@/src/components/ui/button";
import "./style.css";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = ({
  theme,
  toggleTheme,
  className,
}: {
  theme: string;
  toggleTheme: () => void;
  className?: string;
}) => {
  return (
    <>
      <Button
        isIconOnly
        radius="full"
        variant="faded"
        startContent={theme === "dark" ? <Sun /> : <Moon />}
        onPress={toggleTheme}
        className={className}
      />
    </>
  );
};

export default ThemeSwitch;
