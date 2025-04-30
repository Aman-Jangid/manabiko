import { Lightbulb, LightbulbOff } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted &&
        (theme === "light" ? (
          <Lightbulb
            className="w-6 h-6 cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <LightbulbOff
            className="w-6 h-6 cursor-pointer"
            onClick={() => setTheme("light")}
          />
        ))}
    </>
  );
}
