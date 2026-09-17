import api from "@/lib/axios";

export type SignupData = {
    email: string;
    password: string;
    confirm_password: string;
};

export const signup = async (data: SignupData) => {
    const response = await api.post("/signup", data);

    return response.data;
};

export const verifyCode = async (six_digit_code: string) => {
    const response = await api.post("/verify-code", {
        six_digit_code,
    });

    return response.data;
};

export const resendCode = async () => {
    const response = await api.post("/resend-code");

    return response.data;
};