import React from "react";
import Form from "./form";

function page() {
  return (
    <>
      <section className="text-gray-600 body-font bg-blueFirst  min-h-screen">
        <div className="container mx-auto flex flex-col px-5 pt-24 pb-2 justify-center items-center">
          <div className="w-full md:w-2/3 flex flex-col sm:mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Registro de Nuevo Participante
            </h1>
            <p className="mb-8 leading-relaxed text-white">
              Escriba los campos en el orden que estan
            </p>
          </div>
        </div>
        <Form />
      </section>
    </>
  );
}

export default page;
