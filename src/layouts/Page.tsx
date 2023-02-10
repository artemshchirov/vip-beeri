import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="p-3 flex flex-col items-center justify-between min-h-screen bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <Header />
      <main className="flex flex-col items-center justify-center w-full h-full px-4 py-2 sm:px-8 sm:py-4 md:px-12 md:py-6 lg:px-16 lg:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
