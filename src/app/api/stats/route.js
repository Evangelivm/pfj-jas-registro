import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

// Recoje la informacion de toda la compañia
export async function GET() {
  try {
    const result = await conn.query(
      "SELECT a.compañia, SUM(CASE WHEN b.participacion = 3 THEN 1 ELSE 0 END) AS confirmados, SUM(CASE WHEN b.participacion = 2 THEN 1 ELSE 0 END) AS contactados, SUM(CASE WHEN b.participacion = 1 THEN 1 ELSE 0 END) AS cancelados, COUNT(*) AS total FROM participante a JOIN asistencia b ON a.id_part = b.id_part WHERE a.tipo = 'participante' GROUP BY a.compañia;"
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
