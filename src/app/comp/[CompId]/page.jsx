"use server"
import axios from "axios";
import MyModal from "./modal";
import dotenv from "dotenv";

dotenv.config();

async function loadProducts(number) {
  if (!process.env.API_BASE_URL) {
    return null;
  }
  const { data } = await axios.get(
    `${process.env.API_BASE_URL}/api/comp/${number}`
  );

  return data;
}

const Indicador = ({ participacion }) => {
  let colorClass, text, ringColor, colorTextClass;

  switch (participacion) {
    case 0:
      colorClass = "bg-gray-500";
      colorTextClass = "text-gray-300";
      ringColor = "ring-gray-500/10";
      text = "Pendiente";
      break;
    case 1:
      colorClass = "bg-red-500";
      colorTextClass = "text-red-300";
      ringColor = "ring-red-500/10";
      text = "Cancelado";
      break;
    case 2:
      colorClass = "bg-yellow-500";
      colorTextClass = "text-yellow-300";
      ringColor = "ring-yellow-500/10";
      text = "Contactado";
      break;
    case 3:
      colorClass = "bg-green-500";
      colorTextClass = "text-green-300";
      ringColor = "ring-green-500/10";
      text = "Confirmado";
      break;
  }

  return (
    <span
      className={`inline-flex items-center rounded-md ${colorClass} bg-opacity-30 px-2 py-1 text-xs font-medium ${colorTextClass} ring-1 ring-inset ${ringColor}`}
    >
      {text}
    </span>
  );
};

async function Compañia({ params }) {
  const parts = await loadProducts(params.CompId);
  if (parts == null) {
    return (
      <>
        <h1>No data</h1>
      </>
    );
  }
  const companyNumber = parts.length > 0 ? parts[0].compañia : "";
  const hombres = parts.filter((part) => part.sexo === "H");
  const mujeres = parts.filter((part) => part.sexo === "M");

  return (
    <>
      <div className="bg-blueFirst min-h-screen">
        <section className="text-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
              <h1 className="sm:text-4xl text-3xl  text-center font-medium title-font mb-3 text-white">
                Compañia {companyNumber}
              </h1>
            </div>
            {/* Tabla para hombres */}
            <div className="mb-10">
              <h2 className="sm:text-2xl text-3xl font-medium title-font mb-4 text-white text-center">
                Hombres
              </h2>
              <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  {/* Encabezado de la tabla */}
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
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
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        Barrio
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                        Participacion
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                    </tr>
                  </thead>
                  {/* Cuerpo de la tabla */}
                  <tbody key={parts.id_part}>
                    {hombres.map((part, index) => (
                      <tr key={part.id_part}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0
                              ? ""
                              : "border-t-2 border-gray-200 text-sm"
                          }`}
                        >
                          {part.nombres}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0
                              ? ""
                              : "border-t-2 border-gray-200 text-sm"
                          }`}
                        >
                          {part.apellidos}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0
                              ? ""
                              : "border-t-2 border-gray-200 text-sm"
                          }`}
                        >
                          {part.edad}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0
                              ? ""
                              : "border-t-2 border-gray-200 text-sm"
                          }`}
                        >
                          {part.estaca}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0
                              ? ""
                              : "border-t-2 border-gray-200 text-sm"
                          }`}
                        >
                          {part.barrio}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0
                              ? ""
                              : "border-t-2 border-gray-200 text-sm"
                          }`}
                        >
                          <Indicador participacion={part.participacion} />
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          <MyModal
                            id_part={part.id_part}
                            nombres={part.nombres}
                            apellidos={part.apellidos}
                            estaca={part.estaca}
                            barrio={part.barrio}
                            edad={part.edad}
                            telefono={part.telefono}
                            nom_c1={part.nom_c1}
                            telef_c1={part.telef_c1}
                            nom_c2={part.nom_c2}
                            telef_c2={part.telef_c2}
                            participacion={part.participacion}
                            inf_med={part.inf_med}
                            inf_alim={part.inf_alim}
                            dieta={part.dieta}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Tabla para mujeres */}
            <div className="mb-10">
              <h2 className="sm:text-2xl text-3xl font-medium title-font mb-4 text-white text-center">
                Mujeres
              </h2>
              <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  {/* Encabezado de la tabla */}
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
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
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        Barrio
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                        Participacion
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                    </tr>
                  </thead>
                  {/* Cuerpo de la tabla */}
                  <tbody key={parts.id_part}>
                    {mujeres.map((part, index) => (
                      <tr key={part.id_part}>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          {part.nombres}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          {part.apellidos}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          {part.edad}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          {part.estaca}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          {part.barrio}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          <Indicador participacion={part.participacion} />
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            index === 0 ? "" : "border-t-2 border-gray-200"
                          }`}
                        >
                          <MyModal
                            id_part={part.id_part}
                            nombres={part.nombres}
                            apellidos={part.apellidos}
                            estaca={part.estaca}
                            barrio={part.barrio}
                            edad={part.edad}
                            telefono={part.telefono}
                            nom_c1={part.nom_c1}
                            telef_c1={part.telef_c1}
                            nom_c2={part.nom_c2}
                            telef_c2={part.telef_c2}
                            participacion={part.participacion}
                            inf_med={part.inf_med}
                            inf_alim={part.inf_alim}
                            dieta={part.dieta}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Compañia;
