import { FC } from "react";
import logo from "../../assets/logo.png";
import CustomLink from "../CustomLink";

const Header: FC = () => {
  return (
    <header className="px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-800">
      <nav className="container flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center" href="#">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
          <h1 className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
            VIP
          </h1>
        </a>
        <div>
          <CustomLink href="/" children="Home" className="text-black mr-3" />
          <CustomLink
            href="/calendar"
            children="Calendar"
            className="text-black"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
