"use client";

function Numeros({ sumas }) {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                {sumas.total}
              </h2>
              <p className="leading-relaxed text-white">
                Participantes en Compañias
              </p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                {sumas.confirmados}
              </h2>
              <p className="leading-relaxed text-white">Confirmados</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                {sumas.contactados}
              </h2>
              <p className="leading-relaxed text-white">Contactados</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellowFirst">
                {sumas.cancelados}
              </h2>
              <p className="leading-relaxed text-white">Cancelados</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Numeros;
