import { ZodError } from "zod";

export function formatZodErrors(error: ZodError) {
  if (!error || !error.issues) return ["Error desconocido"];
  return error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(".") : "root";
    return `${path}: ${issue.message}`;
  });
}