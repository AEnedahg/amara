"use client";

import { useState } from "react";
import { signupSchemaType } from "@/schema/signupSchema";
import {
    type UseFormRegister,
    FieldErrors,
    type UseFormWatch,
} from "react-hook-form";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { passwordCriteria } from "@/lib/utils";
import { testPassword } from "@/lib/utils";

export default function PasswordField({
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

    return (
        <div className="mt-4">
            <div className="relative">
                <label
                    htmlFor="password"
                    className="text-[#3B3B3B] text-[16px] mb-3 inline-block"
                >
                    Password
                </label>
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
            <div className="w-full relative h-2 bg-gray-100 mt-4">
                {testPassword(password) === "none" && (
                    <div className="w-2 h-full bg-gray-500 absolute top-0 left-0 z-50" />
                )}
                {testPassword(password) === "weak" && (
                    <div className="w-1/3 h-full bg-red-500 absolute top-0 left-0 z-50" />
                )}
                {testPassword(password) === "medium" && (
                    <div className="w-2/3 h-full bg-amber-500 absolute top-0 left-0 z-50" />
                )}
                {testPassword(password) === "strong" && (
                    <div className="w-full  h-full bg-green-500 absolute top-0 left-0 z-50" />
                )}
            </div>
            {errors && (
                <small className="text-red-500">
                    {errors.password?.message}
                </small>
            )}

            <div className="space-y-2 mt-4">
                {passwordCriteria({ password }).map((item) => (
                    <div key={item.id} className="flex items-center gap-x-2">
                        <div
                            className={clsx(
                                `size-5 rounded-full flex justify-center items-center`,
                                item.condition
                                    ? "bg-green-500/90"
                                    : "bg-white border border-gray-500",
                            )}
                        >
                            <Check className="stroke-white size-1/2" />
                        </div>
                        <small className="text-[#161717]">{item.string}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}
