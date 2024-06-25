import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

// Recoje la informacion de toda la compañia
export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT a.compañia, SUM(CASE WHEN b.asistio = 'Si' THEN 1 ELSE 0 END) AS registrados, SUM(CASE WHEN b.asistio = 'No' THEN 1 ELSE 0 END) AS pendientes, COUNT(*) AS total FROM participante a JOIN asistencia b ON a.id_part = b.id_part WHERE a.tipo = ? GROUP BY a.compañia",
      [params.id]
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
