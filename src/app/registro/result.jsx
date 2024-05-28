"use client";
import axios from "axios";
import { Toaster, toast } from "sonner";

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function Result({ result }) {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const res = await axios.put(`api/part/${result.id_part}`);

      // Aquí puedes manejar la respuesta si es necesario
      console.log(res.data);
      toast.success(
        `Se marcó la asistencia de ${result.nombres} ${result.apellidos}`
      );
    } catch (error) {
      // Manejo de errores
      console.error("Error al enviar el formulario:", error);
    }
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <div>
        {isMobile() ? (
          <div className="mb-10 mx-8">
            <h2 className="text-white text-center mb-3 lg:text-2xl sm:text-xl">
              Resultados
            </h2>
            <div className="sm:w-2/3 w-full mx-auto overflow-auto">
              <table>
                <tbody>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl-lg">
                      Compañia
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.compañia}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Nombres
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.nombres}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Apellidos
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.apellidos}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Habitacion
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.habitacion}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Edad
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.edad}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Estaca
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.estaca}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-bl-lg">
                      Barrio
                    </th>
                    <td className="px-4 py-3 text-sm text-white">
                      {result.barrio}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-8" colSpan="2">
                      <button
                        className="text-white text-sm bg-redFirst border-0 py-3 px-10 focus:outline-none hover:bg-redSecond rounded"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Confirmar Asistencia
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <h2 className="text-white text-center mb-3 lg:text-2xl sm:text-xl">
              Resultados
            </h2>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
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
                      Habitacion
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
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                      Asistencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-white">
                    <td className="px-4 py-3 text-sm">{result.compañia}</td>
                    <td className="px-4 py-3 text-sm">{result.nombres}</td>
                    <td className="px-4 py-3 text-sm">{result.apellidos}</td>
                    <td className="px-4 py-3 text-sm">{result.habitacion}</td>
                    <td className="px-4 py-3 text-sm">{result.edad}</td>
                    <td className="px-4 py-3 text-sm">{result.estaca}</td>
                    <td className="px-4 py-3 text-sm">{result.barrio}</td>
                    <td className="px-4 py-3">
                      <button
                        className="text-white text-sm bg-redFirst border-0 py-1 px-4 focus:outline-none hover:bg-redSecond rounded"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Confirmar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Result;
