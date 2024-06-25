import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT id_barrio, barrio FROM barrio WHERE estaca = ?",
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
