import * as z from "zod";

// Schema for user name validation
export const userNameSchema = z.object({
    userName: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be less than 50 characters" })
});

// Schema for creating a new session
export const createSessionSchema = z.object({
    sessionName: z.string().min(3, { message: "Session name must be at least 3 characters" }).max(50, { message: "Session name must be less than 50 characters" }),
    isPrivate: z.boolean(),
    maxParticipants: z.number().int().min(2, { message: "Must allow at least 2 participants" }).max(50, { message: "Maximum 50 participants allowed" }),
    sessionType: z.enum(["standard", "timed", "persistent"], {
        errorMap: () => ({ message: "Please select a valid session type" })
    }),
    userName: z.string().min(2, { message: "Name must be at least 2 characters" })
});

// Schema for joining an existing session
export const joinSessionSchema = z.object({
    joinCode: z.string().min(6, { message: "Session code must be at least 6 characters" }).max(20, { message: "Session code must be less than 20 characters" }),
    userName: z.string().min(2, { message: "Name must be at least 2 characters" })
});

// Export TypeScript types inferred from schemas
export type UserNameFormValues = z.infer<typeof userNameSchema>;
export type CreateSessionFormValues = z.infer<typeof createSessionSchema>;
export type JoinSessionFormValues = z.infer<typeof joinSessionSchema>;

// Session types as a constant for reuse
export const SESSION_TYPES = ["standard", "timed", "persistent"] as const;
export type SessionType = typeof SESSION_TYPES[number];