"use server";
import Dough from "./dough";
import Link from "next/link";
import dotenv from "dotenv";
import axios from "axios";

//const dynamic = "force-dynamic";
dotenv.config();

function sumStats(data) {
  return data.reduce(
    (acc, curr) => {
      acc.registrados += curr.registrados;
      acc.pendientes += curr.pendientes;
      acc.total += curr.total;
      return acc;
    },
    { registrados: 0, pendientes: 0, total: 0 }
  );
}

async function fetchStats() {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/api/list/participante`
    );

    // axios automatically parses JSON responses
    const data = response.data;

    const stats = data.map((row) => ({
      compañia: row["compañia"],
      registrados: row["registrados"],
      pendientes: row["pendientes"],
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
          Indicadores en Bienvenida
        </h1>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.total}
                </h2>
                <p className="leading-relaxed text-white">
                  Participantes en Compañias
                </p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.registrados}
                </h2>
                <p className="leading-relaxed text-white">Registrados</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                  {sums.pendientes}
                </h2>
                <p className="leading-relaxed text-white">Pendientes</p>
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
      </div>
    </div>
  );
}

export default Page;
