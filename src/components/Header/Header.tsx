import { FC } from "react";
import logo from "../../assets/logo.png";

const Header: FC = () => {
  return (
    <header className="w-full p-2 border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800 md:px-6 dark:border-gray-700">
      <div className="flex justify-start items-center">
        <img src={logo} className="h-6 m-1 sm:h-10" alt="App Logo" />
        <h1 className="self-center text-xl font-semibold text-black dark:text-white">
          VIP Calendar
        </h1>
      </div>
    </header>
  );
};

export default Header;
