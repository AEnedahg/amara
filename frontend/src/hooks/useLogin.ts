import { useMutation } from "@tanstack/react-query";
import { login, type LoginData } from "@/lib/api/auth";

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginData) => login(data),
    });
};
