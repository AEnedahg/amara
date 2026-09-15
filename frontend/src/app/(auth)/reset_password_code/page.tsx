"use client"

import AuthFooter from '@/components/auth/AuthFooter';
import AuthWrapper from '@/components/auth/AuthWrapper'
import HeadLine from '@/components/auth/HeadLine'
import Form from '@/components/auth/reset_password_code/Form';

export default function page() {

  return (
      <AuthWrapper>
          <HeadLine
              hasArrow={true}
              linkto="/reset_password"
              heading="Please check your email"
              para="We’ve sent a 4 digit code to helloworld@gmail.com."
          />
          <Form />
          <AuthFooter optionText='Wrong email?' optionLinkText='Send to a different email' optionLinkHref='/forgot_password'/>
      </AuthWrapper>
  );
}
