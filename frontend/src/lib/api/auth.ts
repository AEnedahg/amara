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
