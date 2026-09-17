"use client";

import AuthWrapper from "@/components/auth/AuthWrapper";
import HeadLine from "@/components/auth/HeadLine";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    forgotPasswordPasswordsSchema,
    forgotPasswordPasswordsSchemaType,
} from "@/schema/forgotPasswordPasswordsSchema";
import PasswordField from "@/components/auth/reset_password/PasswordField";
import ConfirmPasswordField from "@/components/auth/reset_password/ConfirmPasswordField";
import Button from "@/components/auth/Button";
import AuthFooter from "@/components/auth/AuthFooter";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const form = useForm<forgotPasswordPasswordsSchemaType>({
        resolver: zodResolver(forgotPasswordPasswordsSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: forgotPasswordPasswordsSchemaType) => {
        console.log(data);

        router.push("/password_changed");
    };

    return (
        <AuthWrapper>
            <HeadLine
                hasArrow={true}
                linkto="/"
                heading="Reset Password"
                para="Create a new password for your account."
            />

            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
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

                <Button type="submit" disabled={!form.formState.isValid}>
                    Reset Password
                </Button>

                <AuthFooter
                    optionText="Already have an account?"
                    optionLinkText="Login"
                    optionLinkHref="/login"
                />
            </form>
        </AuthWrapper>
    );
}
