import { NextResponse } from "next/server";
import db from "@repo/db/client";

export async function GET() {
  return NextResponse.json({
    message: "hi there",
  });
}