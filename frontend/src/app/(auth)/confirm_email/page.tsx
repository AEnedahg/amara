"use client"

import AuthFooter from '@/components/auth/AuthFooter';
import AuthWrapper from '@/components/auth/AuthWrapper'
import HeadLine from '@/components/auth/HeadLine'
import Form from '@/components/auth/confirm_email/Form';

export default function page() {

  return (
      <AuthWrapper>
          <HeadLine
              hasArrow={true}
              linkto="/"
              heading="Verify your email"
              para="We just sent 6-digit code to sarah.jansen@gmail.com, enter it below:"
          />
          <Form />
          <AuthFooter optionText='Wrong email?' optionLinkText='Send to a different email' optionLinkHref='/'/>
      </AuthWrapper>
  );
}
