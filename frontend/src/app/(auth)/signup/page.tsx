"use client";

import AuthWrapper from "@/components/auth/AuthWrapper";
import HeadLine from "@/components/auth/HeadLine";
import EmailField from "@/components/auth/signup/EmailField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupSchemaType } from "@/schema/signupSchema";
import PasswordField from "@/components/auth/signup/PasswordField";
import ConfirmPasswordField from "@/components/auth/signup/ConfirmPasswordField";
import Button from "@/components/auth/Button";
import OrRegisterWith from "@/components/auth/OrRegisterWith";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthFooter from "@/components/auth/AuthFooter";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const form = useForm<signupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
        },
        mode: "onChange",
    });

    const signupMutation = useSignup();

    const onSubmit = (data: signupSchemaType) => {
        signupMutation.mutate(data, {
            onSuccess: () => {
                router.push("/confirm_email");
            },
        });
    };

    return (
        <AuthWrapper>
            <HeadLine
                hasArrow={true}
                linkto="/"
                heading="Sign Up"
                para="Create your account and start building a professional resume in minutes."
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

                <ConfirmPasswordField
                    register={form.register}
                    errors={form.formState.errors}
                    watch={form.watch}
                />

                <Button
                    type="submit"
                    disabled={
                        !form.formState.isValid || signupMutation.isPending
                    }
                    isLoading={signupMutation.isPending}
                >
                    Create account
                </Button>

                <OrRegisterWith />

                <GoogleButton linkHref="/">Sign up with Google</GoogleButton>

                <AuthFooter
                    optionText="Already have an account?"
                    optionLinkText="Login"
                    optionLinkHref="/login"
                />
            </form>
        </AuthWrapper>
    );
}
