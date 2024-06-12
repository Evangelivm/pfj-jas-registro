"use client";
import React, { useState, useEffect } from "react";
import Result from "./result";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Suspense } from "react";
import PartLoading from "./partloading";

function Barra({ part }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [partValue, setpartValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (inputValue) {
      // Filtrar sugerencias basadas en el valor de inputValue
      const filteredSuggestions = part.filter((item) =>
        item["name"].toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions.map((item) => item["name"]));
    } else {
      // Si inputValue está vacío, reiniciar las sugerencias
      setSuggestions([]);
    }
  }, [inputValue, part]);

  const handleSuggestionClick = (suggestion) => {
    // Establecer el valor del input con la sugerencia seleccionada
    setInputValue(suggestion);
    const id = part.findIndex((element) => element["name"] === suggestion);
    const numero = part[id]["id_part"];
    setpartValue(numero);
    // Vaciar la lista de sugerencias
    setSuggestions([]);
  };
  const handleClick = async () => {
    try {
      // Simulando datos del componente hijo
      const res = await axios.get(`api/part/${partValue}`);
      const result = res.data[0];
      // console.log(result);
      setResponseData(result);
      setShowResult(true);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error;
    }
  };
  const handleButtonClick = () => {
    if (!partValue) {
      toast.warning("Debe buscar un nombre primero");
    } else {
      handleClick();
    }
  };

  return (
    <>
      <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
        <div className="flex w-full justify-center items-end">
          <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
            <label htmlFor="dataname" className="leading-7 text-sm text-white">
              Nombres
            </label>
            <Toaster richColors position="top-center" />
            <form action="">
              <input
                type="text"
                id="dataname"
                name="dataname"
                value={inputValue}
                className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escriba para buscar...."
                autoCorrect="off"
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <ul className="bg-white rounded-md  absolute w-full">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}

              <input type="hidden" name="participante" value={partValue} />
            </form>
          </div>
          <button
            type="submit"
            className="inline-flex text-yellowFirst bg-redFirst border-0 py-2 px-6 focus:outline-none hover:bg-redSecond rounded text-lg hover:text-white"
            onClick={handleButtonClick}
          >
            Buscar
          </button>
        </div>
      </div>
      {showResult && (
        <Suspense fallback={<PartLoading />}>
          <div className="w-full mb-16 items-center text-center">
            <Result result={responseData} />
          </div>
        </Suspense>
      )}
    </>
  );
}

export default Barra;
