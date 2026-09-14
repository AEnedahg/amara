"use client";

import { useRouter } from 'next/navigation';

type ButtonTypes = {
    children: string;
    linkHref: string;
    disabled: boolean;
}

export default function Button({
    children,
    linkHref,
    disabled
}: ButtonTypes) {
    
    const router = useRouter();

  return (
      <button
          onClick={() => router.push(linkHref)}
          disabled={disabled}
          className="cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 w-full py-4.75 text-white font-poppins! inline-block rounded-sm mt-16 bg-[#5C85D9]"
      >
          {children}
      </button>
  );
}
