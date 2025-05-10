import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full h-12 p-4 flex justify-between items-center z-10">
      <h1
        className="text-xl font-bold cursor-pointer select-none"
        style={{ fontFamily: "Hachi Maru Pop", translate: "0 -6px" }}
        onClick={() => router.push("/")}
      >
        学ぶKo
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};
