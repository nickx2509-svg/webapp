import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./ApiError";

export const asyncHandler =
  (handler: (req: NextRequest) => Promise<Response>) =>
  async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          { status: error.statusCode }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  };
