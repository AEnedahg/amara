import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "@/lib/api/auth";

export const useVerifyCode = () => {
    return useMutation({
        mutationFn: verifyCode,
    });
};
