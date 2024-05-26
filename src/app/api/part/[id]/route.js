import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

// Recoje la informacion del participante
export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT a.id_part, b.compañia, a.nombres, a.apellidos, c.habitacion, a.edad, d.estaca, e.barrio FROM participante a JOIN comp b ON a.`compañia`=b.comp_id JOIN habitacion c ON a.habitacion = c.habit_id JOIN estaca d ON a.estaca = d.est_id JOIN barrio e ON a.barrio = e.id_barrio WHERE a.id_part = ?",
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

export async function PUT(request, { params }) {
  try {
    // Consulta preparada para evitar la inyección SQL
    const query = `UPDATE asistencia  SET asistio = "Si" WHERE id_part = ?`;

    const result = await conn.query(query, [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Datos no actualizados",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Datos actualizados correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
