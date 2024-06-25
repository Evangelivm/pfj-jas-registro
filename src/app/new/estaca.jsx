"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function Estaca({ setEstac, setBarr }) {
  const [options, setOptions] = useState([]);
  const [selectedEstaca, setSelectedEstaca] = useState(null);
  const [subOptions, setSubOptions] = useState([]);
  const [active, setActive] = useState(true);

  // Fetch initial options
  useEffect(() => {
    axios
      .get("/api/estaca")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetch sub-options based on selected option
  useEffect(() => {
    if (selectedEstaca !== null) {
      axios
        .get(`/api/barrio/${selectedEstaca}/`)
        .then((response) => {
          setSubOptions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sub-options:", error);
        });
    }
  }, [selectedEstaca]);

  const handleEstacaChange = (event) => {
    const numEstaca = parseInt(event.target.value);
    setEstac(numEstaca);
    setSelectedEstaca(event.target.value);
    setActive(false);
  };

  const handleBarrioChange = (event) => {
    const numBarrio = parseInt(event.target.value);
    setBarr(numBarrio);
  };

  return (
    <>
      <div className="p-2 w-4/5 sm:w-1/2">
        <div className="relative">
          <label htmlFor="estaca" className="leading-7 text-sm text-white">
            Estaca
          </label>
          <select
            name="estaca"
            id="estaca"
            className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={handleEstacaChange}
            required
          >
            <option
              value=""
              className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
            >
              Selecciona una estaca
            </option>
            {options.map((option) => (
              <option
                key={option.est_id}
                value={option.est_id}
                className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
              >
                {option.estaca}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-2 w-4/5 sm:w-1/2">
        <div className="relative">
          <label htmlFor="barrio" className="leading-7 text-sm text-white">
            Barrio
          </label>
          <select
            name="barrio"
            id="barrio"
            className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            disabled={active}
            onChange={handleBarrioChange}
            required
          >
            <option
              value=""
              className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
            >
              Selecciona un barrio
            </option>
            {subOptions.map((subOption) => (
              <option
                key={subOption.id_barrio}
                value={subOption.id_barrio}
                className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
              >
                {subOption.barrio}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Estaca;
