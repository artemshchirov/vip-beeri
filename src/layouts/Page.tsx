import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="py-4 md:py-4 px-8 md:px-12 xl:px-20 lg:px-16 flex flex-col min-h-screen justify-between bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <Header />
      <main className="flex justify-center w-full p-4 no-scrollbar md:p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
