"use client"

import AuthWrapper from '@/components/auth/AuthWrapper'
import HeadLine from '@/components/auth/HeadLine'
import EmailField from '@/components/auth/forgot_password/EmailField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, forgotPasswordSchemaType } from '@/schema/forgotPasswordSchema';
import Button from '@/components/auth/Button';
import AuthFooter from '@/components/auth/AuthFooter';

export default function page() {

    const form = useForm<forgotPasswordSchemaType>(
        {
            resolver: zodResolver(forgotPasswordSchema),
            defaultValues: {
                email: '',
            },
            mode: 'onChange'
        }
    );

  return (
      <AuthWrapper>
          <HeadLine
              hasArrow={true}
              linkto="/"
              heading="Forgot password?"
              para="Please enter the email associated with your account."
          />
          <form className="w-full">
              <EmailField
                  register={form.register}
                  errors={form.formState.errors}
                  watch={form.watch}
              />
              <Button disabled={!form.formState.isValid} linkHref="/reset_password_code">
                  Send code
              </Button>
              <AuthFooter
                  optionText="Remember Password?"
                  optionLinkText="Log in"
                  optionLinkHref="/login"
              />
          </form>
      </AuthWrapper>
  );
}
