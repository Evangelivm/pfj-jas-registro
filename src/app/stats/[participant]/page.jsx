"use server";
import Dough from "./dough";
import Link from "next/link";
import dotenv from "dotenv";

const dynamic = "force-dynamic";
dotenv.config();

function sumStats(data) {
  return data.reduce(
    (acc, curr) => {
      acc.confirmados += curr.confirmados;
      acc.contactados += curr.contactados;
      acc.cancelados += curr.cancelados;
      acc.total += curr.total;
      return acc;
    },
    { confirmados: 0, contactados: 0, cancelados: 0, total: 0 }
  );
}

async function fetchStats() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/stats/`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const stats = data.map((row) => ({
      compañia: row["compañia"],
      confirmados: row["confirmados"],
      contactados: row["contactados"],
      cancelados: row["cancelados"],
      total: row["total"],
    }));
    return stats;
  } catch (err) {
    throw new Error(`Error al cargar datos: ${err.message}`);
  }
}

async function Page() {
  let stats = [];
  try {
    const refresh = await fetch(`${process.env.API_BASE_URL}/api/revalidate/`);
    stats = await fetchStats();
  } catch (error) {
    return (
      <div className="bg-blueFirst min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-white text-center text-2xl">{error.message}</h1>
        </div>
      </div>
    );
  }

  const statsInt = stats.map((item) => {
    for (let clave in item) {
      item[clave] = parseInt(item[clave], 10);
    }
    return item;
  });

  const sums = sumStats(statsInt);

  return (
    <div className="bg-blueFirst min-h-screen ">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-white text-center lg:text-3xl sm:text-2xl">
          Indicadores
        </h1>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.total}
                </h2>
                <p className="leading-relaxed text-white">
                  Participantes en Compañias
                </p>
              </div>
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.confirmados}
                </h2>
                <p className="leading-relaxed text-white">Confirmados</p>
              </div>
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.contactados}
                </h2>
                <p className="leading-relaxed text-white">Contactados</p>
              </div>
              <div className="p-4 sm:w-1/4 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.cancelados}
                </h2>
                <p className="leading-relaxed text-white">Cancelados</p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              {stats.map((stat) => (
                <div
                  className="w-1/8 p-2 md:w-1/4 sm:w-1/2 w-full"
                  key={stat.compañia}
                >
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <Link href={`/comp/${stat.compañia}`}>
                      <h2 className="title-font font-medium text-xl text-white mb-2">
                        Compañia {stat.compañia}
                      </h2>
                    </Link>
                    <Dough key={stat.compañia} info={stat} />
                  </div>
                </div>
              ))}
              {/* indicadores pon compañia */}
            </div>
          </div>
        </section>
        <div className="mb-10">
          <h2 className="text-white text-center mb-3 lg:text-2xl sm:text-xl">
            Sin Compañia Asignada
          </h2>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              {/* Encabezado de la tabla */}
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Compañia
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Nombres
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Apellidos
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Edad
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Estaca
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    Barrio
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-white text-center mb-3 lg:text-2xl sm:text-xl">
            Cancelados
          </h2>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              {/* Encabezado de la tabla */}
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Compañia
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Nombres
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Apellidos
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Edad
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Estaca
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    Barrio
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
