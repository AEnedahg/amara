import { z } from 'zod';

export const forgotPasswordPasswordsSchema = z.object({
    password: z.string().min(8, {message: "Must be a minimum of 8 characters"})
        .regex(/[A-Z]/, {message: "Must contain capital letters"})
        .regex(/[0-9]/, {message: "Must contain numbers"})
        .regex(/[^a-zA-Z0-9]/, {message: "Must contain special characters"}),
    confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"]
})

export type forgotPasswordPasswordsSchemaType = z.infer<typeof forgotPasswordPasswordsSchema>