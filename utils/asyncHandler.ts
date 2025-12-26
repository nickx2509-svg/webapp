import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

type AsyncFn<T = unknown> = () => Promise<T>;

export const asyncHandler =
  (fn: AsyncFn) =>
  async () => {
    try {
      return await fn();
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            errors: error.errors,
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
