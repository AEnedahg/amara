"use client";

import AuthWrapper from "@/components/auth/AuthWrapper";
import HeadLine from "@/components/auth/HeadLine";
import EmailField from "@/components/auth/forgot_password/EmailField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    forgotPasswordSchema,
    forgotPasswordSchemaType,
} from "@/schema/forgotPasswordSchema";
import Button from "@/components/auth/Button";
import AuthFooter from "@/components/auth/AuthFooter";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const form = useForm<forgotPasswordSchemaType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const forgotPasswordMutation = useForgotPassword();

    const onSubmit = (data: forgotPasswordSchemaType) => {
        forgotPasswordMutation.mutate(data, {
            onSuccess: () => {
                router.push("/reset_password_code");
            },
        });
    };

    return (
        <AuthWrapper>
            <HeadLine
                hasArrow={true}
                linkto="/"
                heading="Forgot password?"
                para="Please enter the email associated with your account."
            />

            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <EmailField
                    register={form.register}
                    errors={form.formState.errors}
                    watch={form.watch}
                />

                <Button
                    type="submit"
                    disabled={
                        !form.formState.isValid ||
                        forgotPasswordMutation.isPending
                    }
                    isLoading={forgotPasswordMutation.isPending}
                >
                    Send code
                </Button>

                <AuthFooter
                    optionText="Remember Password?"
                    optionLinkText="Log in"
                    optionLinkHref="/login"
                />
            </form>
        </AuthWrapper>
    );
}
