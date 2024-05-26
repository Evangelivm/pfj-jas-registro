"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partSchema } from "@/valid/partSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
import dotenv from "dotenv";
import { Toaster, toast } from "sonner";

dotenv.config();

const ContactoTabla = ({ titulo, nombre, telefono }) => {
  return (
    <table className="table-auto w-50 whitespace-no-wrap mx-auto">
      <thead>
        <tr>
          <th
            className="bg-blueFirst rounded-tl rounded-tr text-center text-gray-200"
            colSpan="3"
          >
            {titulo}
          </th>
        </tr>
        <tr>
          <th className="text-center px-2  title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-bl">
            Nombres
          </th>
          <th className="text-center px-2 py-1 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
            Telefono
          </th>
          <th className="text-center px-2 py-1 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
            Whatsapp
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-2 py-3 text-sm text-center text-gray-900">
            {nombre}
          </td>
          <td className="px-2 py-3 text-sm text-center text-blue-500">
            <a href={`tel:+51${telefono}`}>{telefono}</a>
          </td>
          <td className="px-2 py-3 text-sm text-center text-gray-900">
            <a
              className="text-blue-500 text-sm"
              href={`https://wa.me/+51${telefono}`}
            >
              Click para acceder
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// function BotonAsis({ part, register, handleSubmit }) {
//   const [estadoPart, setEstadoPart] = useState(part);
//   const [pressedButton, setPressedButton] = useState(null);

//   // Esta función se ejecuta solo una vez al renderizar el componente
//   // Puedes usar useEffect si necesitas ejecutar código en cada cambio de "part"
//   useState(() => {
//     if (part === 1) {
//       setEstadoPart("1");
//       setPressedButton("cancelado");
//     } else if (part === 2) {
//       setEstadoPart("2");
//       setPressedButton("contactado");
//     } else if (part === 3) {
//       setEstadoPart("3");
//       setPressedButton("confirmado");
//     }
//   }, [part]);

//   const handleContactado = () => {
//     setEstadoPart("2");
//     setPressedButton("contactado");
//   };

//   const handleConfirmado = () => {
//     setEstadoPart("3");
//     setPressedButton("confirmado");
//   };

//   const handleCancelado = () => {
//     setEstadoPart("1");
//     setPressedButton("cancelado");
//   };

//   return (
//     <>
//       <div className="flex justify-evenly py-3">
//         <button
//           type="button"
//           className={`border ${
//             pressedButton === "contactado"
//               ? "bg-yellow-600 text-white"
//               : "border-yellow-600 hover:bg-yellow-600 hover:text-white bg-white text-yellow-600"
//           } font-bold py-2 px-4 rounded text-sm`}
//           onClick={handleContactado}
//         >
//           Contactado
//         </button>
//         <button
//           type="button"
//           className={`border ${
//             pressedButton === "confirmado"
//               ? "bg-green-600 text-white"
//               : "border-green-600 hover:bg-green-600 hover:text-white bg-white text-green-600"
//           } font-bold py-2 px-4 rounded text-sm`}
//           onClick={handleConfirmado}
//         >
//           Confirmado
//         </button>
//         <button
//           type="button"
//           className={`border ${
//             pressedButton === "cancelado"
//               ? "bg-red-500 text-white"
//               : "border-red-500 hover:bg-red-500 hover:text-white bg-white text-red-500"
//           } font-bold py-2 px-4 rounded text-sm`}
//           onClick={handleCancelado}
//         >
//           Cancelado
//         </button>
//       </div>
//       <input type="hidden" value={estadoPart} {...register("part")} />
//     </>
//   );
// }

export default function MyModal({
  id_part,
  nombres,
  apellidos,
  edad,
  estaca,
  barrio,
  telefono,
  nom_c1,
  telef_c1,
  nom_c2,
  telef_c2,
  participacion,
  inf_med,
  inf_alim,
  dieta,
}) {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    // Verificar si la dieta es "Si" y actualizar el estado de la checkbox
    if (dieta === "Si") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [dieta]);

  let [isOpen, setIsOpen] = useState(false);
  const nombreCompleto = nombres + " " + apellidos;
  const telSinEspacio = num(telefono);
  const telC1SinEspacio = num(telef_c1);
  const telC2SinEspacio = num(telef_c2);
  const tieneContacto1 = telC1SinEspacio && telC1SinEspacio.trim().length > 0;
  const tieneContacto2 = telC2SinEspacio && telC2SinEspacio.trim().length > 0;
  const capNom1 = capitalizarNombre(nom_c1);
  const capNom2 = capitalizarNombre(nom_c2);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(partSchema),
  });
  const [estadoPart, setEstadoPart] = useState(participacion);
  const [pressedButton, setPressedButton] = useState(null);
  const router = useRouter();

  useState(() => {
    if (participacion === 1) {
      setEstadoPart("1");
      setPressedButton("cancelado");
    } else if (participacion === 2) {
      setEstadoPart("2");
      setPressedButton("contactado");
    } else if (participacion === 3) {
      setEstadoPart("3");
      setPressedButton("confirmado");
    }
  }, [participacion]);

  const handleContactado = () => {
    setEstadoPart("2");
    setPressedButton("contactado");
    setValue("part", "2"); // Actualiza el valor de "part" a "2"
  };

  const handleConfirmado = () => {
    setEstadoPart("3");
    setPressedButton("confirmado");
    setValue("part", "3"); // Actualiza el valor de "part" a "3"
  };

  const handleCancelado = () => {
    setEstadoPart("1");
    setPressedButton("cancelado");
    setValue("part", "1"); // Actualiza el valor de "part" a "1"
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function num(numero) {
    // Elimina espacios en blanco y signos +
    let numNuevo = numero.replace(/[\s+]/g, "");

    // Verifica si el primer dígito es un 5
    if (numNuevo.charAt(0) === "51") {
      // Elimina el primer dígito si es un 5
      numNuevo = numNuevo.slice(1);
    }

    // Encuentra la posición del primer "9" en la cadena
    const indexNine = numNuevo.indexOf("9");

    // Si se encuentra un "9", elimina desde el primer dígito hasta el "9" (inclusive)
    if (indexNine !== -1) {
      numNuevo = numNuevo.slice(indexNine);
    }

    return numNuevo;
  }
  function capitalizarNombre(nombre) {
    // Convertir todo el texto a minúsculas y dividir por espacios
    const palabras = nombre.toLowerCase().split(" ");

    // Capitalizar la primera letra de cada palabra
    const palabrasCapitalizadas = palabras.map((palabra) => {
      // Capitalizar la primera letra de la palabra
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });

    // Unir las palabras capitalizadas de nuevo en una cadena
    return palabrasCapitalizadas.join(" ");
  }

  return (
    <>
      <button
        className={`text-white text-sm bg-redFirst border-0 py-1 px-4 focus:outline-none hover:bg-redSecond rounded`}
        type="button"
        onClick={openModal}
      >
        Editar
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {nombreCompleto} ({edad})
                  </Dialog.Title>
                  <Toaster richColors position="top-center" />
                  <div className="mt-2 flex flex-nowrap text-center">
                    <div className="mx-4">
                      <h3 className="text-black">Estaca</h3>
                      <p className="text-sm text-gray-500">{estaca}</p>
                    </div>
                    <div className="mx-4">
                      <h3 className="text-black">Unidad</h3>
                      <p className="text-sm text-gray-500">{barrio}</p>
                    </div>
                    <div className="mb-3 mx-4">
                      <h3 className="text-black">Llamar</h3>
                      <a
                        className="text-sm text-blue-500"
                        href={`tel:+51${telSinEspacio}`}
                      >
                        {telSinEspacio}
                      </a>
                    </div>
                    <div className="mb-3 mx-4">
                      <h3 className="text-black">Whatsapp</h3>
                      <a
                        className="text-blue-500 text-sm"
                        href={`https://wa.me/+51${telSinEspacio}`}
                      >
                        Click para acceder
                      </a>
                    </div>
                  </div>
                  <div>
                    {tieneContacto1 && (
                      <ContactoTabla
                        titulo={tieneContacto2 ? "Contacto 1" : "Contacto"}
                        nombre={capNom1}
                        telefono={telC1SinEspacio}
                      />
                    )}
                    {!tieneContacto1 && tieneContacto2 && (
                      <ContactoTabla
                        titulo="Contacto"
                        nombre={capNom2}
                        telefono={telC2SinEspacio}
                      />
                    )}
                    {tieneContacto2 && tieneContacto1 && (
                      <ContactoTabla
                        titulo="Contacto 2"
                        nombre={capNom2}
                        telefono={telC2SinEspacio}
                      />
                    )}
                  </div>
                  {/* Formulario */}
                  <form
                    onSubmit={handleSubmit(async (data) => {
                      // console.log(data);
                      const res = await axios.put("/api/comp/" + id_part, data);
                      router.refresh();
                    })}
                  >
                    {/* <BotonAsis
                      part={participacion}
                      handleSubmit={handleSubmit}
                      register={register}
                    /> */}

                    <div className="flex justify-evenly py-3">
                      <button
                        type="button"
                        className={`border ${
                          pressedButton === "contactado"
                            ? "bg-yellow-600 text-white"
                            : "border-yellow-600 hover:bg-yellow-600 hover:text-white bg-white text-yellow-600"
                        } font-bold py-2 px-4 rounded text-sm`}
                        onClick={handleContactado}
                      >
                        Contactado
                      </button>
                      <button
                        type="button"
                        className={`border ${
                          pressedButton === "confirmado"
                            ? "bg-green-600 text-white"
                            : "border-green-600 hover:bg-green-600 hover:text-white bg-white text-green-600"
                        } font-bold py-2 px-4 rounded text-sm`}
                        onClick={handleConfirmado}
                      >
                        Confirmado
                      </button>
                      <button
                        type="button"
                        className={`border ${
                          pressedButton === "cancelado"
                            ? "bg-red-500 text-white"
                            : "border-red-500 hover:bg-red-500 hover:text-white bg-white text-red-500"
                        } font-bold py-2 px-4 rounded text-sm`}
                        onClick={handleCancelado}
                      >
                        Cancelado
                      </button>
                    </div>
                    <input
                      type="hidden"
                      value={estadoPart}
                      {...register("part")}
                    />
                    {/* Fin del formulario */}
                    <div>
                      <hr className="my-4" />
                      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                        Información Médica
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-black sm:text-sm "
                        defaultValue={inf_med}
                        {...register("infMed")}
                      />
                      {errors.infMed?.message && (
                        <p className="block text-sm font-medium leading-6 text-red-500 mb-2">
                          {errors.infMed?.message}
                        </p>
                      )}
                      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                        Información Alimenticia
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-black sm:text-sm "
                        defaultValue={inf_alim}
                        {...register("infAlim")}
                      />
                      {errors.infAlim?.message && (
                        <p className="block text-sm font-medium leading-6 text-red-500 mb-2">
                          {errors.infAlim?.message}
                        </p>
                      )}
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            id="dieta"
                            name="dieta"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            defaultChecked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            {...register("dieta")}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label className="font-medium text-gray-900">
                            Necesita dieta
                          </label>
                          <p className="text-gray-500">
                            Solo marcar si lo indica los padres
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      value={id_part}
                      {...register("id_part")}
                    />
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          if (!errors.length) {
                            closeModal;
                          }
                          toast.success("Se guardaron los cambios");
                        }}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
