"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    confirmEmailSchema,
    confirmEmailSchemaType,
} from "@/schema/confirmEmailSchema";
import Button from "../Button";
import { useVerifyCode } from "@/hooks/useVerifyCode";
import { useRouter } from "next/navigation";
import { useResendCode } from "@/hooks/useResendCode";

const RESEND_COOLDOWN = 60; // seconds

export default function Form() {
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<confirmEmailSchemaType>({
        resolver: zodResolver(confirmEmailSchema),
        defaultValues: { six_digit_code: "" },
        mode: "onChange",
    });

    const router = useRouter();
    const verifyMutation = useVerifyCode();
    const resendMutation = useResendCode();

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const otpValue = watch("six_digit_code");

    // --- Resend timer state ---
    const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const handleResend = () => {
        if (secondsLeft > 0 || resendMutation.isPending) return;

        resendMutation.mutate(undefined, {
            onSuccess: () => {
                setSecondsLeft(RESEND_COOLDOWN);
                setValue("six_digit_code", "", {
                    shouldValidate: true,
                });
                inputsRef.current[0]?.focus();
            },
        });
    };

    // --- Existing OTP logic ---
    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const otpArray = otpValue.padEnd(6, " ").split("");
        otpArray[index] = value.slice(-1);
        const newOtp = otpArray.join("").replace(/ /g, "").slice(0, 6);

        setValue("six_digit_code", newOtp, { shouldValidate: true });

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
        setValue("six_digit_code", pasted, { shouldValidate: true });
        inputsRef.current[Math.min(pasted.length, 5)]?.focus();
    };

    const onSubmit = (data: confirmEmailSchemaType) => {
        verifyMutation.mutate(data.six_digit_code, {
            onSuccess: () => {
                router.push("/verification_successful");
            },
        });
    };

    return (
        <div className="mt-10">
            <label className="text-center block mb-2" htmlFor="six_digit_code">
                Code
            </label>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-4"
            >
                <Controller
                    name="six_digit_code"
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

                {errors.six_digit_code && (
                    <p className="text-red-500 text-sm">
                        {errors.six_digit_code.message}
                    </p>
                )}

                {/* --- Resend row --- */}
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
                                disabled={resendMutation.isPending}
                                className="text-[#5C85D9] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {resendMutation.isPending
                                    ? "Sending..."
                                    : "Send again"}
                            </button>
                        </span>
                    )}
                </div>

                <Button
                    type="submit"
                    linkHref="/signup_successful"
                    disabled={!isValid || verifyMutation.isPending}
                    isLoading={verifyMutation.isPending}
                >
                    Verify Code
                </Button>
            </form>
        </div>
    );
}
