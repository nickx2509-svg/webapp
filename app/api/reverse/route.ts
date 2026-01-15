import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coords" }, { status: 400 });
  }

  try {
    const result = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "my-next-app",
        },
      }
    );

    return NextResponse.json(result.data);
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
