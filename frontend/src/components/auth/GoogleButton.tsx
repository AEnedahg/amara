"use client";

import { useRouter } from 'next/navigation';

type ButtonTypes = {
    children: string;
    linkHref: string
}

export default function GoogleButton({
    children,
    linkHref
}: ButtonTypes) {
    
    const router = useRouter();

  return (
      <button
          onClick={() => router.push(linkHref)}
          className="w-full py-4.75 cursor-pointer font-poppins! inline-flex rounded-sm mt-4
            gap-x-2 border-gray-500 border justify-center text-gray-800
          "
      >
          <img src="/auth/google_icon.svg" alt="icon for google" />{children}
      </button>
  );
}
