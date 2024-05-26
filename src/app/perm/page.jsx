"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { name: "Compañia 1" },
  { name: "Compañia 2" },
  { name: "Compañia 3" },
  { name: "Compañia 4" },
  { name: "Compañia 5" },
  { name: "Compañia 6" },
];

function SelectListbox() {
  const [selected, setSelected] = useState(people[0]);
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellowFirst">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}

function page() {
  return (
    <div className="bg-blueFirst min-h-screen ">
      <div className="container px-5 py-24 mx-auto min-h-screen">
        <h1 className="text-white text-center lg:text-3xl sm:text-2xl">
          Permuta de Participantes
        </h1>
        <div className="container mx-auto lg:px-10 py-24 sm:p-19 min-h-full">
          <div className="grid grid-flow-row grid-cols-9 grid-rows-5 gap-4">
            <div className="grid  col-start-2 col-span-2 gap-4">
              <h2 className="grid col-span-3 text-white text-center text-2xl mb-3">
                Origen
              </h2>
              <label
                htmlFor="sel2"
                className="grid col-span-3 text-white text-center"
              >
                Selecciona una compañia:
              </label>
              <div className=" grid row-start-3 col-start-2">
                <SelectListbox />
              </div>
            </div>
            <div className="grid row-start-2 row-span-4 col-span-4 text-sm rounded-lg border-8 border-yellowFirst">
              <select multiple id="sel2" name="sellist2">
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
              </select>
            </div>
            <div className="grid  col-start-7 col-span-2 gap-4">
              <h2 className="grid col-span-3 text-white text-center text-2xl mb-3">
                Destino
              </h2>
              <label
                htmlFor="sel2"
                className="grid col-span-3 text-white text-center"
              >
                Selecciona una compañia:
              </label>
              <div className=" grid row-start-3 col-start-2">
                <SelectListbox />
              </div>
            </div>
            <div className="grid row-start-2 col-start-6 row-span-4 col-span-4 text-sm rounded-lg border-8 border-yellowFirst">
              <select multiple id="sel2" name="sellist2">
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
                <option className="p-2">
                  (H) Devy Jared Salomon Rondon (Santa Clara - Carapongo)
                </option>
              </select>
            </div>
            <div className="grid row-start-3 col-start-5 grid-rows-2 gap-4">
              <button className="inline-flex text-yellowFirst bg-redFirst border-0 py-2 px-2 focus:outline-none hover:bg-redSecond rounded text-lg m-2  justify-center">
                {">>"}
              </button>
              <button className="inline-flex text-yellowFirst bg-redFirst border-0 py-2 px-2 focus:outline-none hover:bg-redSecond rounded text-lg m-2  justify-center">
                {"<<"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
