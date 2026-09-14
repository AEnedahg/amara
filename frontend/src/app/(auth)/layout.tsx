import { type ReactNode } from 'react';
import AuthImage from '@/components/auth/AuthImage';

export default function Layout(
    {
        children
    }: {
        children: ReactNode
    }
) {
    return (
        <div className='flex max-w-360 mx-auto'>
            <AuthImage />
            {children}
        </div>
    )
}