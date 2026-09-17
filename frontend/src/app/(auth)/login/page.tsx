"use client";

import AuthWrapper from "@/components/auth/AuthWrapper";
import HeadLine from "@/components/auth/HeadLine";
import EmailField from "@/components/auth/login/EmailField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/loginSchema";
import PasswordField from "@/components/auth/login/PasswordField";
import Button from "@/components/auth/Button";
import OrRegisterWith from "@/components/auth/OrRegisterWith";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const form = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const loginMutation = useLogin();

    const onSubmit = (data: loginSchemaType) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                router.push("/");
            },
        });
    };

    return (
        <AuthWrapper>
            <HeadLine
                hasArrow={true}
                linkto="/"
                heading="Login"
                para="Welcome back! Sign in and pick up right where you left off."
            />

            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <EmailField
                    register={form.register}
                    errors={form.formState.errors}
                    watch={form.watch}
                />

                <PasswordField
                    register={form.register}
                    errors={form.formState.errors}
                    watch={form.watch}
                />

                <Button
                    type="submit"
                    disabled={
                        !form.formState.isValid || loginMutation.isPending
                    }
                    isLoading={loginMutation.isPending}
                >
                    Login
                </Button>

                <OrRegisterWith />

                <GoogleButton linkHref="/">Sign in with Google</GoogleButton>

                <AuthFooter
                    optionText="Don't have an account?"
                    optionLinkText="Sign up"
                    optionLinkHref="/signup"
                />
            </form>
        </AuthWrapper>
    );
}
