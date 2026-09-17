"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    resetPasswordSchema,
    resetPasswordSchemaType,
} from "@/schema/resetPasswordSchema";
import Button from "../Button";

const RESEND_COOLDOWN = 60;

export default function Form() {
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<resetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            four_digit_code: "",
        },
        mode: "onChange",
    });

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const otpValue = watch("four_digit_code");

    const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const handleResend = useCallback(async () => {
        if (secondsLeft > 0 || isResending) return;

        setIsResending(true);

        try {
            // Call your Laravel forgot-password endpoint here
            // once you connect it to TanStack Query.

            setSecondsLeft(RESEND_COOLDOWN);

            setValue("four_digit_code", "", {
                shouldValidate: true,
            });

            inputsRef.current[0]?.focus();
        } catch (err) {
            console.error("Failed to resend code:", err);
        } finally {
            setIsResending(false);
        }
    }, [secondsLeft, isResending, setValue]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const otpArray = otpValue.padEnd(6, " ").split("");

        otpArray[index] = value.slice(-1);

        const newOtp = otpArray.join("").replace(/ /g, "").slice(0, 6);

        setValue("four_digit_code", newOtp, {
            shouldValidate: true,
        });

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !otpValue[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        setValue("four_digit_code", pasted, {
            shouldValidate: true,
        });

        inputsRef.current[Math.min(pasted.length, 5)]?.focus();
    };

    const onSubmit = (data: resetPasswordSchemaType) => {
        console.log("Submitted OTP:", data.four_digit_code);
    };

    return (
        <div className="mt-10">
            <label htmlFor="four_digit_code" className="block mb-2 text-center">
                Code
            </label>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-4"
            >
                <Controller
                    name="four_digit_code"
                    control={control}
                    render={() => (
                        <div className="flex gap-2" onPaste={handlePaste}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        inputsRef.current[i] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={1}
                                    value={otpValue[i] || ""}
                                    onChange={(e) =>
                                        handleChange(i, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-12 h-14 text-center text-xl border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                        </div>
                    )}
                />

                {errors.four_digit_code && (
                    <p className="text-red-500 text-sm">
                        {errors.four_digit_code.message}
                    </p>
                )}

                <div className="text-sm text-gray-600">
                    {secondsLeft > 0 ? (
                        <span>
                            Didn&apos;t receive code? Send again in{" "}
                            <span className="font-medium text-gray-800">
                                {String(Math.floor(secondsLeft / 60)).padStart(
                                    2,
                                    "0",
                                )}
                                :{String(secondsLeft % 60).padStart(2, "0")}
                            </span>
                        </span>
                    ) : (
                        <span>
                            Didn&apos;t receive code?{" "}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-[#5C85D9] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isResending ? "Sending..." : "Send again"}
                            </button>
                        </span>
                    )}
                </div>

                <Button type="submit" disabled={!isValid}>
                    Verify Code
                </Button>
            </form>
        </div>
    );
}
