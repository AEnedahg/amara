"use client";

import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

type ButtonTypes = {
    children: string;
    linkHref: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
};

export default function Button({ children, linkHref, disabled, type, isLoading }: ButtonTypes) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(linkHref)}
            disabled={disabled}
            type={type}
            className="cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 w-full py-4.75 text-white font-poppins! inline-flex rounded-sm mt-16 bg-[#5C85D9]
                justify-center items-center gap-x-2
            "
        >
            {isLoading && (
                <LoaderCircle className="animate-spin" size={20} />
            )} {children}
        </button>
    );
}


