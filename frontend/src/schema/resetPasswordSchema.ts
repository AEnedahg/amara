import { z } from "zod";

export const resetPasswordSchema = z.object({
    four_digit_code: z
        .string()
        .length(4, { message: "Code must be exaclty 4 digits" })
        .regex(/^\d{4}$/, { message: "Only numbers are allowed" }),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;