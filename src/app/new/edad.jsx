"use client";
// Edad.js
import { useState, useEffect } from "react";

function Edad({ initialFecha, initialEdad, setInitialFecha, setInitialEdad }) {
  const [fechaNacimiento, setFechaNacimiento] = useState(initialFecha);
  const [edad, setEdad] = useState(initialEdad);

  // Actualiza el estado local al cambiar las props iniciales
  useEffect(() => {
    setFechaNacimiento(initialFecha);
    setEdad(initialEdad);
  }, [initialFecha, initialEdad]);

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  useEffect(() => {
    if (fechaNacimiento) {
      const nuevaEdad = calcularEdad(fechaNacimiento);
      setEdad(nuevaEdad);
      // Actualizar la edad en el componente Form
      setInitialEdad(nuevaEdad); // Pasar la nueva edad al componente Form
    }
  }, [fechaNacimiento, setInitialEdad]);

  const handleFechaNacimientoChange = (e) => {
    const nuevaFecha = e.target.value;
    setFechaNacimiento(nuevaFecha);
    // Actualizar la fecha de nacimiento en el componente Form
    setInitialFecha(nuevaFecha); // Pasar la nueva fecha al componente Form
  };

  return (
    <>
      <div className="p-2 w-4/5 sm:w-1/2">
        <div className="relative">
          <label htmlFor="cumpleaños" className="leading-7 text-sm text-white">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="cumpleaños"
            name="cumpleaños"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-white"
            value={fechaNacimiento}
            onChange={handleFechaNacimientoChange}
            required
          />
        </div>
      </div>
      <div className="p-2 w-4/5 sm:w-1/2">
        <div className="relative">
          <label htmlFor="edad" className="leading-7 text-sm text-white">
            Edad (Se completa solo)
          </label>
          <input
            type="text"
            id="edad"
            name="edad"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            disabled
            value={edad}
            required
          />
        </div>
      </div>
    </>
  );
}

export default Edad;
