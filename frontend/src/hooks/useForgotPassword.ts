import { useMutation } from "@tanstack/react-query";
import { forgotPassword, type ForgotPasswordData } from "@/lib/api/auth";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (data: ForgotPasswordData) => forgotPassword(data),
    });
};
