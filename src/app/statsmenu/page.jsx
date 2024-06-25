import Link from "next/link";

async function NewPage() {
  return (
    <div className="bg-blueFirst min-h-screen ">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-white text-center lg:text-3xl sm:text-2xl">
          Seleccione una opcion
        </h1>
        <div className="container mx-auto lg:px-24 py-24 sm:p-19 ">
          <div className="grid grid-flow-row gap-4 md:grid-cols-6">
            {/* <Link href="/stats/participant" as={"/stats/participant"}>
              <div className=" hover:text-white hover:bg-redSecond lg:text-xl text-yellowFirst rounded bg-redFirst text-center py-4 sm:text-sm">
                Participantes por Barras
              </div>
            </Link> */}
            <Link href="/list/participant" as={"/list/participant"}>
              <div className=" hover:text-white hover:bg-redSecond lg:text-xl text-yellowFirst rounded bg-redFirst text-center py-4 sm:text-sm">
                Participantes en Bienvenida
              </div>
            </Link>
            {/* <Link href="/stats/participant" as={"/stats/participant"}>
              <div className=" hover:text-white hover:bg-redSecond lg:text-xl text-yellowFirst rounded bg-redFirst text-center py-4 sm:text-sm">
                Participantes por Habitacion
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
