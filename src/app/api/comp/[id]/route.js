import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";
import { z } from "zod";

// Recoje la informacion de toda la compañia
export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT a.id_part, a.apellidos, a.nombres, a.edad, b.estaca, c.barrio, a.telefono, a.sexo, a.estado, a.compañia, a.habitacion, a.nom_c1, a.telef_c1, a.nom_c2, a.telef_c2, d.participacion, e.inf_med, e.inf_alim, e.dieta FROM participante a JOIN estaca b ON a.estaca = b.est_id JOIN barrio c ON a.barrio = c.id_barrio JOIN asistencia d ON a.id_part = d.id_part JOIN infor_med e ON a.id_part = e.id_part WHERE a.tipo = 'Participante' AND a.compañia = ?",
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

const participSchema = z.object({
  dieta: z.boolean(),
  id_part: z.string().min(1).max(3),
  infAlim: z.string().min(2),
  infMed: z.string().min(2),
  part: z.string().max(1),
});

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const resultado = participSchema.safeParse(data);

    if (!resultado.success) {
      return NextResponse.json(result.error, { status: 400 });
    }

    // Consulta preparada para evitar la inyección SQL
    const query = `
      UPDATE asistencia AS a 
      JOIN infor_med AS b ON a.id_part = b.id_part 
      SET a.participacion = ?, b.inf_med = ?, b.inf_alim = ?, b.dieta = ? 
      WHERE a.id_part = ?
    `;

    const diet = resultado.data.dieta ? "Si" : "No";

    const result = await conn.query(query, [
      resultado.data.part,
      resultado.data.infMed,
      resultado.data.infAlim,
      diet,
      params.id,
    ]);

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
