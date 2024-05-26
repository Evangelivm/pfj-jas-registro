"use client";
import axios from "axios";
import { Toaster, toast } from "sonner";

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
      <div className="mb-10">
        <h2 className="text-white text-center mb-3 lg:text-2xl sm:text-xl">
          Resultados
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
                <td className="px-4 py-3 text-sm ">{result.compañia}</td>
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
    </>
  );
}

export default Result;
