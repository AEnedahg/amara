"use client";

import { useState } from "react";
import { signupSchemaType } from "@/schema/signupSchema";
import {
    type UseFormRegister,
    FieldErrors,
    type UseFormWatch,
} from "react-hook-form";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";

export default function ConfirmPasswordField({
    register,
    errors,
    watch,
}: {
    register: UseFormRegister<signupSchemaType>;
    errors: FieldErrors<signupSchemaType>;
    watch: UseFormWatch<signupSchemaType>;
}) {
    const [state, setState] = useState<boolean>(false);

    const password = watch("password");
    const confirmPassword = watch("confirm_password");

    const passwordsMatch =
        confirmPassword.length > 0 && password === confirmPassword;

    return (
        <div className="mt-4">
            <div className="relative">
                <label
                    htmlFor="confirm_password"
                    className="text-[#3B3B3B] text-[16px] mb-3 inline-block"
                >
                    Re-type Password
                </label>

                <input
                    {...register("confirm_password")}
                    type={state ? "text" : "password"}
                    className={clsx(
                        "border border-[#CED4DA] focus-within:outline-0 w-full rounded-lg placeholder:text-[#666666] p-4",
                        confirmPassword &&
                            (passwordsMatch
                                ? "bg-green-50 outline-green-500 text-green-500 focus:outline-green-500 border-2 border-green-500"
                                : "outline-red-500 text-red-500 focus:outline-red-500 bg-red-50 border-2 border-red-500"),
                    )}
                    placeholder="Re-enter password"
                />

                {confirmPassword && (
                    <div className="absolute right-4 top-13">
                        {state ? (
                            <Eye
                                onClick={() => setState(!state)}
                                className={
                                    passwordsMatch
                                        ? "stroke-green-500"
                                        : "stroke-red-500"
                                }
                            />
                        ) : (
                            <EyeClosed
                                onClick={() => setState(!state)}
                                className={
                                    passwordsMatch
                                        ? "stroke-green-500"
                                        : "stroke-red-500"
                                }
                            />
                        )}
                    </div>
                )}
            </div>

            {errors.confirm_password && (
                <small className="text-red-500">
                    {errors.confirm_password.message}
                </small>
            )}
        </div>
    );
}
