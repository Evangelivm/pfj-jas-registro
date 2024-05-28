import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header className="text-white bg-gradient-to-b from-blueSecond  to-blueFirst">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 sm:ml-0 mx-2 text-xl text-white">PFJ-JAS</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            href={"/menu"}
            className=" mr-5 sm:mr-0 mx-5 hover:text-yellowFirst "
          >
            Compañias
          </Link>
          <Link
            href={"/stats"}
            className=" mr-5 sm:mr-0 mx-5 hover:text-yellowFirst"
          >
            Estadisticas
          </Link>
          {/* <Link href={"/registro"} className="mr-5 hover:text-yellowFirst">
            Registro
          </Link> */}
          {/* <Link href={"/perm"} className="mr-5 hover:text-yellowFirst">
            Permutas
          </Link> */}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
