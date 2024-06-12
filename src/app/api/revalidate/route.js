import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidatePath("/stats");

  return NextResponse.json({ revalidated: true });
}
