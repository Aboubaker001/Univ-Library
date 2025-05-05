import { z } from "zod";
export const newBookSchema = z.object({
    title: z.string().min(3),
    edition: z.string(),
    publisher: z.string(),
    publicationYear: z.number(),
    pageCout: z.number().positive(),
    language: z.string(),
    digitalCopyUrl: z.string().url(),
    keywords: z.array(z.string()).min(1),
    authors: z.array(z.string()).min(1),
});

export const updateBookSchema = z.object({
    title: z.string().min(3).optional(),
    edition: z.string().optional(),
    publisher: z.string().optional(),
    publicationYear: z.number().optional(),
    pageCout: z.number().positive().optional(),
    language: z.string().optional(),
    coverUrl: z.string().url().optional(),
    digitalCopyUrl: z.string().url().optional(),
    keywords: z.array(z.string()).min(1).optional(),
    authors: z.array(z.string()).min(1).optional(),
    status : z.enum(["AVAILABLE","CHECKED_OUT","RESERVED","UNDER_MAINTENANCE","LOST"]).optional(),
});