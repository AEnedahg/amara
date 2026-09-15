import { z } from "zod";

export const confirmEmailSchema = z.object({
    six_digit_code: z
        .string()
        .length(6, { message: "Code must be exaclty 6 digits" })
        .regex(/^\d{6}$/, { message: "Only numbers are allowed" }),
});

export type confirmEmailSchemaType = z.infer<typeof confirmEmailSchema>;