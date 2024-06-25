import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";
import { z } from "zod";

const newSchema = z.object({
  nombres: z.string().min(2).trim(),
  apellidos: z.string().min(2).trim(),
  telefono: z.string().min(6).trim(),
  sexo: z.string().max(1),
  fechaNacimiento: z.string().date(),
  edad: z.string().min(2),
  comp: z.string().min(1).max(2),
  estaca: z.string().min(1).max(2),
  barrio: z.string().min(1).max(2),
});

//   compañia: z.number().gte(1).lte(2),
//   estaca: z.number().gte(1).lte(2),
//   barrio: z.number().gte(1).lte(2),
export async function POST(request, { params }) {
  try {
    // Obtener los datos del formulario
    const data = await request.formData();

    // Convertir formData a un objeto plano
    const dataObj = Object.fromEntries(data.entries());

    // Validar los datos usando Zod (asegúrate de que newSchema esté definido correctamente)
    const resultado = newSchema.safeParse(dataObj);

    // Convertir la fecha de nacimiento a un objeto Date (asegúrate de que resultado.data.fechaNacimiento sea una fecha válida)
    const fechaNacimiento = new Date(resultado.data.fechaNacimiento);
    const formattedDate = fechaNacimiento.toISOString().split("T")[0];
    //console.log(formattedDate);
    // Definir otras variables a insertar en la base de datos
    const edad = parseInt(resultado.data.edad);
    const estaca = parseInt(resultado.data.estaca);
    const barrio = parseInt(resultado.data.barrio);
    const comp = parseInt(resultado.data.comp);
    const estado = 1;
    const tipo = "Participante";
    const habitacion = 3;

    // Si la validación de Zod falla, devolver un error 400
    if (!resultado.success) {
      return NextResponse.json("No se subió correctamente", {
        status: 400,
        toast: "error",
      });
    }
    // Consulta preparada para evitar la inyección SQL
    const query_one = `
      INSERT INTO participante (apellidos, nombres, telefono, sexo, cumpleaños, edad, compañia, estaca, barrio, estado, tipo, habitacion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const query_two = `
      INSERT INTO asistencia (id_part, ficha_firmada, participacion, asistio)
    VALUES ((SELECT LAST_INSERT_ID()), 'Si', 3, 'Si');
    `;
    const begin = `BEGIN`;

    const end = `COMMIT`;

    const start = await conn.query(begin);
    // Ejecutar la consulta SQL con los valores correspondientes
    const result1 = await conn.query(query_one, [
      resultado.data.apellidos,
      resultado.data.nombres,
      resultado.data.telefono,
      resultado.data.sexo,
      formattedDate,
      edad,
      comp,
      estaca,
      barrio,
      estado,
      tipo,
      habitacion,
    ]);

    const result2 = await conn.query(query_two);
    const finish = await conn.query(end);

    // Si todo sale bien, devolver un mensaje de éxito 200
    return NextResponse.json(
      {
        toast: "success",
        message: "Datos actualizados correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Si hay algún error, devolver un mensaje de error 500
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// const nombres = data.get("nombres");
// const apellidos = data.get("apellidos");
// const telefono = data.get("apellidos");
// const sexo = data.get("apellidos");
// const fechaNacimiento = data.get("apellidos");
// const edad = data.get("apellidos");
// const compañia = data.get("apellidos");
// const estaca = data.get("apellidos");
// const barrio = data.get("apellidos");
