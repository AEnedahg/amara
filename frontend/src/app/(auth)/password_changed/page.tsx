"use client"

import AuthWrapper from '@/components/auth/AuthWrapper'
import HeadLine from '@/components/auth/HeadLine'
import Button from '@/components/auth/Button';
import { Check } from 'lucide-react';

export default function page() {

  return (
      <AuthWrapper>
          <HeadLine
              hasArrow={false}
              linkto="/"
              heading="Password Changed"
              para="Your password has been changed succesfully"
          />
          <div className="w-max h-max p-2 bg-[#5C85D9] rounded-full mx-auto flex justify-center items-center mt-4">
              <Check className="w-3/4 stroke-white" />
          </div>
          <form className="w-full">
              <Button disabled={false} linkHref="/login">
                  Back to login
              </Button>
          </form>
      </AuthWrapper>
  );
}
