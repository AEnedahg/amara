import { useMutation } from "@tanstack/react-query";
import { resendCode } from "@/lib/api/auth";

export const useResendCode = () => {
    return useMutation({
        mutationFn: resendCode,
    });
};
