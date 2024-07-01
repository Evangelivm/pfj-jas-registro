import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function GET(request, { params }) {
  try {
    const edad = params.id; // Suponiendo que params.id contiene el valor de la edad que deseas consultar

    const result = await conn.query(
      "SELECT a.compañia, SUM(CASE WHEN a.sexo = 'H' THEN 1 ELSE 0 END) AS hombres, SUM(CASE WHEN a.sexo = 'M' THEN 1 ELSE 0 END) AS mujeres FROM participante a JOIN asistencia b ON a.id_part = b.id_part WHERE a.compañia IN (SELECT compañia FROM participante WHERE  edad = ? ) AND  a.tipo = 'participante' AND b.asistio = 'Si' GROUP BY a.compañia ORDER BY hombres DESC, mujeres DESC;",
      [edad] // Pasando el mismo parámetro para ambas edades
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "No existe",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
