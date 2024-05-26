const { z } = require("zod");

export const partSchema = z.object({
  infMed: z.string().min(2, { message: "Si no hay cambios, no lo borres" }),
  infAlim: z.string().min(2, { message: "Si no hay cambios, no lo borres" }),
  part: z.string().refine((part) => !isNaN(parseFloat(part)), {
    message: "No muevas esta info",
  }),
  id_part: z.string().refine((id_part) => !isNaN(parseFloat(id_part)), {
    message: "No muevas esta info",
  }),
  dieta: z.boolean({
    required_error: "dieta es requerido",
    invalid_type_error: "dieta debe ser boolean",
  }),
});
