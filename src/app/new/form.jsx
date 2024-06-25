"use client";
// Form.js
import Edad from "./edad";
import Estaca from "./estaca";
import Compañia from "./comp";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import axios from "axios";

function Form() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [compañia, setCompañia] = useState("");
  const [estaca, setEstaca] = useState("");
  const [barrio, setBarrio] = useState("");
  const router = useRouter();
  const formRef = useRef(null);
  const [buttonblock, setbuttonblock] = useState(false);

  return (
    <>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <Toaster richColors position="top-center" />
        <form
          ref={formRef}
          onSubmit={async (e) => {
            e.preventDefault();
            //setSending(true);
            setbuttonblock(true);
            const formData = new FormData();
            // if (file1 === null) {
            formData.append("nombres", nombres);
            formData.append("apellidos", apellidos);
            formData.append("telefono", telefono);
            formData.append("sexo", sexo);
            formData.append("fechaNacimiento", fechaNacimiento);
            formData.append("edad", edad);
            formData.append("comp", compañia);
            formData.append("estaca", estaca);
            formData.append("barrio", barrio);
            const response = await fetch("/api/new", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            if (data.toast === "success") {
              toast.success("El participante fue registrado con exito");
              setbuttonblock(false);
              setNombres("");
              setApellidos("");
              setTelefono("");
              setSexo("");
              setFechaNacimiento("");
              setEdad("");
              setCompañia("");
              setEstaca("");
              setBarrio("");
            } else {
              toast.error(
                "Hubo un problema en el registro, intentelo nuevamente"
              );
              setbuttonblock(false);
            }
            router.refresh();
            formRef.current.reset();
            //console.log(data);
            //setImageResult(data.url);
            //setSending(false);
          }}
        >
          <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:-m-2">
            <div className="p-2 w-4/5 sm:w-1/2">
              <div className="relative">
                <label
                  htmlFor="nombres"
                  className="leading-7 text-sm text-white"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-2 w-4/5 sm:w-1/2">
              <div className="relative">
                <label
                  htmlFor="apellidos"
                  className="leading-7 text-sm text-white"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  required
                />
              </div>
            </div>
            <Edad
              initialFecha={fechaNacimiento}
              initialEdad={edad}
              setInitialFecha={setFechaNacimiento}
              setInitialEdad={setEdad} // Pasar la función para actualizar la edad
            />
            <div className="p-2 w-4/5 sm:w-1/2">
              <div className="relative">
                <label
                  htmlFor="telefono"
                  className="leading-7 text-sm text-white"
                >
                  Telefono (opcional)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Ejm. 987654321"
                  className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={telefono}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-4/5 sm:w-1/2">
              <div className="relative">
                <label htmlFor="sexo" className="leading-7 text-sm text-white">
                  Sexo
                </label>
                <select
                  name="sexo"
                  id="sexo"
                  className="w-full bg-gray-400 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-white text-base outline-none text-white py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  required
                >
                  <option
                    value=""
                    className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
                  >
                    Selecciona uno
                  </option>
                  <option
                    value="H"
                    className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
                  >
                    Hombre
                  </option>
                  <option
                    value="M"
                    className="py-2 px-3 hover:bg-gray-500 hover:text-white hover:rounded-md cursor-pointer rounded-md text-gray-700"
                  >
                    Mujer
                  </option>
                </select>
              </div>
            </div>
            <Estaca setEstac={setEstaca} setBarr={setBarrio} />
            <Compañia numComp={edad} setComp={setCompañia} />
            <div className="p-10 w-full">
              <button
                type="submit"
                className="flex mx-auto text-yellowFirst bg-redFirst border-0 py-2 px-8 focus:outline-none hover:bg-redSecond rounded text-lg hover:text-white"
                onClick={setbuttonblock(true)}
                disabled={buttonblock}
              >
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
``;
