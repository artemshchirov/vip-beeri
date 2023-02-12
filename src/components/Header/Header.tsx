import { FC } from "react";
import logo from "../../assets/logo.png";

const Header: FC = () => {
  return (
    <header className="px-4 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
      <nav className="container flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center" href="#">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
          <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            VIP Рома
          </h1>
        </a>
      </nav>
    </header>
  );
};

export default Header;
