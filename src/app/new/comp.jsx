"use client";
// Compañia.js
import axios from "axios";
import { useState, useEffect } from "react";

function Compañia({ numComp, setComp }) {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    // Evitar hacer fetch cuando numComp es undefined o vacío
    if (!numComp) return;

    const fetchCompanias = async () => {
      try {
        const response = await axios.get(`/api/selcomp/${numComp}`);
        setComps(response.data);
      } catch (error) {
        console.error("Error fetching compañias:", error);
      }
    };

    fetchCompanias();
  }, [numComp]); // Solo ejecutar cuando numComp cambia

  const handleCompañiaChange = (e) => {
    const nuevaCompañia = e.target.value;
    const numCompañia = parseInt(nuevaCompañia);
    setComp(numCompañia);
  };

  return (
    <div className="p-2 w-4/5 sm:w-1/2">
      <div className="relative">
        <label htmlFor="compañia" className="leading-7 text-sm text-white">
          Compañia en base a la edad
        </label>
        <select
          name="compañia"
          id="compañia"
          className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
          required
          onChange={handleCompañiaChange}
        >
          <option
            value=""
            className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
          >
            Seleccione una compañia
          </option>
          {comps.map((comp) => (
            <option
              key={comp.compañia}
              value={comp.compañia}
              className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
            >
              C{comp.compañia} (Hombres: {comp.hombres} Mujeres: {comp.mujeres})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Compañia;
