"use client";

import { useState } from "react";
import { loginSchemaType } from "@/schema/loginSchema";
import {
    type UseFormRegister,
    FieldErrors,
    type UseFormWatch,
} from "react-hook-form";
import clsx from "clsx";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import Link from "next/link";

export default function PasswordField({
    register,
    errors,
    watch,
}: {
    register: UseFormRegister<loginSchemaType>;
    errors: FieldErrors<loginSchemaType>;
    watch: UseFormWatch<loginSchemaType>;
}) {
    const [state, setState] = useState<boolean>(false);

    const password = watch("password");

    return (
        <div className="mt-4">
            <div className="relative">
                <div className="flex justify-between">
                    <label
                        htmlFor="password"
                        className="text-[#3B3B3B] text-[16px] mb-3 inline-block"
                    >
                        Password
                    </label>
                    <Link href="/" className="text-gray-500">Forgot Password?</Link>
                </div>
                <input
                    {...register("password")}
                    type={state ? "text" : "password"}
                    className={clsx(
                        "border border-[#CED4DA] focus-within:outline-0 w-full rounded-lg placeholder:text-[#666666] p-4",
                        errors.password
                            ? "outline-red-500 text-red-500 focus:outline-red-500 bg-red-50"
                            : password
                              ? "bg-green-50 outline-green-500 text-green-500 focus:outline-green-500 border-2 border-green-500"
                              : "",
                    )}
                    placeholder="password"
                />

                {password && (
                    <div className="absolute right-4 top-13">
                        {state ? (
                            <Eye
                                onClick={() => setState(!state)}
                                className={
                                    errors.password
                                        ? "stroke-red-500"
                                        : "stroke-green-500"
                                }
                            />
                        ) : (
                            <EyeClosed
                                onClick={() => setState(!state)}
                                className={
                                    errors.password
                                        ? "stroke-red-500"
                                        : "stroke-green-500"
                                }
                            />
                        )}
                    </div>
                )}
            </div>

            {errors && (
                <small className="text-red-500">
                    {errors.password?.message}
                </small>
            )}
        </div>
    );
}
