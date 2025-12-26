import { ApiError } from "./ApiError";

type AsyncHandlerFn<T = unknown> = (...args: unknown[]) => Promise<T>;

export const asyncHandler =
  (fn: AsyncHandlerFn) =>
  async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(500, error.message);
      }

      throw new ApiError(500, "Internal Server Error");
    }
  };
