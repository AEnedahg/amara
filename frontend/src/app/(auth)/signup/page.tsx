"use client"

import AuthWrapper from '@/components/auth/AuthWrapper'
import HeadLine from '@/components/auth/HeadLine'
import EmailField from '@/components/auth/signup/EmailField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, signupSchemaType } from '@/schema/signupSchema';
import PasswordField from '@/components/auth/signup/PasswordField';
import ConfirmPasswordField from '@/components/auth/signup/ConfirmPasswordField';
import Button from '@/components/auth/Button';
import OrRegisterWith from '@/components/auth/OrRegisterWith';
import GoogleButton from '@/components/auth/GoogleButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function page() {

    const form = useForm<signupSchemaType>(
        {
            resolver: zodResolver(signupSchema),
            defaultValues: {
                email: '',
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
            <EmailField register={form.register} errors={form.formState.errors} watch={form.watch} />
            <PasswordField register={form.register} errors={form.formState.errors} watch={form.watch} />
            <ConfirmPasswordField register={form.register} errors={form.formState.errors} watch={form.watch} />
            <Button disabled={!form.formState.isValid} linkHref='/'>Create account</Button>
            <OrRegisterWith />
            <GoogleButton linkHref='/'>Sign up with Google</GoogleButton>
            <AuthFooter optionText='Already have an account?' optionLinkText='Login' optionLinkHref='/login' />
          </form>
      </AuthWrapper>
  );
}
