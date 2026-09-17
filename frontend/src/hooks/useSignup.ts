import { useMutation } from "@tanstack/react-query";
import { signup, type SignupData } from "@/lib/api/auth";

export const useSignup = () => {
    return useMutation({
        mutationFn: (data: SignupData) => signup(data),
    });
};
