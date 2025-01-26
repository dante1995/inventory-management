import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/state";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">{name}</h1>
      <button
        onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
};

export default Header;
