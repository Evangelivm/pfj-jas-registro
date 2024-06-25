const { z } = require("zod");

export const newSchema = z.object({
  nombres: z.string().min(2, { message: "No lo dejes vacio" }),
  apellidos: z.string().min(2, { message: "No lo dejes vacio" }),
  estaca: z.string().refine((estaca) => !isNaN(parseFloat(estaca)), {
    message: "No muevas esta info",
  }),
  barrio: z.string().refine((barrio) => !isNaN(parseFloat(barrio)), {
    message: "No muevas esta info",
  }),
  compañia: z.string().refine((compañia) => !isNaN(parseFloat(compañia)), {
    message: "No muevas esta info",
  }),
});
