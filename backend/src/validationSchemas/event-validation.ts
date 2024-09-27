import { z } from 'zod';
import { idSchema, paginationSchema } from './common-validation';

// Schema for pagination validation
export const getEventRequestsSchema = z.object({
  query: paginationSchema,
});

// Schema for event validation by its ID
export const getEventRequestSchema = z.object({
  params: idSchema,
});

// Schema for creating an event, validating its body
export const createEventRequestSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(1024).optional(),
    from: z.coerce.date(),
    to: z.coerce.date(),
  }),
});

// Schema for updating an event, validating its body and ID
export const updateEventRequestSchema = z.object({
  params: idSchema,
  body: z.object({
    name: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(1024).optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  }),
});

// Schema for deleting an event, validating its ID
export const deleteEventRequestSchema = z.object({
  params: idSchema,
});