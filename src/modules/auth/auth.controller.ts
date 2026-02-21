import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../shared/errors/api-error";
import {
  login as loginService,
  getCurrentUser,
  register as registerService,
} from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";
import { formatZodErrors } from "../../shared/utils/zod";

export async function register(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const result = registerSchema.safeParse(request.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      throw ApiError.badRequest(errors.join(", "));
    }

    const data = result.data;
    const serviceResult = await registerService(data);

    response.status(201).json(serviceResult);
  } catch (error) {
    next(error);
  }
}

export async function login(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const result = loginSchema.safeParse(request.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      throw ApiError.badRequest(errors.join(", "));
    }

    const data = result.data;
    const serviceResult = await loginService(data);

    response.status(200).json(serviceResult);
  } catch (error) {
    next(error);
  }
}

export async function logout(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    if (!request.user) {
      throw ApiError.unauthorized();
    }
    response.status(200).json({
      message: "Logout correcto. El cliente debe eliminar el token local.",
    });
  } catch (error) {
    next(error);
  }
}

export async function me(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    if (!request.user) {
      throw ApiError.unauthorized();
    }

    const user = await getCurrentUser(request.user.id);
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

