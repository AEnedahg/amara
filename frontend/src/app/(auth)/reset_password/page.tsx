"use client"

import AuthWrapper from '@/components/auth/AuthWrapper'
import HeadLine from '@/components/auth/HeadLine'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordPasswordsSchema, forgotPasswordPasswordsSchemaType } from '@/schema/forgotPasswordPasswordsSchema';
import PasswordField from '@/components/auth/reset_password/PasswordField';
import ConfirmPasswordField from '@/components/auth/reset_password/ConfirmPasswordField';
import Button from '@/components/auth/Button';
import AuthFooter from '@/components/auth/AuthFooter';

export default function page() {

    const form = useForm<forgotPasswordPasswordsSchemaType>(
        {
            resolver: zodResolver(forgotPasswordPasswordsSchema),
            defaultValues: {
                password: '',
                confirm_password: ''
            },
            mode: 'onChange'
        }
    );

  return (
      <AuthWrapper>
          <HeadLine
              hasArrow={true}
              linkto="/"
              heading="Sign Up"
              para="Create your account and start building a professional resume in minutes."
          />
          <form className='w-full'>
            <PasswordField register={form.register} errors={form.formState.errors} watch={form.watch} />
            <ConfirmPasswordField register={form.register} errors={form.formState.errors} watch={form.watch} />
            <Button disabled={!form.formState.isValid} linkHref='/password_changed'>Reset Password</Button>
            <AuthFooter optionText='Already have an account?' optionLinkText='Login' optionLinkHref='/login' />
          </form>
      </AuthWrapper>
  );
}
