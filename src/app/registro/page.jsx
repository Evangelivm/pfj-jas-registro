import { conn } from "../libs/mysql";
import Barra from "./barra";

async function loadStats() {
  try {
    const data = await conn.query(
      "SELECT id_part, CONCAT(apellidos,', ',nombres) AS 'name' FROM participante;"
    );
    // const keyValueArray = data.map((row) => [row["id_part"], row["name"]]);
    const keyValueArray = data[0];
    // console.log(keyValueArray);
    return keyValueArray;
  } catch (error) {
    console.error("Error loading stats:", error);
    throw error;
  }
}

async function Page() {
  const part = await loadStats();
  //   console.log(part);

  return (
    <section className="text-gray-600 body-font bg-blueFirst  min-h-screen">
      <div className="container mx-auto flex flex-col px-5 pt-24 pb-2 justify-center items-center">
        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Asistencia de Participantes
          </h1>
          <p className="mb-8 leading-relaxed text-white">
            Escriba el nombre, seleccione cuando aparezca y hace click en
            &quotBuscar&quot
          </p>
        </div>

        <Barra part={part} />

        {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}

        {/* <div className="w-full  mb-20 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Registro por Lector QR
          </h1>
          <p className="mb-8 leading-relaxed text-white">
            Presione el boton que esta debajo y señale su celular al codigo QR
          </p>
          <button className="inline-flex text-yellowFirst bg-redFirst border-0 py-2 px-10 focus:outline-none hover:bg-redSecond rounded text-lg m-9">
            Usar Lector QR
          </button>
        </div> */}
      </div>
    </section>
  );
}

export default Page;
