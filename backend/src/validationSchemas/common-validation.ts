import { z } from "zod";

// Common validation for ID
export const idSchema = z.object({
    id: z.coerce.number().positive(),
});

// Common validation for pagination
export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
});