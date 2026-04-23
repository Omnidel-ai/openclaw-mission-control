import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, db: "connected" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, db: "disconnected", error: err instanceof Error ? err.message : "unknown" },
      { status: 503 },
    );
  }
}
