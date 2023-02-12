import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="px-4 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
      <span className="container flex flex-wrap items-center h-6 mx-auto text-sm text-gray-500 sm:h-9 sm:text-center dark:text-gray-400">
        © 2023&nbsp;
        <a href="#" className="hover:underline">
          Developed by Ɐrtem
        </a>
      </span>
    </footer>
  );
};

export default Footer;
