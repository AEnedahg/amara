import api from "@/lib/axios";


export type ForgotPasswordData = {
    email: string;
};


export type SignupData = {
    email: string;
    password: string;
    confirm_password: string;
};

export type LoginData = {
    email: string;
    password: string;
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


export const login = async (data: LoginData) => {
    const response = await api.post("/login", data);

    return response.data;
};


export const forgotPassword = async (data: ForgotPasswordData) => {
    const response = await api.post("/forgot-password", data);

    return response.data;
};