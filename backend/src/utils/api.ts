import  { type Request, type Response } from "express";
import { ZodSchema } from "zod";

// Function to handle repository errors and return the appropriate response
export const handleRepositoryErros = (e: Error, res: Response) => {
    if (e.name === "NotFoundError") {
        return res.status(404).json({ message: e.message });
    }
    else if (e.name === "InternalError") {
        return res.status(500).json({ message: e.message });
    }
    else {
        return res.status(500).json({ message: "Something went wrong." });
    }
}

// Function to parse the request body and return the data if it is valid
export const parseRequest = <T>(schema: ZodSchema<T>, req: Request, res: Response): T | null => {
    const parsed = schema.safeParse(req);

    if (!parsed.success) {
        res.status(400).json({ message: `Invalid request body: ${parsed.error.errors.map((err) => err.message).join(', ')}` });
        return null;
    }

    return parsed.data;
}