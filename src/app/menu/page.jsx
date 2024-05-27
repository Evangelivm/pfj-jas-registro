import { conn } from "../libs/mysql";
import Linker from "./linker";

async function loadPages() {
  try {
    const data = await conn.query("SELECT DISTINCT compañia FROM participante");
    // const jsonData = data.map((row) => ({ compañia: row["compañia"] }));
    const jsonData = data[0];
    return jsonData;
  } catch (error) {
    console.error("Error loading pages:", error);
    throw error;
  }
}

async function NewPage() {
  const pages = await loadPages();
  return (
    <div className="bg-blueFirst min-h-screen ">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-white text-center lg:text-3xl sm:text-2xl">
          Seleccione su Compañia
        </h1>
        <div className="container mx-auto lg:px-24 py-24 sm:p-19 ">
          <div className="grid grid-flow-row gap-4 md:grid-cols-6">
            {pages.map((page) => (
              <Linker comp={page} key={page.compañia} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
